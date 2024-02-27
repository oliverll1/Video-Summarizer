
import React from "react"

type ButtonTypes = {
  text: string
}

export default function Button({text}: ButtonTypes) {
  return (
    <>
      <button className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
          <span>{text}</span>
      </button>
    </>
  )
}