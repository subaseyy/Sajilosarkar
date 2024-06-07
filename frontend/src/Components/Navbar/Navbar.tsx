import NavImg from '../../../public/SajiloSarkar.svg'

const Navbar = () => {
  return (
    <nav className="flex justify-around h-16 text-xl items-center bg-slate-900 text-white ">
        <div className=" flex items-center text-3xl font-extrabold">
        <a href="/">  <img src={NavImg} className='h-16 p-2' alt=""/> </a>
         <a href="/">  Sajilo <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1">Sarkar </span> </a>
        </div>
        <div >
            <ul className="flex">
                <li className="mx-2 hover:bg-slate-300 hover:text-black p-1 hover:cursor-pointer">Home </li>
                <li className="mx-2 hover:bg-slate-300 hover:text-black p-1 hover:cursor-pointer">About Us </li>
                <li className="mx-2 hover:bg-slate-300 hover:text-black p-1 hover:cursor-pointer">Our Features </li>
                <li className="mx-2 hover:bg-slate-300 hover:text-black p-1 hover:cursor-pointer">Contact Us </li>
            </ul>
        </div>
        <div>
            <button className="px-4 text-base border rounded-full mx-1 py-1 hover:bg-green-800" type="button">Login</button>
            <button className="px-4 text-base border rounded-full mx-1 py-1 bg-green-800 hover:bg-slate-900" type="button">SigUp</button>
        </div>

    </nav>
  )
}

export default Navbar
