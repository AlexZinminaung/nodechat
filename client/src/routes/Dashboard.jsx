
import { socket } from "../socket";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Searchbox from "../components/Searchbox";
import SearchResults from "../components/SearchResults";
import RecentChat from "../components/RecentChat";
const Dashboard = () => {

    const [userName, setUserName] = useState('');
    const [results, setResults] = useState([]);
    const [chats, setChats] = useState([]);
    // get user name from url
    const { name } = useParams();

    // connect socket initially
    useEffect(() => {
        socket.connect()

        socket.emit('online', {name: name})

        socket.on('restore chats', (chats) => {
            const filterChats = chats.map( chat => {
                if (chat[0].id == socket.id)
                {
                    return chat[1]
                }
                
                else {
                    return chat[0]
                }
            })

            setChats(prev => {
                return [...filterChats]
            })
        })

        socket.on('search', (results) => {
            setResults(results);
        })

        socket.on('chat', (user) => {
            // only add new chat not from the same user
            console.log('user', user);
            setChats(prev => {
                // check if this chat already exists in the latest state
                const isChatExist = prev.some(chat => chat.name === user.name);
                if (isChatExist) return prev;

                // append new chat
                return [...prev, user];
            });
        })
    

        return () => {
            socket.off('search')
            socket.off('chat')
            socket.off('restore chats')
        };
    }, [])


    // state function
    const handleChangeUserName = (value) => {
        setUserName(value.trim())
        socket.emit('search', {id: socket.id, name: value})
    }

    return (
            <div className="p-2 w-full md:w-[80%] md:m-auto">
                <Searchbox userName={userName} handleChangeUserName={handleChangeUserName}/>
                <SearchResults results={results}/>
                <RecentChat chats={chats}/>
            </div>
    );
}


export default Dashboard