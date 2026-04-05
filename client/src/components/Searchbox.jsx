import { CiSearch } from "react-icons/ci";

const Searchbox = ({userName, handleChangeUserName}) => {

    return (
            <form 
                className="flex border justify-center items-center"
                onSubmit={(event) => { event.preventDefault()}}
            >
                <input 
                    type="text" 
                    className="w-full outline-none p-2"
                    value={userName}
                    onChange={(event) => { handleChangeUserName(event.target.value)}}
                />
                <CiSearch size={20}/>
            </form>
    );
}


export default Searchbox;