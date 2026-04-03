
const RecentChat = () => {

    return (
            <div>
                <h1 className="p-2">Recent conversation</h1>
                <ul className="w-full py-2 flex flex-col gap-2">
                    <li className="flex gap-1 items-center">
                        <span className="w-10 aspect-square bg-red-300 flex justify-center items-center rounded-full">Z</span>
                        <span>Zin Min Aung</span>
                    </li>
                    
                    <li className="flex gap-1 items-center">
                        <span className="w-10 aspect-square bg-red-300 flex justify-center items-center rounded-full">M</span>
                        <span>Mary</span>
                    </li>
                </ul>
            </div>
    );
}

export default RecentChat;