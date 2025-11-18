import React from 'react'
import logo from '../Assets/logo.png'

function Footer() {
  return (
    <footer className='text-gray-500 py-10'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 md:px-10 lg:px-16 text-center sm:text-left'>
            <div>
                <img src={logo} alt="logo" className="h-10 w-auto mx-auto sm:mx-0 mb-4"></img>
                <p className='text-gray-500 mt-2 text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            
        </div>
        <div>
            <h4 className='font-semibold mb-3 text-gray-700'>COMPANY</h4>
            <ul className='space-y-2 text-sm'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>

            </ul>
        </div>
        <div>
            <h4 className='font-semibold mb-3'>GET IN TOUCH</h4>
            <p className='text-gray-400 text-sm'>+1-212-456-7890</p>
            <p className='text-gray-400 text-sm'>greatstackdev@gmail.com</p>

        </div>
        </div>
        <hr className="my-8 border-gray-300 w-11/12 mx-auto"/>
        <div className='text-center text-xs sm:text-sm text-gray-500 px-4'>Copyright 2024 © GreatStack.dev - All Right Reserved.

        </div>

    </footer>
  )
}

export default Footer

