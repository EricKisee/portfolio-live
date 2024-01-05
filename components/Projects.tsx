'use client'
import React from 'react'
import logisticsPic from '../public/logistics.jpeg'
import {motion} from 'framer-motion'

type Props = {}

export default function Projects({}: Props) {
const projects = [1,2,3,4,5]

  return (
    <div>
    <motion.div className='h-screen items-center relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto  z-0 '>
        <h3 className=" absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl ">Projects</h3>


        <div className='relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]'>
            {projects.map((project , i) =>(
                <div className='w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen'>
                    <motion.img
                    initial={{
                        y:-300,
                        opacity:0,
                    }}
                    transition={{ duration:1.2}}
                    whileInView={{ opacity:1, y:0}}
                    viewport={{once:true}}
                    src={logisticsPic.src} alt='' />
                    <div className=' space-y-10 px-0 md:px-10 max-w-6xl '>
                        <h4 className='text-4xl font-semibold text-center'>
                            <span className=' underline decoration-[#f7ab0a]/50' >Case study {i+1} out of {projects.length}:</span>{' '} Logistics System</h4>

                            <p className=' text-lg text-center md:text-left '>
                            Freight transportation is one of the most important industries to the health of the US economy. It not only provides a vital lifeline of essential products across the country, but it also gives us a valuable insight into consumer behavior and market fluctuations. When freight providers use tech tools to make their operations more efficient, there’s an opportunity to keep this indispensable economic resource serving the nation effectively.


                            </p>
                    </div>
                </div>
            ))

            }
        </div>

        <div className='w-full absolute top-[30%] bg-[#f7ab0a]/10 h-[500px] -skew-y-12'/>
    </motion.div>
    </div>
  )
}