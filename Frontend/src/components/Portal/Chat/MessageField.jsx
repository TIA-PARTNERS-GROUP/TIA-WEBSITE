import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import { sendChatbotMessage } from "../../../api/chatbot";
import ReactMarkdown from "react-markdown";
import UpArrowIcon from "../../Icons/UpArrowIcon";

const MessageField = ({ messageData, user_id, name, chatType }) => {

    const navigate = useNavigate();
    const [localMessageData, setLocalMessageData] = useState(messageData);
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialMessageSent, setInitialMessageSent] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const textareaRef = useRef(null);

    // Geolocation using react-geolocate, default to QUT if no geolocation
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        userDecisionTimeout: 10000,
    });

    const resetChatbot = async () => {
        const res = await resetChatbot;
        setLocalMessageData([]);
        setInitialMessageSent(false);
    };

    useEffect(() => {
        const lastChatType = sessionStorage.getItem("lastChatType");

        if (lastChatType !== chatType) {
            resetChatbot();
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
            return response.trim() 
                ? response 
                : "Sorry, the chatbot returned an empty response. Please try again.";
        } else if (response && typeof response === "object") {
            if (response.error || response.detail) {
                return `Sorry, the chatbot is currently unavailable. Please try again later. Error: ${response.error || response.detail}`;
            }
            if ((response.text && response.text.trim()) || (response.message && response.message.trim())) {
                return response.text || response.message;
            }
            return "Sorry, the chatbot returned an empty response. Please try again.";
        }
        return "Sorry, no response received from the chatbot. Please try again.";
    };

    useEffect(() => {
        const sendInitialMessage = async () => {
            if (!initialMessageSent && user_id) {
                setInitialMessageSent(true);
                setLoading(true);


                try {
                    // Send the initial message
                    const response = await sendChatbotMessage({ 
                        user_id, 
                        name, 
                        message: `Hello!`,
                        chat_type: getConnectionType(),
                        region: "au",
                        lat: userLat,
                        lng: userLng
                    });

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
            const response = await sendChatbotMessage({
                user_id, 
                name, 
                message: messageText, 
                chat_type: getConnectionType(),
                region: "au",
                lat: userLat,
                lng: userLng
            });
            console.log(response);

            const botText = getBotResponseText(response);

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
                className={`flex rounded-3xl py-3 px-4 ${message.author === "user" ? "self-end bg-blue-600 text-white" : "self-start bg-white text-gray-800 border max-w-[70%] break-words inline-block"}`}
            >
                <div className={message.author === "user" ? "max-w-max" : "w-full"}>
                    <div className={message.author === "bot" ? "prose prose-sm" : "prose prose-invert prose-sm"}>
                        {typeof message.text === "object" 
                            ? JSON.stringify(message.text)
                            : <ReactMarkdown
                                components={{
                                    pre: ({node, ...props}) => (
                                        <pre {...props} className="whitespace-pre-wrap bg-gray-50 p-3 rounded w-full my-6" />
                                    ),
                                    p: ({node, ...props}) => (
                                        <p {...props} className="mb-0 leading-6" />
                                    ),
                                    br: ({node, ...props}) => (
                                        <br {...props} style={{ lineHeight: '2' }} />
                                    )
                                }}
                            >
                                {message.text}
                            </ReactMarkdown>
                        }
                    </div>
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
        </div>
    )
}

export default MessageField;