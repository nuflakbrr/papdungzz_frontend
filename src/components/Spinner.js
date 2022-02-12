import React from 'react'
import { Puff } from 'react-loader-spinner'

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Puff
        color="#5F51E0"
        height={50}
        width={200}
        className="m-5"
      />
      <p className="text-lg text-center px-2 dark:text-white">{message}</p>
    </div>
  )
}

export default Spinner