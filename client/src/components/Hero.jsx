import { useState } from "react"
import { useNavigate } from "react-router"

const Hero = () => {
    const [userName, setUserName] = useState('')
    const navigate = useNavigate();

    // state functions
    const handleChangeUserName = (event) => {
        setUserName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/dashboard/${userName}`)
    }

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-2 font-noto'>
            <h1 className='text-2xl text-center text-blue-900'>Build by node.js socket.io</h1>
            <p className="text-center text-gray-400">Get connect with friends, family lightly</p>
            <form className="flex" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter Your Name" 
                    value={userName} 
                    onChange={handleChangeUserName}
                    className="border outline-none px-2"
                />
                <button className='p-2 bg-green-500 text-white rounded-sm'>Enter</button>
            </form>

        </div>
    )
}

export default Hero