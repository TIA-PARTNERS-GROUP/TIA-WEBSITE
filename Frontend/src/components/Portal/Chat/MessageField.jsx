import { useState } from "react";
import UpArrowIcon from "../../Icons/UpArrowIcon";
import { sendChatbotMessage } from "../../../api/chatbot";

const MessageField = ({ messageData, user_id, name }) => {

    const [localMessageData, setLocalMessageData] = useState(messageData);
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMessageChange = (event) => (
        setMessageText(event.target.value)
    );

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
        <div className="flex flex-col justify-center items-center gap-y-10 h-screen">
            <ul className="flex flex-col w-1/3 gap-y-4 overflow-y-auto">
                {localMessageData.map((message, index) => (
                    <li
                        key={index}
                        className={`flex rounded-full py-2 px-4 ${message.author === "user" ? "self-end bg-blue-600" : "self-start bg-white"}`}
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
            </ul>
            <form onSubmit={handleMessageSubmission} className="flex justify-between bg-gray-200 rounded-full w-1/3 py-2 px-4">
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
        </div>
    )
}

export default MessageField;