import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import CustomButton from './CustomButton'
const Navbar = () => {
    const Router = useRouter()
    const address = "hello"
    return (
        <div className='flex md:flex-row justify-between mb-[35px] gap-6 p-6'>
            <div>
                <p className='text-white font-bold text-3xl'>Fundr.</p>
            </div>
            <div className='font-epilogue md:relative hidden md:flex space-x-14 justify-center font-bold text-white items-center text-lg'>
                <p className='link'>Home</p>
                <p className='link'>About</p>
                <p className='link'>Contact Us</p>
            </div>
            <div className="hidden sm:flex space-x-5">
                {/* Button */}
                <CustomButton
                    title={address ? 'Create a campaign' : 'Connect'}
                    styles={address ? 'bg-[#1dc071] linear-gradient-btn' : 'bg-[#8c6dfd]'}
                />
                <Link href="/profile">
                    <div className={`w-[52px] h-[52px] rounded-full bg-[#2c2f32] sm:flex justify-center items-center cursor-pointer hidden`}>
                        <img src={`assets/thirdweb.png`} alt="user" className="w-[60%] h-[60%] object-contain" />
                    </div>
                </Link>
            </div>
            
            {/* Profile Icon */}

            {/* Responsive hamburger menu */}
            <div className='sm:hidden'>
                <svg width="50" height="50" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className='text-white'>
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
