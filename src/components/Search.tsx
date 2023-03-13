import { useState } from 'react'

const Search = ({ handleSearch }) => {

    const [inputValue, setInputValue] = useState('')

    const handleChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleSearch(inputValue)
    }

    return (
        <form className="bg-red-40 py-6 flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="block w-3/4 bg-white rounded-md py-2 pl-9 pr-3"
                placeholder="Search for anything..."
            />
            <button
                type="submit"
                className="bg-green-900 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
            >
                Submit
            </button>
        </form>
    )
}

export default Search
