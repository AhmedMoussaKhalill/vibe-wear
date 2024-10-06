import * as React from 'react';


export default function Login(){
  return(
    <div className='bg-white px-10 py-20 rounded-3xl  border-2 border-gray-100 items-center justify-center '>
      <h1 className='text-5xl font-semibold '>WELCOME BACK</h1>
      <p className='font-medium text-lg text-gray-500 mt-4'>please enter your details</p>
      <div className='mt-8'>
        <div>
          <label className='text-lg font-medium'>Email</label>
          <input type="text" className='w-full border-2 border-gray-100 rounded-xl p-2.5 mt-1 bg-transparent ' placeholder='Enter your email' />
        </div>
        <div>
          <label className='text-lg font-medium'>Password</label>
          <input type="password" className='w-full border-2 border-gray-100 rounded-xl p-2.5 mt-1 bg-transparent ' placeholder='Enter your password' />
        </div>
       
      <div className='mt-8 flex justify-between items-center '>
        <div>
          <input type="checkbox" id='remember'/>
          <label className='ml-2 font-medium text-base ' for="remember">Remember for 30 days</label>
        </div>
        <button className='font-medium text-base text-blue-800'>forget password</button>
      </div>
        <div className='mt-8 flex flex-col gap-y-4'>
          <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out  py-3 rounded-xl bg-blue-800 text-white text-lg font-bold' >sign in</button>
         
          <button className=" flex rounded-xl py-3 border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out ">
          <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 488 512"><path fill="currentColor"
           d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          
            sign in with Google
            </button>
        </div>
        <div className='mt-8 flex justify-center items-center'>
          <p className='font-medium text-base'>Don't have any account?</p>
          <button className='text-blue-800 text-base font-medium ml-2 '>Sign up</button>
        </div>
      </div>
    </div>
  )
}
