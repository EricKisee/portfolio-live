// components/NewsletterForm.tsx
"use client";
import { useState } from "react";
import Head from "next/head"

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setMessage(data.message);
  }

  return (
<div className=' my-10 h-screen w-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
    <Head><title>Eric Kisee - Newsletter</title></Head>
      <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>Newsletter</h3>

      <div className='flex flex-col space-y-10 h-21'>
        <h4 className='text-xl sm:text-xl md:text-2xl font-semibold text-center'>
          Subscribe to my newsletter.{' '}
          <span className='decoration-[#F7AB0A]/50 underline'>Unsubscibe at any time.</span>
        </h4>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-yellow-500 px-4 py-2 rounded text-white">
        Subscribe
      </button>
      {message && <p className="text-sm">{message}</p>}
    </form>
</div>
    </div>
  );
}

export default  NewsletterForm;