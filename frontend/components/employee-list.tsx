"use client"
import { useState } from 'react'
import Image from 'next/image'
import { getRandomInt } from '@/utils/random-number';
import { useRouter } from 'next/navigation';

 export default function EmployeeListTile({name, position, id}: {name?: string, position?: string, id?: number}) {
    const [imgSource, setImageSource] = useState(`https://randomuser.me/api/portraits/med/men/${getRandomInt(1, 99)}.jpg`);
    const router = useRouter()

    const handleOnClick = () => {
        router.push(`/employees/${id}?profile=${encodeURIComponent(imgSource)}`);
    }

    return (
        <button className="w-full" onClick={handleOnClick}>
            <div className="flex items-center space-x-4 px-4 py-2 bg-black rounded-lg hover:bg-gray-700 transition-colors duration-200 hover:cursor-pointer border border-gray-700">
                <Image src={imgSource} onError={() => setImageSource('/images/dummy.avif')} alt="Employee Avatar" width={48} height={48} className="rounded-full"/>
                <div className='flex flex-col justify-center items-start'>
                    <h3 className="text-white font-semibold">{name}</h3>
                    <p className="text-gray-400 text-sm">{position}</p>
                </div>
            </div>
        </button>
    );
 }