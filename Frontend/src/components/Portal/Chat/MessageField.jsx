import { useState } from "react";
import UpArrowIcon from "../../Icons/UpArrowIcon";

const MessageField = ({ messageData }) => {

    const [localMessageData, setLocalMessageData] = useState(messageData);
    const [messageText, setMessageText] = useState('');

    const handleMessageChange = (event) => (
        setMessageText(event.target.value)
    );

    const handleMessageSubmission = (event) => {
        event.preventDefault();
        setLocalMessageData([...localMessageData, {author: "user", text: messageText}])
        setMessageText('');
    };

    return (
        <div className="flex flex-col justify-center items-center gap-y-10 h-screen">
            <ul className="flex flex-col w-1/3 gap-y-4 overflow-y-auto">
                {localMessageData.map((message, index) => (
                    <li
                    key={index}
                    className={`flex rounded-full py-2 px-4 ${message.author === "user" ? "self-end bg-blue-600" : "self-start bg-white"}`}
                    >
                    {message.text}
                    </li>
                ))}
                </ul>
            <form onSubmit={handleMessageSubmission} className="flex justify-between bg-gray-200 rounded-full w-1/3 py-2 px-4">
                <input 
                    type="search" 
                    value={messageText}
                    onChange={handleMessageChange}
                    className="placeholder w-4/5 focus:outline-none bg-gray-200" 
                    placeholder="Message LLM..." 
                />
                <button className="bg-blue-600 rounded-full p-2">
                    <UpArrowIcon className="text-white" />
                </button>
            </form>
        </div>
    )
}

export default MessageField;