import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import CustomButton from './CustomButton'


const Navbar = () => {
    const Router = useRouter()

    return (
        <div className='flex md:flex-row justify-between gap-6 p-6'>
            <div>
                <p className='text-white font-bold text-3xl'>Fundr.</p>
            </div>
            <div className='font-epilogue md:relative hidden md:flex space-x-14 justify-center font-bold text-white items-center text-lg'>
                <p className='link'>Home</p>
                <p className='link'>About</p>
                <p className='link'>Contact Us</p>
            </div>
            <div className="hidden sm:flex space-x-5">
                <Link href="/create">
                    <div className={`w-[52px] h-[52px] rounded-full plus-linear-gradient sm:flex justify-center items-center cursor-pointer hidden`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white font-bold">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                </Link>
                <Link href="/profile">
                    <div className={`w-[52px] h-[52px] rounded-full bg-[#2c2f32] sm:flex justify-center items-center cursor-pointer hidden`}>
                        <img src={`assets/thirdweb.png`} alt="user" className="w-[60%] h-[60%] object-contain" />
                    </div>
                </Link>
            </div>

            {/* Profile Icon */}

            {/* Responsive hamburger menu */}
            <div className='sm:hidden'>
                <svg width="50" height="50" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className='text-white'>
                    <path d="M21 10H7"></path>
                    <path d="M21 6H3"></path>
                    <path d="M21 14H3"></path>
                    <path d="M21 18H7"></path>
                </svg>
            </div>

        </div>
    )
}

export default Navbar
