import React from 'react'
import aboutimg from '../Assets/about_img.png'

function About() {
  return (
    <div className='text-gray-500'>
      <section className="pt-28 pb-10 text-center">
        <div className="flex items-center justify-center space-x-4">
          <h2 className="text-2xl font-semibold tracking-wide">
            ABOUT<span className="font-bold ml-2 text-gray-800">US</span>
          </h2>
          <span className="block w-16 h-[2px] bg-gray-400"></span>
        </div>
      </section>
      <section className='max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center'>
              <div className='flex justify-center -mt-8'>
                <img src={aboutimg} alt="contact" className='max-w-full h-auto'/>
              </div>
              <div className='text-left md:pl-10 -mt-10'>
                <p className='text-gray-600 text-sm mb-4'>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
                </p>
                <p className='text-gray-600 text-sm mb-4'>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                <p className='text-gray-600 text-sm mb-4'>Our Mission</p>
                <p className='text-gray-600 text-sm mb-4' >Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
              </div>
              </section>
              <section className='max-w-6xl mx-auto px-6 py-16'>
                <h2 className=' text-2xl font-semi-bold'>WHY<span className='font-bold ml-2'>CHOOSE US</span></h2>
       <div className='grid grig-cols-1 md:grid-cols-3 text-center py-10'>
        <div className='  border border-gray-400 py-10'>
          <h4 className='font-semibold mb-3'>Quality Assurance:</h4>
          <p className='text-sm text-gray-600 '>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className=' border border-gray-400 py-10 '>
          <h4 className='font-semibold mb-3'>Convenience: </h4>
          <p className='text-sm text-gray-600 '>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border border-gray-400 py-10'>
          <h4 className='font-semibold mb-3'>Exceptional Customer Service: </h4>
          <p className='text-sm text-gray-600 '>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>

       </div>
              </section>

    </div>
  )
}

export default About
