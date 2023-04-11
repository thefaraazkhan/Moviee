import { useState } from 'react'

type SearchProps = {
    handleSearch: (searchTerm: string) => void
}

const Search = ({ handleSearch }: SearchProps) => {

    const [inputValue, setInputValue] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (inputValue === "") return
        handleSearch(inputValue)
    }

    return (
        // <form className="bg-red-40 py-6 flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        //     <input
        //         type="text"
        //         value={inputValue}
        //         onChange={handleChange}
        //         className="block w-3/4 bg-white rounded-md py-2 pl-9 pr-3"
        //         placeholder="Search for anything..."
        //     />
        //     <button
        //         type="submit"
        //         className="bg-red-500 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
        //     >
        //         Submit
        //     </button>
        // </form>
        <form className="flex align-center w-[100%]" onSubmit={handleSubmit}>
            <input
                type="text"
                className='w-[calc(100%-100px)] h-[50px] text-black bg-white border-0 outline-none rounded-[30px_0_0_30px] px-[15px] py-0 text-sm md:w-[calc(100%-150px)]'
                placeholder="Search for a movie or tv show...."
                onChange={handleChange}

            />
            <button
                className='w-[100px] h-[50px] bg-[#555555] text-white border-0 outline-0 rounded-[0_30px_30px_0] text-base cursor-pointer '
            >
                Search
            </button>
        </form>
    )
}

export default Search
