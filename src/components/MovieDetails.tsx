import { useState, useEffect } from 'react'
import Nav from './Nav'
import { Link, useParams } from 'react-router-dom'

const MovieDetails = () => {
    const [movieData, setMovieData] = useState([])
    const { imdbID } = useParams()

    const API_URL: string = 'http://www.omdbapi.com/?apikey=57108933'

    const getMovieData = async (imdbID) => {
        console.log(imdbID)
        const sample = await fetch(`${API_URL}&i={imdbID}&plot=full}`)
        const movieRes = await sample.json()
        console.log("Movie plot:", movieRes)
        setMovieData(movieRes)
    }

    useEffect(() => {
        getMovieData(imdbID)
    }, [movieData])

    return (
        <div>
            <Nav />
            <div className="h-[460px] flex flex-row w-full border-solid border-2 border-sky-500 mx-2 my-2 px-5" key={movieData.imdbID}>
                <div className='sm:w-full md:w-50'>
                    <img className=" h-[400px] object-contain" src={movieData.Poster !== "N/A" ? movieData.Poster : "https://via.placeholder.com/400"} alt="404" />
                </div>
                <div className="px-3 py-4 h-50 w-50">
                    <div className="font-bold text-xl mb-2 h-[90px]">{movieData.Title} | {movieData.Year}</div>
                    <p className="text-gray-700 text-base">
                        Type: {movieData.Type}
                    </p>
                    <div className="w-50">
                        <p className="w-[200] text-gray-900 text-xl">
                            Plot: {movieData.Plot}
                        </p>
                    </div>
                    <p className="text-gray-700 text-base">
                        Actors: {movieData.Actors}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails

