"use client"
import React, { useState } from "react"

type InputProps = {
   name: string
   placeholder: string
}

export default function Input({name, placeholder }: InputProps) {
  const [inpuxText, setInpuxText] = useState('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> ) => {
    const value = evt.target.value
    setInpuxText(value)
  }

  return (
    <>
      <div className="relative my-6">
        <input
          id="id-01"
          type="text"
          name={name}
          placeholder={placeholder}
          value={inpuxText}
          className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          onChange={handleChange}
        />
        <label
          htmlFor="id-01"
          className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
         {placeholder}
        </label>
        <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
           {/* <span>Text field with helper text</span>
            <span className="text-slate-500">1/10</span> */}
        </small>
      </div>
    </>
  )
}
