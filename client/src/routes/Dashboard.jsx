
import { socket } from "../socket";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Searchbox from "../components/Searchbox";
import SearchResults from "../components/SearchResults";
import RecentChat from "../components/RecentChat";
const Dashboard = () => {

    const [userName, setUserName] = useState('');
    const [results, setResults] = useState([]);

    // get user name from url
    const { name } = useParams();

    // connect socket initially
    useEffect(() => {
        socket.connect()

        socket.emit('online', {name: name})
        socket.on('search', (results) => {
            setResults(results);
        })
    

        return () => {
            socket.off('search')
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
                <RecentChat/>
            </div>

    );
}


export default Dashboard