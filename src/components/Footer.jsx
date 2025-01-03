/* eslint-disable no-unused-vars */
import React from 'react'
import { FaDribbble, FaFacebook, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='max-w-[1520px] m-auto px-4 py-2 bg-[#24262b]'>
        <div className='py-16 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 text-white'>
            <div className='text-gray-400'>
                <h1 className='text-3xl w-full font-bold text-orange-700'>YumEats</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                </p>
            <div className='flex justify-between md:w-[50%] my-6'>
                <FaFacebook size={20} className='text-blue-500 hover:text-blue-700cursor-pointer' />
                <FaInstagram size={20} className='text-purple-500 hover:text-purple-700 cursor-pointer' />
                <FaTwitter size={20} className='text-blue-400 hover:text-blue-600 cursor-pointer' />
                <FaGithub size={20} className='text-gray-800 hover:text-gray-900 cursor-pointer' />
                <FaDribbble size={20} className='text-pink-500 hover:text-pink-700 cursor-pointer' />
            </div>
            </div>
            <div>
                <div>
                    <h6 className='font-medium text-[#9b9b9b]'>Location</h6>
                    <ul>
                        <li className='py-2 text-sm'>London</li>
                        <li className='py-2 text-sm'>New York</li>
                        <li className='py-2 text-sm'>Brazil</li>
                        <li className='py-2 text-sm'>India</li>
                    </ul>
                </div>
                
            </div>
            <div>
                    <h6 className='font-medium text-[#9b9b9b]'>Location</h6>
                    <ul>
                        <li className='py-2 text-sm'>London</li>
                        <li className='py-2 text-sm'>New York</li>
                        <li className='py-2 text-sm'>Brazil</li>
                        <li className='py-2 text-sm'>India</li>
                    </ul>
            </div>
            <div>
                    <h6 className='font-medium text-[#9b9b9b]'>Location</h6>
                    <ul>
                        <li className='py-2 text-sm'>London</li>
                        <li className='py-2 text-sm'>New York</li>
                        <li className='py-2 text-sm'>Brazil</li>
                        <li className='py-2 text-sm'>India</li>
                    </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer
