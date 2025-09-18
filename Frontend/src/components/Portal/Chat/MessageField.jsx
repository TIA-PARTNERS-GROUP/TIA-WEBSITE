import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UpArrowIcon from "../../Icons/UpArrowIcon";
import { sendChatbotMessage } from "../../../api/chatbot";

const MessageField = ({ messageData, user_id, name, chatType }) => {

    const navigate = useNavigate();
    const [localMessageData, setLocalMessageData] = useState(messageData);
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const handleMessageChange = (event) => (
        setMessageText(event.target.value)
    );

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

        try {
            const response = await sendChatbotMessage({ user_id, name, message: messageText });

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
                <ul ref={messagesContainerRef} className="flex flex-col w-[40%] gap-y-4 overflow-y-auto px-8">
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
                <form onSubmit={handleMessageSubmission} className="flex justify-between bg-gray-200 rounded-full w-[38%] py-2 px-4">
                    <input 
                        type="search" 
                        value={messageText}
                        onChange={handleMessageChange}
                        className="placeholder w-4/5 focus:outline-none bg-gray-200" 
                        placeholder="Message LLM..." 
                        disabled={loading}
                    />
                    <button className="bg-blue-600 rounded-full p-2" disabled={loading || !messageText.trim()}>
                        <UpArrowIcon className="text-white" />
                    </button>
                </form>
                <br></br>
            </div>
        </div>
    )
}

export default MessageField;