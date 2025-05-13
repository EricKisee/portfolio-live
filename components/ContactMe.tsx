'use client'
import React from 'react'
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import { useForm, SubmitHandler } from "react-hook-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

type Props = {}

type Inputs = {
  firstname: string
  lastname: string
  email: string
  message: string
}

export default function ContactMe({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>()

  const [showAlert, setShowAlert] = React.useState(false)
  const [alertTitle, setAlertTitle] = React.useState("")
  const [alertMessage, setAlertMessage] = React.useState("")
  const [alertType, setAlertType] = React.useState<"success" | "error">("success")

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        setAlertTitle("Error")
        setAlertMessage(error.message || "Something went wrong.")
        setAlertType("error")
        setShowAlert(true)
        return
      }

      setAlertTitle("Success")
      setAlertMessage("Thanks! Your message has been sent.")
      setAlertType("success")
      setShowAlert(true)
      reset()

    } catch (err) {
      console.error("Submit error:", err)
      setAlertTitle("Error")
      setAlertMessage("There was an error submitting the form.")
      setAlertType("error")
      setShowAlert(true)
    }
  }

  // Auto-hide alert after 5 seconds
  React.useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showAlert])

  return (
    <div className='my-10 h-screen w-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
      <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>Contact</h3>

      <div className='flex flex-col space-y-10 h-21'>
        <h4 className='text-xl sm:text-xl md:text-2xl font-semibold text-center'>
          Share some feedback.{' '}
          <span className='decoration-[#F7AB0A]/50 underline'>Let&apos;s Talk.</span>
        </h4>

        <div className='space-y-10'>
          <div className='flex items-center space-x-5 justify-center'>
            <PhoneIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse' />
            <p className='text-xl'>(+254) 700 316 098</p>
          </div>
          <div className='flex items-center space-x-5 justify-center'>
            <EnvelopeIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse' />
            <p className='text-xl'>EricKiseeMulwa@gmail.com</p>
          </div>
          <div className='flex items-center space-x-5 justify-center'>
            <MapPinIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse' />
            <p className='text-xl'>Nairobi, Kenya</p>
          </div>
        </div>

        {/* Alert */}
        {showAlert && (
          <Alert className={`border-l-4 ${alertType === "success" ? "border-green-500" : "border-red-500"}`}>
            <Terminal className="h-4 w-4" />
            <AlertTitle>{alertTitle}</AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col sm:space-y-0 md:space-y-2 w-fit mx-auto'>
          <div className='flex flex-col md:space-x-2 sm:flex-row'>
            <input required {...register('firstname')} placeholder='FirstName' className='contactInput' type="text" />
            <input required {...register('lastname')} placeholder='LastName' className='contactInput' type="text" />
          </div>
          <input required {...register('email')} placeholder='Email' className='contactInput' type="email" />
          <textarea required {...register('message')} placeholder='Message' className='contactInput' />
          <button type='submit' className='bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold text-lg'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
