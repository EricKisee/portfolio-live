'use client'
import React from 'react'
import {motion} from 'framer-motion'
import ExperienceCard from './ExperienceCard'
import { Experience } from '@/typings'

type Props = { 
  experiences:Experience[]
}

export default function WorkExperience({experiences}: Props) {
  return (
    <motion.div 
      initial={{opacity:0}}
      whileInView={{opacity:1}}
      transition={{duration:1.5}}
       className='h-screen flex relative overflow-hidden flex-row text-left md:flex-row max-w-full sm:px-10 justify-evenly mx-auto items-end'>
        
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl w-full text-center'> Experience </h3>
        {/* <div className="w-full flex-1 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#F7AB0A] scrollbar-track-transparent"> */}

        <div className='w-full  mt-5 flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#F7AB0A] scrollbar-track-transparent' >
            {experiences.map( experience=>(
              <ExperienceCard key={experience._id} experience={experience}/>
            ))}
        </div>
    </motion.div>
  )
}