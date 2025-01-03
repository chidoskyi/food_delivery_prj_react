// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { 
    ArrowRight,
    ArrowLeft,
    Circle   
} from 'lucide-react';

const Featured = () => {
    const sliderData = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",    
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=60",    
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",    
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",    
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",       
        },
    ]
    const [currentIndex, setCurrentIndex] = useState(0);
     const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? sliderData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        console.log(isFirstSlide);
        console.log(newIndex);
    };
    const nextSlide = () => {
        const isLastSlide = currentIndex === sliderData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        console.log(isLastSlide);
        console.log(newIndex);
    };

    const moveToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
        console.log(slideIndex);
    };
  return (
    <>
    <div className='max-w-[1520px] h-[500px]  w-full relative py-4 px-4 group pt-10'>
        <div className='w-full h-full rounded-2xl bg-center bg-cover duration-500 bg-no-repeat' style={{backgroundImage: `url(${sliderData[currentIndex].image})`}}></div>
    
    <div className='absolute top-[50%] hidden group-hover:block -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full  p-2 bg-orange-700 text-white cursor-pointer' onClick={prevSlide}>
        <ArrowLeft  />
    </div>
    <div className='absolute top-[50%]  hidden group-hover:block -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-orange-700 text-white cursor-pointer' onClick={nextSlide}>
        <ArrowRight />  
    </div>
        <div className="flex top-4 justify-center py-2">
            {sliderData.map((slide, slideIndex) => (
                <Circle
                    loading="lazy" 
                    key={slide.id}
                    onClick={() => moveToSlide(slideIndex)}
                    className={`mx-1 h-2 w-2 rounded-full cursor-pointer ${slideIndex === currentIndex ? 'bg-orange-700' : 'bg-white'}`}
                />
            ))}
        </div>
    </div>
    </>
  )
};
export default Featured
