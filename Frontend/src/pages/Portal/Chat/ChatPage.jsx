import MessageField from "../../../components/Portal/Chat/MessageField";

// Message data, including author type and associated text, placeholder for now until persistence back end solution
let messageData = [
    {author: "agent", text: "Hello Mark!"},
    {author: "user", text: "Hello"}
]

const ChatPage = () => (
    <div className="bg-hero_portal-side_bar w-screen h-screen">
        <MessageField messageData={messageData}/>
    </div>
)

export default ChatPage;