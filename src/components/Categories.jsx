// eslint-disable-next-line no-unused-vars
import React from 'react'
import { categories } from './data/data'

const Categories = () => {
    // console.log(categories);
  return (
    <div className='max-w-[1520px] m-auto px-4 py-12'>
        <h1 className=" text-orange-500 font-bold text-center text-3xl py-2">
                Trending Categories
        </h1>
        <div className='grid grid-cols-2 md:grid-cols-6 gap-5 py-5 px-2'>
            {
                categories.map((item) => (
                    <div key={item.id} className='duration-300 ease-in-out p-4 flex hover:scale-105 items-center'>
                        {/* <h2 className='font-bold sm:text-xl'>{item.name}</h2> */}
                        <img className='w-40 h-10 cursor-pointer shadow-xl object-cover rounded-xl' src={item.image} alt={item.name} />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Categories
