import { useState } from "react";

export default function Search() {
    const [searchText, setSearchText] = useState('');

    function handleKeyPress(event: any){
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submitBtn")?.click();
        }
    }

    return (
        <div>
            <h1 className="text-white text-5xl font-bold tracking-wide">Uncover</h1>
            
            <form className="flex flex-row gap-8 bg-gray-600 rounded px-8 py-6 mt-4">
                <input
                    id='input'
                    className="shadow-lg appearance-none border rounded w-full h-10 text-gray-500 pl-4"
                    placeholder='Add Entry:'
                    value={searchText}
                    onChange={(e) => {setSearchText(e.target.value)}}
                    onKeyPress= {handleKeyPress}
                />
                <button
                    id='submitBtn'
                    type='button'
                    className="bg-secondary hover:bg-blue-500 text-white font-bold
                        py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    // onClick={}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}