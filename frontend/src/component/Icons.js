import React from 'react'
import icon1 from '../Assets/exchange_icon.png';
import icon2 from '../Assets/quality_icon.png';
import icon3 from '../Assets/support_img.png';

function Icons() {
    const policy=[
        {title:"Easy Exchange Policy",text:"We offer hassle free  exchange policy",img:icon1},
        {title:"Easy Exchange Policy",text:"We offer hassle free  exchange policy",img:icon2},
        {title:"Easy Exchange Policy",text:"We offer hassle free  exchange policy",img:icon3}
    ]
  return (
    <section className='py-12'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center gap-8'>
            
            {policy.map((p,i)=>(
                <div key={i} className='space-y-2'>
                  <div className="flex justify-center">
              <img src={p.img} alt={p.title} className="w-16 h-16 object-contain" />
            </div>
                <h4 className='font-semibold'>{p.title}</h4>
                <p className='text-gray-500 text-sm'>{p.text}</p>
                </div>

            ))}

        </div>

    </section>
  )
}

export default Icons
