import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return(
    <div className='bg-white px-10 py-20 rounded-3xl  border-2 border-gray-200 items-center justify-center '>
      <form action="">
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
      </div>
        <div className='mt-8 flex flex-col gap-y-4'>
          <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out  py-3 rounded-xl bg-blue-800 text-white text-lg font-bold' >sign in</button>
         
        </div>
        <div className='mt-8 flex justify-center items-center'>
          <p className='font-medium text-base'>Don't have any account? </p>
          <Link to="/signup" className='text-blue-800 text-base font-medium ml-2'>Sign up</Link>
        </div>
      </div>
      </form>
    </div>
  );
}
