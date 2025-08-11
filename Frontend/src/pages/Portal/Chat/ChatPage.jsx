import MessageField from "../../../components/Portal/Chat/MessageField";

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