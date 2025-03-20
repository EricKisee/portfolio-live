'use client'
import React from 'react'
import {motion} from "framer-motion"
import { PageInfo } from '@/typings'
import { urlFor } from '@/sanity'

type Props = {
  pageInfo: PageInfo
}

export default function About({pageInfo}: Props) {
  return (
    <motion.div 
      initial={{opacity:0}}
      whileInView={{opacity:1}}
      transition={{duration:1.5}}
      className='h-screen flex flex-col relative text-center md:text-left
     md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>About</h3>

        <motion.img
          initial={{ 
            x:-200,
            opacity:0 
          }}
          whileInView={{ 
            x:0 ,
            opacity:1
          }}
          transition={{
            duration:1.2
          }}
          // viewport={{once:true}}
          src={urlFor(pageInfo?.profilePic).url()}
          className='-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-90 md:h-90 xl:w-[500px] xl:h-[500px]'
          />

          <div className='space-y-10 px-0 md:px-10'>
            <h4 className='text-4xl font-semibold'>
              The {" "}
              <span className='underline decoration-[#f7ab0a]/50'>Visionary</span>{" "} Technologist
              </h4>
                <p className='text-sm font-bold italic'>&quot;Great software isn&rsquo;t just built&mdash;it&rsquo;s engineered with precision, tested for excellence, and deployed with resilience.&quot;</p>
              <p className='text-sm'>{pageInfo?.backgroundInformation}</p>
          </div>

    </motion.div>
  )
}