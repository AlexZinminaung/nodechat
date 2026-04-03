import logo from '../assets/whatsapp.png'; 

const Navbar = () => {

    return (
        <nav className='flex justify-between items-center p-2 font-noto'>
            <div className='w-[40px] aspect-square overflow-hidden'>
            <img className=' block w-full' src={logo}/>
            </div>
            <ul className='flex gap-2'>
            <li className='p-2'>Home</li>
            <li className='bg-green-500 text-white p-2 rounded-sm'>Login</li>
            </ul>
        </nav>
    )
}


export default Navbar;