

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
    // console.log(movie)
    return (
        <div className="h-[560px] w-[310px] border-solid border-2 border-sky-500 mx-2 my-2 px-5" key={imdbID}>
            <div>
                <img className="w-full h-[400px] object-contain" src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} alt="404" />
            </div>
            <div className="px-6 py-4 h-50 w-50">
                <div className="font-bold text-xl mb-2 h-[90px]">{Title}</div>
                <p className="text-gray-700 text-base">
                    {Year} - {Type}
                </p>


            </div>
        </div>
    )
}

export default MovieCard
