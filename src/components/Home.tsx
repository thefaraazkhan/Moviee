import Nav from './Nav'
import MovieList from './MovieList'

const Home = () => {
    return (
        <div className="min-h-screen bg-red-400">
            <Nav />
            <div className='my-5'>
                <MovieList />
            </div>
            <h2 className="text-center text-4xl font-bold text-blue-900">
                Footer
            </h2>
        </div>
    )
}

export default Home

