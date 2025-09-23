import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UpArrowIcon from "../../Icons/UpArrowIcon";
import { sendChatbotMessage } from "../../../api/chatbot";

const MessageField = ({ messageData, user_id, name, chatType }) => {

    const navigate = useNavigate();
    const [localMessageData, setLocalMessageData] = useState(messageData);
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialMessageSent, setInitialMessageSent] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const textareaRef = useRef(null);

    const getConnectionType = () => {
        switch (chatType) {
            case "Alliance Partners":
                return "connect:alliance";
            case "Complementary Partners":
                return "connect:complementary";
            case "Mastermind Partners":
                return "connect:mastermind";
            default:
                return "default";
        }
    }

    useEffect(() => {
        const sendInitialMessage = async () => {
            if (!initialMessageSent && user_id) {
                setInitialMessageSent(true);
                setLoading(true);
                
                const initialMessage = {
                    message: 
                        `Please begin this interaction by introducing your name as the TIA SmartConnect and saying you are here to assist with finding ${chatType}.
                         Respond without an affirmation.`,
                    chat_type: getConnectionType(),
                    region: "au",
                    lat: -27.4705,
                    lng: 153.026
                };

                try {
                    // Send the initial message
                    const response = await sendChatbotMessage({ 
                        user_id, 
                        name, 
                        message: JSON.stringify(initialMessage) 
                    });

                    // Process the bot's response and display it
                    let botText = "No response";
                    if (typeof response === "string") {
                        botText = response;
                    } else if (response && typeof response === "object") {
                        botText = response.text || response.message || response.error || response.detail || JSON.stringify(response);
                    }

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
            const response = await sendChatbotMessage({ user_id, name, message: messageText });
            console.log(response);

            let botText = "No response";
            if (typeof response === "string") {
                botText = response;
            } else if (response && typeof response === "object") {
                botText = response.text || response.message || response.error || response.detail || JSON.stringify(response);
                botText = `Sorry, something went wrong. ${botText.data}`;

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
                <ul ref={messagesContainerRef} className="flex flex-col w-[40%] gap-y-14 overflow-y-auto px-8">
                    {localMessageData.map((message, index) => (
                        <li
                            key={index}
                            className={`flex rounded-3xl py-2 px-4 ${message.author === "user" ? "self-end bg-blue-600" : "self-start bg-white"}`}
                        >
                            {typeof message.text === "object"
                                ? JSON.stringify(message.text)
                                : message.text}
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