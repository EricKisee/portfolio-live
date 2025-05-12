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

    // const onSubmit: SubmitHandler<Inputs> = (data) => {
    //     window.location.href = `mailto:erickiseemulwa@gmail.com?subject=${data.subject}}&body=Good day, my name is ${data.name}. ${data.message} (${data.email}) `
    // }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
      
          if (!res.ok) {
            const error = await res.json();
            alert(error.message || 'Something went wrong.');
            return;
          }
      
          alert('Thanks! Your message has been sent.');
        } catch (err) {
          console.error('Submit error:', err);
          alert('There was an error submitting the form.');
        }
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
                    <input required {...register('firstname')} placeholder='FirstName' className='contactInput' type="text" />
                    <input required {...register('lastname')} placeholder='LastName' className='contactInput' type="text" />
                </div>
                <input required {...register('email')} placeholder='Email' className='contactInput' type="email" />
                <textarea required {...register('message')} placeholder='Message' className='contactInput' />
                <button type='submit' className=' bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold text-lg  '>Submit</button>
            </form>

        </div>
    </div>
  )
} 