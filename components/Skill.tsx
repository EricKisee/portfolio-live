'use client'
import React from 'react'
import {motion} from 'framer-motion'
import type { Skill } from '@/typings'
import { urlFor } from '@/sanity'


type Props = {
    directionLeft?: boolean
    skill: Skill
}

export default function Skill({skill, directionLeft}: Props) {
  return (
    <div className='group relative flex cursor-pointer'>
        <motion.img
        initial={{
            x: directionLeft? -200:200,
            opacity: 0
        }}
        transition={{duration:1}}
        whileInView={{ opacity:1, x:0}}
        src={urlFor(skill.image).url()}
        alt=''
        className='sm:flex hidden rounded-full border border-gray-500 object-cover w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 filter group-hover:grayscale transition duration-300 ease-in-out'
        />
        <img
        src={urlFor(skill.image).url()}
        alt=''
        className='flex sm:hidden rounded-full border border-gray-500 object-cover w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 filter group-hover:grayscale transition duration-300 ease-in-out'
        />
        <div className=' absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28  rounded-full z-0 '>
            <div className='flex items-center justify-center h-full'> 
                <p className='text-sm sm:text-3xl font-bold text-black opacity-100'>{skill.progress}%</p>
            </div>
        </div>
    </div>
  )
}