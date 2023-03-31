import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="bg-red-400 w-[100%] h-[60px] translate-y-0 z-[2] flex flex-row justify-between px-3 ">
            <Link to="/">
                <h2 className=" pl-4 m-2 text-3xl font-bold text-[#04152d] cursor-pointer relative">Movieee</h2>
            </Link>

            <Link to="/">
                <h2 className=" pl-4 m-2 text-3xl font-bold text-[#04152d] cursor-pointer relative">Hi there</h2>
            </Link>
            {/* <h2 className=" text-4xl font-bold text-blue-900">Login</h2> */}
        </div>
    )
}

export default Nav
