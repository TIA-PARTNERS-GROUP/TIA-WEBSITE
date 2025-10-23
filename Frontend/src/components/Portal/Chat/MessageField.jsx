import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import { resetChatbot, sendChatbotMessage } from "../../../api/chatbot";
import ReactMarkdown from "react-markdown";
import UpArrowIcon from "../../Icons/UpArrowIcon";
import { addBlog } from "../../../api/blogs";
import { getCurrentBusinessInfo, saveL2EScores } from "../../../api/business";
import ConnectionPopup from "../Connect/ConnectionPopup";
import { addNotification, getCurrentUserNotifications, getCurrentUserPendingConnections } from "../../../api/notification";

const MessageField = ({ messageData, user_id, name, chatType }) => {

    const navigate = useNavigate();
    const [localMessageData, setLocalMessageData] = useState(messageData);
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialMessageSent, setInitialMessageSent] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const textareaRef = useRef(null);
    const [currentBlogData, setCurrentBlogData] = useState(null);

    const [showConnectionPopup, setShowConnectionPopup] = useState(false);
    const [selectedBusinessForConnection, setSelectedBusinessForConnection] = useState(null);
    const [emailTemplate, setEmailTemplate] = useState('');
    const [isSendingConnection, setIsSendingConnection] = useState(false);
    const [pendingConnectionBusinessIds, setPendingConnectionBusinessIds] = useState([]);
    const [currentBusiness, setCurrentBusiness] = useState(null);

    const [connectedBusinessIds, setConnectedBusinessIds] = useState([]);
    const [publishing, setPublishing] = useState(false);

    useEffect(() => {
        const fetchConnectionData = async () => {
            try {
                // Get current user info for existing connections
                const userRes = await getCurrentBusinessInfo();
                const userConnections = userRes.data?.connections || {};
                setConnectedBusinessIds(Object.keys(userConnections));

                // Get pending connection notifications where current user is the SENDER
                const pendingRes = await getCurrentUserPendingConnections();
                const pendingData = pendingRes.data.pendingConnections || [];
                
                // Extract receiver_business_id from pending connections
                let pendingBusinessIds = [];
                if (Array.isArray(pendingData)) {
                    pendingBusinessIds = pendingData
                        .map(connection => connection.receiver_business_id)
                        .filter(id => id) || [];
                }
                
                setPendingConnectionBusinessIds(pendingBusinessIds);
            } catch (error) {
                console.error('Failed to fetch connection data:', error);
            }
        };
        
        fetchConnectionData();
    }, []);

    useEffect(() => {
        const fetchCurrentBusiness = async () => {
            try {
                const currentBusinessRes = await getCurrentBusinessInfo();
                setCurrentBusiness(currentBusinessRes.data);
            } catch (error) {
                console.error('Failed to fetch current business info:', error);
            }
        };
        
        fetchCurrentBusiness();
    }, []);

    // Geolocation using react-geolocate, default to QUT if no geolocation
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        userDecisionTimeout: 10000,
    });

    const handleResetChatbot = async () => {
        const res = await resetChatbot();
        console.log(res);
        setLocalMessageData([]);
    };

    useEffect(() => {
        const lastChatType = sessionStorage.getItem("lastChatType");

        if (lastChatType !== chatType) {
            handleResetChatbot();
            sessionStorage.setItem("lastChatType", chatType);
        }
    }, [chatType]);

    useEffect(() => {
        if (!isGeolocationAvailable) {
            console.log("Geolocation not available in this browser");
        }
        if (!isGeolocationEnabled) {
            console.log("User denied location access or browser blocked it");
        }
    }, [isGeolocationAvailable, isGeolocationEnabled]);

    const userLat = coords?.latitude || -27.4705; 
    const userLng = coords?.longitude || 153.026;

    const getConnectionType = () => {
        switch (chatType) {
            case "Alliance Partners":
                return "connect:alliance";
            case "Complementary Partners":
                return "connect:complementary";
            case "Mastermind Partners":
                return "connect:mastermind";
            case "Vision":
                return "profiler:VisionAgent";
            case "Ladder To Exit":
                return "profiler:LadderAgent";
            default:
                return "default";
        }
    }

    const getBotResponseText = (response) => {
    if (typeof response === "string") {
        return response; // ✅ Don't trim — keep markdown and line breaks
    } else if (response && typeof response === "object") {
        if (response.error || response.detail) {
            return `Sorry, the chatbot is currently unavailable. Please try again later. Error: ${response.error || response.detail}`;
        }
        if (response.text) return response.text;
        if (response.message) return response.message;
    }
    return "Sorry, no response received from the chatbot. Please try again.";
};

    const handlePublish = async (blogData) => {
        console.log('Publishing blog post:', blogData);
        console.log()
        
        let cleanedContent = blogData.content;
        // Remove Headline section first
        cleanedContent = cleanedContent.replace(/^Headline\s*\n\s*"([^"]*)"\s*\n\s*/i, '');
        
        // Then remove ### Blog Post section
        cleanedContent = cleanedContent.replace(/^### Blog Post\s*\n*/i, '');
        
        // Also handle cases where Headline might not have quotes
        cleanedContent = cleanedContent.replace(/^Headline\s*\n\s*([^\n]+)\s*\n\s*/i, '');
        
        // Handle any remaining Blog Post variations
        cleanedContent = cleanedContent.replace(/^#+\s*Blog Post\s*\n*/i, '');
        
        // Also remove any trailing "blog ends up like this" text if present
        cleanedContent = cleanedContent.replace(/\s*blog ends up like this[^\n]*$/i, '');
        
        // Trim any extra whitespace
        cleanedContent = cleanedContent.trim();
        
        const title = blogData.title;
        const date = new Date().toISOString();
        const content = `<ReactMarkdown>${cleanedContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</ReactMarkdown>`;
        const publishingStatus = 'published';
        
        console.log('Original content:', blogData.content);
        console.log('Cleaned blog content:', content);
        
        try {
            
            setPublishing(true);

            // Add silent "finished" message to chat
            setLocalMessageData(prev => [...prev, { author: "user", text: "I'm finished now thanks" }]);
            setLoading(true);

            // Send the silent message to chatbot
            const message = await sendChatbotMessage({
                user_id, 
                name, 
                message: "I'm finished now thanks", 
                chat_type: getConnectionType(),
                region: "au",
                lat: userLat,
                lng: userLng
            });

            const response = message.response;
            const state = message.state;
            const botText = getBotResponseText(response);

            setLocalMessageData(prev => [...prev, { author: "bot", text: botText }]);
            
            // Only navigate after receiving the bot's response
            await addBlog(title, date, content, publishingStatus);
            setTimeout(() => {
                navigate("/manage/blogs/table-view");
            }, 2000);
            
        } catch (error) {
            console.error('Error publishing blog or sending final message:', error);
            setLocalMessageData(prev => [...prev, { 
                author: "bot", 
                text: `Sorry, something went wrong. ${error.message}` 
            }]);
            
        } finally {
            setLoading(false);
        }
    };

    const renderConnectButtons = (state) => {
        if (!state?.ConnectAgent?.existing_users || !state.ConnectAgent.connection_result) {
            return null;
        }

        const existingUsers = state.ConnectAgent.existing_users;
        const connectionResults = state.ConnectAgent.connection_result;

        return (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Connect with Recommended Businesses</h3>
                <div className="space-y-3">
                    {connectionResults.map((result, index) => {
                        const user = result.recommendation.user;
                        const businessId = existingUsers[index];
                        const isConnected = connectedBusinessIds.includes(businessId.toString());
                        const isPending = pendingConnectionBusinessIds.includes(businessId);
                        
                        console.log('Business ID:', businessId, 'Is Pending:', isPending, 'Is Connected:', isConnected);
                        console.log('Pending IDs:', pendingConnectionBusinessIds);
                        
                        return (
                            <div key={businessId} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-800">{user.name}</h4>
                                    <p className="text-sm text-gray-600">{user.business}</p>
                                    <p className="text-xs text-gray-500 mt-1">{user.description}</p>
                                </div>
                                {isConnected ? (
                                    <button
                                        onClick={() => handleDisconnect(businessId)}
                                        className="ml-4 px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                                    >
                                        Disconnect
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => !isPending && handleConnectClick(user, businessId)}
                                        disabled={isPending}
                                        className={`ml-4 px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                            isPending 
                                                ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
                                                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                                        }`}
                                    >
                                        {isPending ? "Pending..." : "Connect"}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    useEffect(() => {
        const sendInitialMessage = async () => {
            if (!initialMessageSent && user_id) {
                setInitialMessageSent(true);
                setLoading(true);

                try {
                    // Send the initial message
                    const message = await sendChatbotMessage({ 
                        user_id, 
                        name, 
                        message: `Hello!`,
                        chat_type: getConnectionType(),
                        region: "au",
                        lat: userLat,
                        lng: userLng
                    });

                    const response = message.response;
                    const state = message.state;
                    // Process the bot's response and display it
                    const botText = getBotResponseText(response);

                    // Add the bot's response as the first message
                    setLocalMessageData(prev => [...prev, { author: "bot", text: botText }]);
                } catch (error) {
                    console.error('Error sending initial message:', error);
                    // Display error message from bot
                    setLocalMessageData(prev => [...prev, { 
                        author: "bot", 
                        text: `Sorry, something went wrong while initializing the chat. ${error.message}` 
                    }]);
                } finally {
                    setLoading(false);
                }
            }
        };

        sendInitialMessage();
    }, [initialMessageSent, user_id, chatType]);

    const handleMessageChange = (event) => {
        setMessageText(event.target.value);
        
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
        }
    };

    const handleBack = () => {
        switch (chatType) {
            case "Alliance Partners":
                navigate("/connect/alliance/smartconnect");
                break;
            case "Complementary Partners":
                navigate("/connect/complementary/smartconnect");
                break;
            case "Mastermind Partners":
                navigate("/connect/mastermind/smartconnect");
                break;
            case "Vision":
                navigate("/build");
                break;
            case "Ladder To Exit":
                navigate("/build");
                break;
            default:
                navigate("/connect/alliance/smartconnect");
        }
        
    }

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [localMessageData, loading]);

    const handleMessageSubmission = async (event) => {
        event.preventDefault();
        if (!messageText.trim()) return;

        setLocalMessageData(prev => [...prev, { author: "user", text: messageText }]);
        setMessageText('');
        setLoading(true);

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }

        try {
            const message = await sendChatbotMessage({
                user_id, 
                name, 
                message: messageText, 
                chat_type: getConnectionType(),
                region: "au",
                lat: userLat,
                lng: userLng
            });
            console.log("Chatbot response:", message);

            const response = message.response;
            const state = message.state;
            const botText = getBotResponseText(response);

            if (state?.ConnectAgent?.connection_type === "Existing TIA Users") {
                console.log("Existing TIA Users detected:", state.ConnectAgent);
                
                setLocalMessageData(prev => [
                    ...prev,
                    { 
                        author: "bot", 
                        text: botText,
                        state: state
                    }
                ]);
                return;
            }

            if (chatType === "Ladder To Exit" && state?.LadderAgent?.results) {
                const ladderResults = state.LadderAgent.results;
                console.log("🔥 Ladder To Exit results detected:", ladderResults);

                // Save scores to API
                await saveL2EScores(ladderResults);

                // Create progress bar visualization for Ladder To Exit results
                const renderLadderResults = (results) => {
                    const capitaliseWords = (str) => {
                        return str.charAt(0).toUpperCase() + str.slice(1);
                    };

                    return (
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h3 className="text-xl font-bold mb-6 text-left">Ladder To Exit Results</h3>
                            <div className="flex flex-col gap-5">
                                {Object.entries(results).map(([name, value]) => (
                                    <div key={name} className="flex items-center gap-4">
                                        <span className="w-32 shrink-0 text-md font-medium text-gray-700">
                                            {capitaliseWords(name)}
                                        </span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${
                                                    value >= 8
                                                        ? "bg-green-500"
                                                        : value >= 6
                                                        ? "bg-lime-400"
                                                        : value >= 4
                                                        ? "bg-yellow-300"
                                                        : value >= 2
                                                        ? "bg-orange-400"
                                                        : "bg-red-500"
                                                }`}
                                                style={{ width: `${(value / 10) * 100}%` }}
                                            />
                                        </div>
                                        <span className="w-16 text-right text-sm font-medium text-gray-600">
                                            {value}/10
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                };

                setLocalMessageData(prev => [
                    ...prev,
                    { author: "bot", text: botText },
                    {
                        author: "system",
                        text: "ladder-results",
                        customComponent: renderLadderResults(ladderResults)
                    }
                ]);
                return;
            }

            setLocalMessageData(prev => [...prev, { author: "bot", text: botText }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setLocalMessageData(prev => [...prev, { author: "bot", text: `Sorry, something went wrong. ${error.message}` }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleMessageSubmission(event);
        }
    };

    const parseBlogResponse = (text) => {
        if (typeof text !== 'string') return null;

        // Detect if this looks like blog content
        text = text.replace(/^#+\s*content(?:\s*batch\s*\d+)?/gim, '').trim();

        const isBlogContent =
            /blog post headline/i.test(text);

        if (!isBlogContent) return null;

        let titleMatch, contentMatch;

        // Pattern 1: **Blog Post Headline**
        titleMatch = text.match(/\*\*Blog Post Headline\*\*[\s\S]*?\n(.+?)\n/i);
        contentMatch = text.match(/\*\*Blog Post\*\*[\s\S]*?(.*?)(?=\*\*Social Media Caption\*\*|---|$)/is);

        // Pattern 2: ### Blog Post Headline
        if (!titleMatch) {
            titleMatch = text.match(/### Blog Post Headline[\s\S]*?\n(.+?)\n/i);
            contentMatch = text.match(/### Blog Post[\s\S]*?(.*?)(?=### Social Media Caption|---|$)/is);
        }

        if (titleMatch && contentMatch) {
            return {
            title: titleMatch[1].trim().replace(/^["'`*]+|["'`*]+$/g, ""),
            content: contentMatch[1].trim(),
            rawText: text,
            };
        }

        return null;
        };

    // Markdown renderer for both user and bot messages
    const renderMarkdown = (text, isUserMessage = false, messageState = null) => {
        if (typeof text !== 'string') return text;
        
        // For blog posts, use the special rendering
        const blogData = parseBlogResponse(text);
        if (blogData) {
            return (
                <div>
                    <ReactMarkdown
                        components={{
                            pre: ({node, ...props}) => (
                            <pre {...props} className="whitespace-pre-wrap bg-gray-50 p-3 rounded w-full my-6 font-mono text-sm" />
                            ),
                            p: ({node, ...props}) => (
                            <p {...props} className="mt-2 mb-4 leading-6 [&_br]:hidden whitespace-pre-wrap" />
                            ),
                            h3: ({node, ...props}) => (
                            <h3 {...props} className="text-lg font-bold mt-4 mb-3" />
                            ),
                            ul: ({node, ...props}) => (
                            <ul {...props} className="my-4 pl-6 list-disc" />
                            ),
                            li: ({node, ...props}) => (
                            <li {...props} className="mb-2" />
                            ),
                            h2: ({node, ...props}) => {
                                const content = props.children?.[0];
                                if (typeof content === 'string' && /CONTENT(?: BATCH)?/.test(content)) {
                                return null;
                                }
                                return <h2 {...props} className="text-xl font-bold mt-6 mb-4" />;
                            },
                            // Handles the **Blog Post Headline** format
                            strong: ({node, ...props}) => {
                                const content = props.children?.[0];
                                // If it's a blog post headline, render it as a heading instead of bold text
                                if (typeof content === 'string' && content === 'Blog Post Headline') {
                                    return <h3 className="text-lg font-bold mt-4 mb-3">{content}</h3>;
                                }
                                if (typeof content === 'string' && content === 'Blog Post') {
                                    return <h3 className="text-lg font-bold mt-4 mb-3">{content}</h3>;
                                }
                                if (typeof content === 'string' && content === 'Social Media Caption') {
                                    return <h3 className="text-lg font-bold mt-4 mb-3">{content}</h3>;
                                }
                                return <strong {...props} />;
                            }
                        }}
                    >
                        {blogData.rawText}
                    </ReactMarkdown>
                    
                    {/* Add publish button for blog posts */}
                    {blogData && (
                        <div className="mt-6 flex justify-center">
                            <button 
                                onClick={() => currentBlogData && handlePublish(currentBlogData)}
                                disabled={!currentBlogData || publishing}
                                className={`bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md ${
                                    publishing || !currentBlogData ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {publishing ? "⏳ Publishing..." : "🚀 Publish Blog Post"}
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        // Regular markdown rendering for all other messages
        return (
            <div>
                <ReactMarkdown
                    components={{
                        pre: ({node, ...props}) => (
                            <pre {...props} className={`whitespace-pre-wrap p-3 rounded w-full my-2 font-mono text-sm ${isUserMessage ? 'bg-blue-500' : 'bg-gray-50'}`} />
                        ),
                        code: ({node, ...props}) => (
                            <code {...props} className={`px-1 rounded text-sm ${isUserMessage ? 'bg-blue-500' : 'bg-gray-100'}`} />
                        ),
                        p: ({node, ...props}) => (
                            <p {...props} className="my-2 leading-6 whitespace-pre-wrap" />
                        ),
                        h1: ({node, ...props}) => (
                            <h1 {...props} className="text-2xl font-bold mt-4 mb-3" />
                        ),
                        h2: ({node, ...props}) => (
                            <h2 {...props} className="text-xl font-bold mt-4 mb-3" />
                        ),
                        h3: ({node, ...props}) => (
                            <h3 {...props} className="text-lg font-bold mt-3 mb-2" />
                        ),
                        ul: ({node, ...props}) => (
                            <ul {...props} className="my-2 pl-6 list-disc" />
                        ),
                        ol: ({node, ...props}) => (
                            <ol {...props} className="my-2 pl-6 list-decimal" />
                        ),
                        li: ({node, ...props}) => (
                            <li {...props} className="mb-1" />
                        ),
                        blockquote: ({node, ...props}) => (
                            <blockquote {...props} className={`border-l-4 pl-4 my-3 ${isUserMessage ? 'border-blue-300' : 'border-gray-300'}`} />
                        ),
                        strong: ({node, ...props}) => (
                            <strong {...props} className="font-bold" />
                        ),
                        em: ({node, ...props}) => (
                            <em {...props} className="italic" />
                        ),
                    }}
                >
                    {text}
                </ReactMarkdown>
                
                {messageState?.ConnectAgent?.connection_type === "Existing TIA Users" && 
                 renderConnectButtons(messageState)}
            </div>
        );
    };

    useEffect(() => {
        const lastBotMessage = [...localMessageData].reverse().find(msg => msg.author === "bot");
        if (lastBotMessage) {
            const blogData = parseBlogResponse(lastBotMessage.text);
            setCurrentBlogData(blogData);
        }
    }, [localMessageData]);

    const handleConnectClick = (businessData, businessId) => {
        console.log('Connect clicked for:', businessData, 'Business ID:', businessId);
        setSelectedBusinessForConnection({
            ...businessData,
            businessId: businessId // Use businessId instead of userId
        });
        setEmailTemplate(`Hi ${businessData.name || ''},

    My business would like to connect with your business, ${businessData.business}. Looking forward to collaborating!

    Best regards`);
        setShowConnectionPopup(true);
    };

    const handleConnectionRequest = async () => {
        if (!selectedBusinessForConnection) return;
        
        setIsSendingConnection(true);
        try {
            console.log('Sending connection request to business:', selectedBusinessForConnection.businessId);
            
            const currentBusinessRes = await getCurrentBusinessInfo();
            setCurrentBusiness(currentBusinessRes.data);
            
            const getPartnerTypeId = () => {
                const partnerTypeMap = {
                    'Alliance Partners': 1,
                    'Complementary Partners': 2,
                    'Mastermind Partners': 3
                };
                return partnerTypeMap[chatType] || 2;
            };

            const partnerId = getPartnerTypeId();
            const message = `connect-${partnerId}`;
            
            // You'll need to check if addNotification expects business ID or user ID
            // If it expects user ID, you'll need to fetch the user ID from the business ID
            await addNotification(selectedBusinessForConnection.businessId, message);
            
            setPendingConnectionBusinessIds(prev => [...prev, selectedBusinessForConnection.businessId]);
            
            console.log('Connection request sent successfully');
            
            setShowConnectionPopup(false);
            setSelectedBusinessForConnection(null);
        } catch (error) {
            console.error('Failed to send connection request:', error);
        } finally {
            setIsSendingConnection(false);
        }
    };

    const handleCancelConnection = () => {
        setShowConnectionPopup(false);
        setSelectedBusinessForConnection(null);
    };

    const handleDisconnect = async (businessId) => {
        try {
            await removeConnection(businessId);
            setConnectedBusinessIds(prev => prev.filter(id => id !== businessId));
            console.log('Disconnected from business:', businessId);
        } catch (error) {
            console.error('Failed to disconnect:', error);
        }
    };

    return (
        <div>
            <div className="sticky z-20">
                <button 
                    onClick={handleBack}
                    className="absolute top-4 right-4 hover:font-medium pr-8"
                    aria-label="Go back"
                >
                    ← Back
                </button>
            </div>
            <div className="sticky top-0 z-10 bg-gray-100 w-full py-4 ">
                <h1 className="text-lg font-bold text-center text-gray-800">{chatType}</h1>
            </div>
        <div className="flex flex-col justify-center items-center gap-y-10 h-screen pt-4 pb-24">
            <ul ref={messagesContainerRef} className="flex flex-col w-[80%] max-w-4xl gap-y-4 overflow-y-auto px-4">
                {localMessageData.map((message, index) => (
                    <li
                        key={index}
                        className={`flex rounded-3xl py-3 px-4 ${
                            message.author === "user" 
                                ? "self-end bg-blue-600 text-white max-w-[70%]" 
                                : message.customComponent
                                    ? "self-start bg-white text-gray-800 border w-full max-w-2xl" // Wider for progress bars
                                    : "self-start bg-white text-gray-800 border max-w-[70%]"
                        } break-words inline-block`}
                    >
                        <div className={message.author === "user" ? "max-w-max" : "w-full"}>
                            {message.customComponent ? (
                                // Render custom components without prose styling and full width
                                <div className="w-full">
                                    {message.customComponent}
                                </div>
                            ) : (
                                // Regular messages with prose styling
                                <div className={message.author === "bot" ? "prose prose-sm" : "prose prose-invert prose-sm"}>
                                    {typeof message.text === "object" 
                                        ? JSON.stringify(message.text)
                                        : renderMarkdown(message.text, message.author === "user", message.state)
                                    }
                                </div>
                            )}
                        </div>
                    </li>
                ))}
                            {loading && (
                                <li className="self-start bg-white flex rounded-full py-2 px-4 opacity-60">
                                    Bot is typing...
                                </li>
                            )}
                            <div ref={messagesEndRef} />
                        </ul>
                        <form onSubmit={handleMessageSubmission} className="flex items-center bg-gray-200 rounded-2xl w-[38%] py-2 px-4">
                            <textarea
                                ref={textareaRef}
                                value={messageText}
                                onChange={handleMessageChange}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-gray-200 focus:outline-none resize-none placeholder-gray-500 max-h-50 overflow-y-auto"
                                placeholder="Message LLM..."
                                disabled={loading}
                                rows="1"
                                style={{
                                    minHeight: '24px',
                                    maxHeight: '120px'
                                }}
                            />
                            <button className="bg-blue-600 rounded-full p-2 ml-2 h-10 w-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || !messageText.trim()}>
                                <UpArrowIcon className="text-white w-5 h-5" />
                            </button>
                        </form>
                        <br></br>
                    </div>

                {showConnectionPopup && selectedBusinessForConnection && (
                    <ConnectionPopup
                        currentBusiness={{ 
                            businessName: currentBusiness.businessName,
                            contactName: name 
                        }}
                        selectedBusiness={{ 
                            title: selectedBusinessForConnection.business,
                            contactName: selectedBusinessForConnection.name,
                            contactEmail: currentBusiness.contactEmail
                        }}
                        emailTemplate={emailTemplate}
                        setEmailTemplate={setEmailTemplate}
                        isLoading={isSendingConnection}
                        onCancel={handleCancelConnection}
                        onRequest={handleConnectionRequest}
                    />
                )}

                </div>
    )
}

export default MessageField;