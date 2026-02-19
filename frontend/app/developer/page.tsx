"use client"
export default function DeveloperPage(){

    const handleOnClick = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
            if (newWindow) {
              // Focus on the new tab if it was successfully opened
              newWindow.focus();
            }
    }

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <h1 className="mb-5 ">Email: <span className="hover:cursor-copy">developervick@gmail.com</span></h1>
                <button onClick={()=>handleOnClick('https://linkedin.com/in/vivek-kustwar')} className="bg-black hover:cursor-pointer hover:bg-blue-500  px-4 py-2 rounded-lg border border-blue-500">Open Linkedin Profile</button>
            </div>
        </div>
    )
}