import * as React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 items-center justify-center'>
      <form action="">
      <h1 className='text-5xl font-semibold'>Create Account</h1>
      <p className='font-medium text-lg text-gray-500 mt-4'>Please enter your details to sign up</p>
      <div className='mt-8'>
        <div>
          <label className='text-lg font-medium'>Username</label>
          <input
            type="text"
            className='w-full border-2 border-gray-100 rounded-xl p-2.5 mt-1 bg-transparent'
            placeholder='Enter your username'
          />
        </div>
        
        <div>
          <label className='text-lg font-medium'>Phone</label>
          <input
            type="text"
            className='w-full border-2 border-gray-100 rounded-xl p-2.5 mt-1 bg-transparent'
            placeholder='Enter your phone'
          />
        </div>
        <div>
          <label className='text-lg font-medium'>Email</label>
          <input
            type="text"
            className='w-full border-2 border-gray-100 rounded-xl p-2.5 mt-1 bg-transparent'
            placeholder='Enter your email'
          />
        </div>
        <div className='mt-4'>
          <label className='text-lg font-medium'>Password</label>
          <input
            type="password"
            className='w-full border-2 border-gray-100 rounded-xl p-2.5 mt-1 bg-transparent'
            placeholder='Enter your password'
          />
        </div>

        <div className='mt-8 flex flex-col gap-y-4'>
          <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-blue-800 text-white text-lg font-bold'>
            Sign Up
          </button>
        </div>

        <div className='mt-8 flex justify-center items-center'>
          <p className='font-medium text-base'>Already have an account?</p>
          <Link to="/login" className='text-blue-800 text-base font-medium ml-2'>Sign in</Link>
        </div>
      </div>
      </form>
    </div>
  );
}
