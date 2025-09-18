import { useState, useEffect } from "react";
import { useLoading } from "../../../utils/LoadingContext";
import MessageField from "../../../components/Portal/Chat/MessageField";
import { getCurrentUserInfo } from "../../../api/user";

// Message data, including author type and associated text, placeholder for now until persistence back end solution
let messageData = [
    {author: "agent", text: "Hello how can I help you today?"},
]

const ChatPage = ({ chatType }) => {

    const { startLoading, stopLoading } = useLoading();
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
          startLoading();
          
          try {
            const res = await getCurrentUserInfo();
            setUserId(res.data.data.id);
            setUsername(res.data.data.firstName);
          } catch (error) {
            console.error('Error fetching user info:', error);
          } finally {
            stopLoading();
          }
        };
    
        fetchUserInfo();
      }, []);

    return (
        <div className="bg-gray-100">
            <MessageField messageData={messageData} user_id={userId} name={username} chatType={chatType}/>
        </div>
    )
}

export default ChatPage;