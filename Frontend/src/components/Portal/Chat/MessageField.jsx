import { useState } from "react";
import UpArrowIcon from "../../Icons/UpArrowIcon";

const MessageField = ({ messageData }) => {

    const [userMessageText, setUserMessageText] = useState('');

    const handleUserMessageChange = (event) => (
        setUserMessageText(event.target.value)
    );

    const handleUserMessageSubmission = (event) => {
        event.preventDefault();
        console.log("Submit")
    };

    return (
        <div className="flex justify-center">
            <ul>
            {messageData.map((message, index) => {
                <li key={index}>{message}</li>
            })}
            </ul>
            <form onSubmit={handleUserMessageSubmission} className="flex absolute justify-between top-1/2 bg-white rounded-full w-1/3 py-2 px-4">
                <input 
                    type="search" 
                    value={userMessageText}
                    onChange={handleUserMessageChange}
                    className="placeholder w-4/5 focus:outline-none" 
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