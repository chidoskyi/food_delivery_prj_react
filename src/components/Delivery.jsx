// eslint-disable-next-line no-unused-vars
import React from 'react'

const Delivery = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
        <h3 className='text-orange-500 font-bold text-3xl text-center'>Quick Delivery App</h3>
        <div className='max-w-[1240px] gap-3 mx-auto grid md:grid-cols-2'>
            <img className='w-[550px] h-[400px]  mx-auto my-4' src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' alt='' />
            <div className='flex flex-col justify-center'>
                    <p className='text-[#00df9a] font-bold'>Get The App</p>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Limitless Convenience on-demand</h1>
                    <p>
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                    </p>
                    <div className='flex justify-between'></div>
                    <button className='bg-black text-[#00df9a] font-medium rounded-md md:mx-0 px-auto py-3 my-6 mt-4 w-[200px]'>Get it on Google Play</button>
                    {/* <button className='bg-black text-white rounded-md px-2 py-2 mt-4 w-[200px]'>Get it on App Store</button> */}
            </div>
            <div>
            </div>
        </div>
    </div>
  )
}

export default Delivery
