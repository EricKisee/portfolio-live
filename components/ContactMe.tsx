'use client'
import React from 'react'
import {PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import { useForm, SubmitHandler } from "react-hook-form"

type Props = {}

type Inputs = {
    name:string
    email:string
    subject:string
    message:string
}

export default function ContactMe({}: Props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        window.location.href = `mailto:erickiseemulwa@gmail.com?subject=${data.subject}}&body=Good day, my name is ${data.name}. ${data.message} (${data.email}) `
    }

  return (
    <div className=' my-10 h-screen w-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
        <h3 className=' absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl '> Contact</h3>

        <div className='flex flex-col space-y-10 h-21'>
            <h4 className=' text-xl sm:text-xl md:text-2xl font-semibold text-center'>Share some feedback. {' '} <span className=' decoration-[#F7AB0A]/50 underline'>Lets Talk.</span></h4> 
            <div className='space-y-10'>
                <div className=' flex items-center space-x-5 justify-center'>
                    <PhoneIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse'/>
                    <p className='text-xl'>{"(+254) 700 316 098"} </p>
                </div>
                <div className=' flex items-center space-x-5 justify-center'>
                    <EnvelopeIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse'/>
                    <p className='text-xl'> EricKiseeMulwa@gmail.com </p>
                </div>
                <div className=' flex items-center space-x-5 justify-center'>
                    <MapPinIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse'/>
                    <p className='text-xl'> Nairobi, Kenya </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col sm:space-y-0 md:space-y-2 w-fit mx-auto'>
                <div className='flex flex-col  md:space-x-2 sm:flex-row' >
                    <input required {...register('name')} placeholder='Name' className='contactInput' type="text" />
                    <input required {...register('email')} placeholder='Email' className='contactInput' type="email" />
                </div>
                <input required {...register('subject')} placeholder='Subject' className='contactInput' type="text" />
                <textarea required {...register('message')} placeholder='Message' className='contactInput' />
                <button type='submit' className=' bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold text-lg  '>Submit</button>
            </form>

        </div>
    </div>
  )
} 