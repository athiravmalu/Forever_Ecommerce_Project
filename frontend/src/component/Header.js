import React from 'react'
import headerimg from '../Assets/header_img.png'

const Header = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-700 mx-9 mt-28'>
      <div className='w-full sm:w-1/2 flex flex-col items-center sm:items-start justify-center py-10 sm:py-0 text-gray-500 space-y-5 px-9'>
        <div className='flex items-center gap-2'>
          <p className='w-8 md:w-11 h-[2px] bg-gray-500'></p>
          <p className='font-medium text-sm md:text-base'>Our Bestseller</p>
        </div>

        <h1 className='text-3xl sm:text-4xl font-semibold text-gray-500'>
          LATEST ARRIVALS
        </h1>

         <div className='flex items-center gap-2'>
        <p className='font-medium text-sm md:text-base'>SHOP NOW
          
        </p>
        <p className='w-8 md:w-11 h-[1px] bg-gray-500'></p>
        </div>
  
      </div>

      <div className='w-full sm:w-1/2 flex justify-center'>
        <img src={headerimg} alt="Header"/>
      </div>
    </div>
  )
}

export default Header

