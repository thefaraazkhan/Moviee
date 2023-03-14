import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="bg-red-400 flex flex-row justify-between px-3 border-b-4 border-blue-900">
            <Link to="/">
                <h2 className=" pl-4 text-4xl font-bold text-blue-900">Nav</h2>
            </Link>
            <h2 className=" text-4xl font-bold text-blue-900">Login</h2>
        </div>
    )
}

export default Nav
