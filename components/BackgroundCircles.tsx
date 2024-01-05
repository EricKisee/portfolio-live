'use client'

import React from "react"
import{motion} from "framer-motion"

type Props = {}
function BackgroundCircles({}:Props) {
    return (
        <motion.div
        initial={{
            opacity:0
        }} 
        animate={{
            scale: [1,2,2,3,1],
            opacity: [0.1,0.2,0.4,0.8,0.1,1.0]
        }}
        transition={{
            duration:2.5
        }}
        className="relative flex justify-center items-center">
            <div className="rounded-full border border-[#333333] absolute h-[100px] w-[100px] mt-52 animate-ping"/>
            <div className="rounded-full border border-[#333333] absolute h-[200px] w-[200px] mt-52 animate-ping"/>
            <div className="rounded-full border border-[#333333] absolute h-[300px] w-[300px] mt-52 animate-ping"/>
            <div className="rounded-full border border-[#f7ab0a] absolute h-[500px] w-[500px] mt-52 animate-pulse"/>
            <div className="rounded-full border border-[#333333] absolute h-[600px] w-[600px] mt-52 animate-ping"/>
        </motion.div>
    )
}

export default BackgroundCircles