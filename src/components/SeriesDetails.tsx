import { useState, useEffect } from 'react'
import Nav from './Nav'
import { Link, useParams } from 'react-router-dom'

const SeriesDetails = () => {
    const [movieData, setMovieData] = useState({})
    const { seriesID } = useParams()

    const API_URL: string = `https://api.themoviedb.org/3/tv/${seriesID}?api_key=4387b35dd6f6aeab282d1700da0316c5`



    const getMovieData = async () => {
        console.log(seriesID)
        const sample = await fetch(`${API_URL}`)
        const movieRes = await sample.json()
        setMovieData(movieRes)
    }

    useEffect(() => {
        getMovieData()
    }, [])

    return (
        <div>
            <Nav />
            <div className="h-[460px] flex flex-row w-full border-solid border-2 border-sky-500 mx-2 my-2 px-5" key={movieData.id}>
                <div className='sm:w-full md:w-50'>
                    <img className=" h-[400px] object-contain" src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} alt="404" />
                </div>
                <div className="px-3 py-4 h-50 w-50">
                    <div className="font-bold text-xl mb-2 h-[90px]">Release Date: {movieData.release_date}</div>
                    <p className="text-gray-700 text-base">
                        Type: {movieData.Type}
                    </p>
                    <div className="w-50">
                        <p className="w-[200] text-gray-900 text-xl">
                            Ratings: {movieData.imdbRating}
                        </p>
                        <p className="w-[200] text-gray-900 text-xl">
                            Plot: {movieData.overview}
                        </p>
                    </div>
                    <p className="text-gray-700 text-base">
                        Actors: {movieData.id}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SeriesDetails

