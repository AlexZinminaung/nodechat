import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { socket } from "../socket";
import { useParams, useNavigate } from "react-router";
import { v4 as uuidv4 } from 'uuid';

const PrivateRoom = () => {
    const [context, setContext] = useState('');
    const [userName, setUserName] = useState('');
    const [messages, setMessages] = useState([]);
    const {id} = useParams();
    
    let navigate = useNavigate();

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message)
            
            // first filter messages for private chat by check sender id and reciver id
            const isPrivateMessage = (
                (message.senderId == socket.id && message.recivierId == id) ||
                (message.recivierId == socket.id && message.senderId == id)
            )

            if (!isPrivateMessage)
            {
                return ;
            }

            // second filter message from sender not to duplicate

            setMessages( prev => {
                const exist = prev.some( msg => msg.messageId == message.messageId)
                if (exist) return prev;
                return [...prev, message];
            })
        })

        // redirect if user is disconnected
        socket.on('redirect', (response) => {
            alert(response.message);
            navigate(`/dashboard/${response.sender}`)
        })

        // restoring message
        socket.emit('restore', id);

        socket.on('restore', (recoverMessages, userName) => {
            console.log(recoverMessages);
            setUserName(userName);
            setMessages((prev) => [...recoverMessages])
        })

        return () => {
            socket.off('message')
            socket.off('redirect')
            socket.off('restore')


        };

    }, [])

    // state function
    const handleContextChange = (event) => {
        setContext(event.target.value);
    }
    
    const handleSubmit = (event) => {
        const message = {senderId: socket.id, recivierId: id, messageId: uuidv4(), context: context}
        setMessages((prev) => [...prev, message])
        event.preventDefault();
        socket.emit('message', message)
        setContext('');
    }

    return (
        <div key={id}  className="p-2 w-full md:w-[80%] md:m-auto h-[100dvh] flex flex-col">
            <nav className='flex justify-between items-center p-2 font-noto'>
                <div className="flex justify-center items-center gap-2">
                    <span className="w-10 aspect-square bg-red-300 flex justify-center items-center rounded-full">{userName[0]}</span>
                    <span>{userName}</span>
                </div>
                <ul className='flex gap-2'>
                <li className='p-2'>Home</li>
                <li className='bg-green-500 text-white p-2 rounded-sm'>Login</li>
                </ul>
            </nav>

            <div className="w-full flex-1 overflow-y-auto p-2 flex flex-col gap-2">
                {
                    messages.map( (msg) => {
                        return (
                            <p 
                                key={msg.messageId}
                                className={`${msg.senderId == socket.id && "self-end "} p-2 w-fit bg-blue-300 rounded-sm`}
                            >
                                {msg.context}
                            </p>
                        );
                    })
                }
            </div>
            <form 
                className="w-full flex border rounded-sm p-2"
                onSubmit={handleSubmit}
            >
                <input 
                    type="text" 
                    className="w-full outline-none"
                    value={context}
                    onChange={handleContextChange}
                />
                <button type="submit"><IoMdSend size={20}/></button>
            </form>
        </div>
    )
}


export default PrivateRoom;