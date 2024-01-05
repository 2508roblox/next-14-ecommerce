"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import Link from "next/link";
import { signIn } from "next-auth/react";

const SignInForm = () => {
        const formSchema = z.object({
            email: z.string().email("Email isn't valid"),
            password: z.string().min(6),
        });
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: zodResolver(formSchema),  
        defaultValues: {
          email:"",
          password: "",
        },
      });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
   
        try {
            signIn('credentials', {
            email:  values.email,
              password: values.password,
                redirect:true,
                callbackUrl:'/'
            })
           
            reset();
        } catch (error) {
            console.log('error while logging in')
            reset();
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
          <div className='p-10 rounded-lg shadow-lg flex flex-col'>
            <h1 className='text-xl font-medium mb-4'>Sign In</h1>
           
            <input 
            type="text"
            className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
            id='email'
         
            placeholder='email'
            {...register('email')}
             />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

            <label htmlFor="" className='mb-2'>Password</label>
            <input 
            type="password"
            className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
            id='password'
         
            placeholder='password'
            {...register('password')}
             />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

            <button onClick={handleSubmit(onSubmit)} className='p-2 border bg-purple-600 text-white border-gray-300 mt-2 mb-4 focus:outline-none focus:border-gray-600'>
              Login
            </button>
            <Link href='/signin' className='text-sm text-center mt-5 text-neutral-600'>Already have an Account?</Link>
            <Link href='/' className='text-center mt-2'>Home</Link>
          </div>
        </div>
      );
    
}

export default SignInForm