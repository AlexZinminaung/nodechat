import { Link } from "react-router";

const SearchResults = ({results}) => {

    return (
            <div className="w-full ">
                {results.length > 0 && <h1 className="p-2">Search Results</h1>}
                <ul className="w-full py-2 flex flex-col gap-2">
                    {
                        results.map(user => {
                            return (
                            <li key={user.id} >
                                <Link 
                                    className="flex gap-1 items-center hover:bg-green-200 p-2 rounded-sm"
                                    to={`/chat/${user.id}`}
                                >
                                    <span className="w-10 aspect-square bg-red-300 flex justify-center items-center rounded-full">{user.name[0]}</span>
                                    <span>{user.name}</span>
                                </Link>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
    );

}


export default SearchResults;