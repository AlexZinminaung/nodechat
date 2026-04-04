import { Link } from "react-router";

const RecentChat = ({chats}) => {

    return (
            <div>
                <h1 className="p-2">Recent conversation</h1>
                <ul className="w-full py-2 flex flex-col gap-2">
                    {
                        chats.map( (chat, index) => {
                            return (
                                <li 
                                    key={index}
                                >
                                    <Link to={`/chat/${chat.id}`} className="flex gap-1 items-center">
                                        <span className="w-10 aspect-square bg-red-300 flex justify-center items-center rounded-full">{chat.name[0]}</span>
                                        <span>{chat.name}</span>
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
    );
}

export default RecentChat;