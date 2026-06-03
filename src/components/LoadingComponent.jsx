import React from 'react'

const LoadingComponent = ({message="Loading ..."}) => {
  return (
    <div className='absolute inset-0 bg-black/40 flex items-center justify-center z-50'>
        <div className='bg-white rounded-lg shadow-lg px-6 py-6 flex flex-col items-center gap-4'>
            <div className='w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin'>
            </div>
            <p className='text-gray-700 font-medium'>
                    {message}
            </p>
        </div>
    </div>
  )
}

export default LoadingComponent