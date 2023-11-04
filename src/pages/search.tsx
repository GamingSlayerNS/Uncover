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
        <div className="my-auto mx-auto">
            <h1 className="text-white text-center text-5xl font-bold tracking-wide">Un<strong className="text-secondary">cover</strong></h1>
            
            <form className="flex flex-row justify-center bg-gray-600 rounded-full p-4 my-10">
                <input
                    id='input'
                    className="shadow-lg appearance-none border rounded-l-full w-[32rem] h-10 text-gray-500 pl-4"
                    placeholder='Browse:'
                    value={searchText}
                    onChange={(e) => {setSearchText(e.target.value)}}
                    onKeyDown= {handleKeyPress}
                />
                <button
                    id='submitBtn'
                    type='button'
                    className="bg-secondary hover:bg-blue-500 text-white font-bold
                        w-32 py-2 px-4 rounded-r-full focus:outline-none focus:shadow-outline"
                    // onClick={}
                >
                    Search
                </button>
            </form>
        </div>
    )
}