'use client'

import React from 'react'
import {motion} from 'framer-motion'
import safLogo from '../public/safaricom.png'
import officeLogo from '../public/office.png'

type Props = {}

export default function ExperienceCard({}: Props) {
  return (
    <article className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 opacity-40 hover:opacity-100 cursor-pointer transition-opacity duration-200 overflow-hidden'>
        <motion.img
            initial={{
                y:-100,
                opacity:0
            }}
            transition={{ duration:1.2}}
            whileInView={{ 
                opacity:1,
                y:0
            }}
            viewport={{once:true}}
            className='w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center'
            src={safLogo.src}
            alt=''
            />
            <div className='px-0 md:px-10'>
                <h4 className=' text-2xl font-light '>Internship - Business Section</h4>
                <p className=' font-bold text-2xl mt-1'>Safaricom</p>
                <div className='flex space-x-2 my-2'>
                    {/* TechStack Used */}
                    <img
                    className='h-10 w-10 rounded-full'
                    src={officeLogo.src} alt="" />
                    <img
                    className='h-10 w-10 rounded-full'
                    src={officeLogo.src} alt="" />
                    <img
                    className='h-10 w-10 rounded-full'
                    src={officeLogo.src} alt="" />
                    <img
                    className='h-10 w-10 rounded-full'
                    src={officeLogo.src} alt="" />
                </div>
                <p className='uppercase py-5 text-gray-300'>Start ...  End</p>

                <ul className=' list-disc space-y-4 ml-5 text-lg'>
                    <li>Summary Points</li>
                    <li>Summary Points</li>
                    <li>Summary Points</li>
                    <li>Summary Points</li>
                    <li>Summary Points</li>
                </ul>
            </div>
    </article>
  )
}