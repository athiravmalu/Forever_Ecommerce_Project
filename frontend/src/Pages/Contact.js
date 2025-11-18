import React from 'react'
import contactimg from '../Assets/contact_img.png'

function Contact() {
  return (<>
   
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
          <img src={contactimg} alt="contact" className='max-w-full h-auto'/>
        </div>
        <div className='text-left md:pl-10 -mt-10'>
          <h2 className='text-lg font-semibold mb-4 text-black'>Our Store</h2>
          <p className='text-gray-600 text-sm leading-relaxed'>
            54709 Willms Station<br />
            Suite 350, Washington, USA
          </p>
          <p className='text-gray-600 text-sm mt-4'>
           Email: <span className='text-black font-medium'>info@foreverstore.com</span><br />
            Phone: <span className='text-black font-medium'>+1 (555) 123-4567</span>
          </p>
          <h2 className='text-lg font-semibold mt-8 mb-2 text-black'>Careers at Forever</h2>
          <p className='text-gray-600 text-sm mb-4'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-5 py-2 rounded-md hover:bg-black hover:text-white transition duration-300'>Explore Jobs</button>
        </div>
      </section>
      <section className="py-20 text-center px-4">
      <h2 className="text-3xl font-bold mb-3">
        Subscribe now & get <span className="text-pink-500">20% off</span>
      </h2>

      {/* Responsive paragraph */}
      <p className="text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0">
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 px-4 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none w-full sm:w-[32rem] focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button className="bg-black text-white px-8 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-pink-500 transition-colors duration-300 w-full sm:w-auto">
          SUBSCRIBE
        </button>
      </div>
    </section>
      </div>
      

    
    </>
  )
}

export default Contact
