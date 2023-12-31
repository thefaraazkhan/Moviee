import { useState, useEffect } from 'react'
import '@splidejs/splide/dist/css/splide.min.css'
import { Link } from 'react-router-dom'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

const Popular = () => {
    const [popular, setPopular] = useState([])

    const API_KEY: string = import.meta.env.VITE_TMBD_API_KEY

    type Movie = {
        id: number
        title: string
        name: string
        media_type: string
        poster_path: string | null
        // Add other properties as needed
    }

    useEffect(() => {
        getPopular()
        console.log("This is env:", import.meta.env.VITE_TMBD_API_KEY)
    }, [])

    const getPopular = async () => {
        const check = localStorage.getItem("popular")
        if (check) {
            setPopular(JSON.parse(check))
        } else {
            const popularRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)

            const jsonData = await popularRes.json()
            const popularmovies = jsonData.results

            localStorage.setItem("popular", JSON.stringify(popularmovies))
            setPopular(popularmovies)
            // console.log(popular[0])
        }
    }
    return (
        <div
            className='flex justify-center items-center text-center'
        >
            <Splide
                className='flex justify-center items-center text-center'
                options={{
                    perPage: 5,
                    arrows: true,
                    pagination: false,
                    drag: 'free',
                    gap: '3rem',
                    breakpoints: {
                        640: {
                            destroy: true,
                        },
                        1024: {
                            perPage: 4,
                        },
                        1440: {
                            perPage: 5,
                        },
                    },
                }}>
                {popular.map((movie: Movie) => {
                    return (
                        <SplideSlide key={movie.id}>
                            <Link to={"/movie/" + movie.id}>
                                <div className='flex flex-col text-slate-900 transition duration-500 hover:scale-105 relative group mb-2'>
                                    <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} className='rounded-md opacity-90 hover:opacity-10 ' />
                                    <div className='absolute h-[100%] w-[100%] inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 text-4xl text-white'>
                                        <p className='text-4xl md:text-2xl opacity-0 hover:opacity-100 text-white'>{movie.title}</p>
                                    </div>
                                </div>
                            </Link>
                        </SplideSlide>
                    )
                })}
            </Splide>
        </div>
    )
}

export default Popular