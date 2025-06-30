'use client'
import { useRef, useState } from "react";
import React from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/typings'
import { urlFor } from '@/sanity'
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from 'next/link'

type Props = {
    projects: Project[]
}

export default function Projects({ projects }: Props) {
    const scrollRef = useRef(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToItem = (index: number) => {

        console.log('scrollToItem - ', index)

        if (itemsRef.current[index]) {
            itemsRef.current[index]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
            setActiveIndex(index);
        }
    };

    return (
        <div className="h-screen items-center relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto z-0">
            <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">Projects</h3>

            {/* Scrollable Container */}
            <div ref={scrollRef} className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#F7AB0A]">
                {projects.map((project, i) => (
                    <div
                        ref={(el) => {
                            itemsRef.current[i] = el;
                        }}
                        key={project._id}
                        className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen"
                        >


                        <motion.img
                            initial={{ y: -300, opacity: 0 }}
                            transition={{ duration: 1.2 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="object-cover xl:w-[800px] xl:h-[600px]"
                            src={urlFor(project.image).url()} alt=""
                        />
                        <div className="space-y-10 px-0 md:px-10 max-w-6xl">
                            <h4 className="text-4xl font-semibold text-center">
                                <span className="underline decoration-[#f7ab0a]/50">Case study {i + 1} out of {projects.length}:</span>{' '} {project.title}
                            </h4>
                            <div className="flex items-center space-x-2 justify-center">
                                {project?.technologies.map((technology, i) => (
                                    <img className="h-10 w-10" key={technology._id} src={urlFor(technology.image).url()} alt="" />
                                ))}
                            </div>
                            <p className="text-sm text-center md:text-left line-clamp-6">{project.summary}</p>
                            <div className="text-cennter">
                                 <Link href={project.linkToBuild}><button className='heroButton'>Visit</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons - Move Outside Scrollable Container */}
            <button
                onClick={() => scrollToItem(Math.max(activeIndex - 1, 0))}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md z-50"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={() => scrollToItem(Math.min(activeIndex + 1, projects.length - 1))}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md z-50"
            >
                <ChevronRight size={32} />
            </button>

            <div className="w-full absolute top-[30%] bg-[#f7ab0a]/10 h-[500px] -skew-y-12" />
        </div>
    );
}
