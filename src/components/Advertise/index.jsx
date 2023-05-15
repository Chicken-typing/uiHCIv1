import React from 'react'
import { Typography } from 'antd';

function Advertise({DataInfo}) {
 
  
  return (
    <div className='bg-white mb-[150px] '>
      <div className='mx-auto my-auto py-10 px-5 max-w-[80%]'>
        <div className="grid grid-cols-1 gap-y-[20px] sm:grid-cols-2 sm:gap-x-[40px] s:gap-y-[140px] lg:grid-cols-3 xl:gap-x-8 ">

          {DataInfo.map((advertise) => (
           <div key={advertise.id} className='min-h-[350px] w-full'>
           <img src={advertise.imgSrc} alt="" className='w-full h-full object-cover object-center lg:h-full lg:w-full'/>
           <h2 className='mt-[20px] text-sm  font-bold font-sans'>{advertise.title}</h2>
           <Typography.Paragraph className='mt-1 text-xl antialiased font-normal  ' ellipsis>{advertise.info}</Typography.Paragraph>
          </div>
          ))}


        </div>

      </div>
     

    </div>
  )
}

export default Advertise