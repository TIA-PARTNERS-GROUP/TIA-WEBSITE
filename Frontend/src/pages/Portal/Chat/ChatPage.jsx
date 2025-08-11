import MessageField from "../../../components/Portal/Chat/MessageField";

messageData = [];

const ChatPage = () => (
    <div className="bg-hero_portal-side_bar w-screen h-screen">
        <MessageField messageData={messageData}/>
    </div>
)

export default ChatPage;