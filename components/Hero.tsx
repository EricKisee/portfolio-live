'use client'

import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import BackgroundCircles from './BackgroundCircles'
import Link from 'next/link'
import { PageInfo } from '@/typings'
import { urlFor } from '@/sanity'


type Props = {
    pageInfo: PageInfo
}

export default function Hero ({pageInfo}:Props) {
    const [text, count] = useTypewriter({
        words : [
            `Software Development,`,
            `Solutions Architecture,`,
            `Quality Assuarance,`,
            `DevOps.`,
        ],
        loop: true,
        delaySpeed:2000
    })
    return ( 
    <div className='h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden'>
        <div>
            <h2 className='text-3xl uppercase text-gray-300 pb-2 tracking-[20px]'>{pageInfo?.name}</h2>
            <h2 className='text-sm uppercase text-gray-300 pb-2 tracking-[15px]'>{pageInfo?.role}</h2>
        </div>
        <BackgroundCircles/>
        <img 
            className='relative rounded-full h-32 w-32 mx-auto object-cover'
            src={urlFor(pageInfo?.heroImage).url()} alt='' />
        <div className='z-20'>
            <h1 className='text-5xl lg:text-6xl font-semibold px-10'>
            <span>
               {text} 
            </span>
            <Cursor cursorColor='#FF55FF'/>
        </h1>
        <div className='pt-5'>
            <Link href="#about"><button className='heroButton'>About</button></Link>
            <Link href="#experience"><button className='heroButton'>Experience</button></Link>
            <Link href="#skills"><button className='heroButton'>Skills</button></Link>
            <Link href="#projects"><button className='heroButton'>Projects</button></Link>
        </div>
        </div>
        
    </div>)
   
}