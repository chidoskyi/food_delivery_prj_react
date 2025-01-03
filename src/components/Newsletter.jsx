// eslint-disable-next-line no-unused-vars
import React from 'react'

const Newsletter = () => {
  return (
    <div className='max-w-[1520px] gap-2 flex flex-col sm:flex-row justify-between text-white bg-[#24262b] m-auto px-4 py-12 pb-0'>
        <div className='lg:col-span-2 my-4'>
            <h1 className=" text-orange-500 font-bold text-center text-3xl py-2">
                Need advice on how to increase your flow?
            </h1>
            <p className=' text-gray-400'>Sign up to join our newsletter and stay up to date</p>
            <hr className='my-8 bg-gray-600' />
        </div>
        <div className='my-4'>
            <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
                <input type="email" className='p-3 flex w-full rounded-md text-black' placeholder='Enter Email'/>
                <button className='w-[100%] p-3 m-4 bg-orange-500 border-none text-white sm:w-[200px] rounded-md font-bold'>Notify Me</button>
            </div>
                <p className='text-gray-400  flex justify-center sm:text-center'>we are concerned about the security of your data, read{""} <span className='text-[#00df9a] font-bold cursor-pointer pl-1'> Privacy Policy</span></p>
            
        </div>
    </div>
  )
}

export default Newsletter
