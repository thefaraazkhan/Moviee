/* eslint-disable */
import { useState, useEffect } from 'react'
import Nav from './Nav'
import { useParams, useNavigate } from 'react-router-dom'
import { BsPlayFill } from "react-icons/bs"
import { IoMdClose } from "react-icons/io"
// const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

import ReactPlayer from 'react-player'


const MovieDetails = () => {

    const navigate = useNavigate()

    const [movieData, setMovieData] = useState<MovieData>({} as MovieData)
    const { movieID } = useParams()
    const [showPlayer, setShowPlayer] = useState(false)
    const [trailer, setTrailer] = useState("")

    type Genre = {
        id: number
        name: string
    }

    type VideoResult = {
        key: string
        site: string
        type: string
        id: string

    }

    type MovieData = {
        id: number
        title: string
        poster_path: string
        release_date: string
        overview: string
        media_type: string
        original_language: string
        runtime: number
        vote_average: number
        genres: Genre[]
        videos: {
            results: VideoResult[]
        }


        // Add other properties as needed
    }

    const API_KEY = import.meta.env.VITE_TMBD_API_KEY

    const getMovieData = async () => {
        try {
            const sample = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&append_to_response=videos`)
            const movieRes = await sample.json()
            setMovieData(movieRes)
            // console.log("Movie datra", movieData)
        } catch (error) {
            console.error("Error fetching movie data", error)
        }
    }


    const formatDate = (date: string) => {
        const newDate = new Date(date)
        const year = newDate.getFullYear()
        return year
    }

    useEffect(() => {
        const runGetMovieData = async () => {

            await getMovieData()
            console.log("In movie useeffect", movieData)
            const trailerIndex = await movieData?.videos?.results?.findIndex((res: any) => res.type === "Trailer")
            console.log('trailerIndex', trailerIndex)
            console.log('trailerIndex key', movieData?.videos?.results[trailerIndex || 0]?.key)
            const trailerURL = `https://www.youtube.com/watch?v=${movieData?.videos?.results[trailerIndex || 0]?.key}`
            console.log("This is ulr", trailerURL)
            await setTrailer(trailerURL)
        }
        runGetMovieData()

    }, [])

    return (
        <div className='w-[100vw]'>
            <Nav />

            <div className='bg-[#04152d] sm:width-[100vw] min-h-[100vh]'>
                {/* <div className="h-[460px] flex flex-row w-full border-solid border-2 border-sky-500 mx-2 my-2 px-5" key={movieData.id}>
                <div className='sm:w-full md:w-50'>
                    <img className=" h-[400px] object-contain" src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} alt="404" />
                </div>
                <div className="px-3 py-4 h-50 w-50">
                    <div className="font-bold text-xl mb-2 h-[90px]">Release Date: {formatDate(movieData.release_date)}</div>
                    <p className="text-gray-700 text-base">
                        Type: {movieData.media_type}
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
            </div> */}

                <div className='backdrop-img mt-[50px]'>
                    <img
                        src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
                        className='object-cover object-center w-[100%] h-[100vh]'
                    />
                </div>

                {/* THis is here */}

                <div className="bg-secondary relative px-4 md:px-0 text-white">
                    <div className="container mx-auto min-h-[calc(100vh-77px)] flex items-center relative">
                        <div className="flex-col lg:flex-row flex gap-10 lg:mx-10 py-20">
                            <div className="mx-auto flex-none relative">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movieData?.poster_path}`}
                                    width={700}
                                    height={700}
                                    className="w-[300px] object-cover"
                                    alt="movie poster"
                                />
                            </div>

                            <div className="space-y-6">
                                <div className="uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4 text-white">
                                    {movieData?.title}
                                </div>

                                <div className="flex gap-4 flex-wrap">
                                    {movieData?.genres?.map((genre, index) => (
                                        <div className="flex gap-4 text-textColor hover:text-white cursor-pointer" key={genre?.id}>
                                            <div>{genre?.name}</div>
                                            <div className="text-textColor">{index + 1 !== movieData?.genres?.length ? "/" : ""}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                                    <div>Language: {movieData?.original_language?.toUpperCase()}</div>
                                    <div>Release: {movieData?.release_date}</div>
                                    <div>Runtime: {movieData?.runtime} MIN.</div>
                                    <div>Rating: {movieData?.vote_average} ⭐</div>
                                </div>

                                <div className="pt-14 space-y-2 pr-4">
                                    <div>OVERVIEW:</div>
                                    <div className="lg:line-clamp-4">{movieData?.overview}</div>
                                </div>

                                <div className="w-40 flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-[#b4b4b4]">
                                    <button onClick={() => navigate(-1)}>Go back</button>
                                </div>

                                <div
                                    className="inline-block pt-6 cursor-pointer"
                                    onClick={() => setShowPlayer(true)}
                                >
                                    <div className="flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-[#b4b4b4]">
                                        <BsPlayFill size={24} />
                                        Watch Trailer
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* React Player */}
                        <div
                            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
                                }`}
                        >
                            <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-0.5">
                                <span className="font-semibold">Playing Trailer</span>
                                <div
                                    className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                                    onClick={() => setShowPlayer(false)}
                                >
                                    <IoMdClose className="h-5" />
                                </div>
                            </div>
                            <div className="relative pt-[56.25%]">
                                <ReactPlayer
                                    url={trailer}
                                    width="100%"
                                    height="100%"
                                    style={{ position: "absolute", top: "0", left: "0" }}
                                    controls={true}
                                    playing={showPlayer}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* THis is here */}
            </div>
        </div>
    )
}

export default MovieDetails

