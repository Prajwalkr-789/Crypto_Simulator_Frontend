'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { UserPlus2Icon } from 'lucide-react';
import axios from 'axios';
import { toastUtils } from '@/utils/toastUtils';
import { useRouter } from 'next/navigation';
import {useAuth} from '@/Contexts/AuthState'; 

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// type data = {
//     username: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
// }

const Page = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { login } = useAuth(); 
    
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;
        try{
        if (!username || !email || !password || !confirmPassword) {
            toastUtils.showInfo('Please fill all the fields.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toastUtils.showInfo('Please enter a valid email address.');
            return;
        }
    
        if (password !== confirmPassword) {
            toastUtils.showInfo('Passwords do not match.');
            return;
        }
        if(password.length < 6) {
            toastUtils.showInfo('Password must be at least 6 characters long.');
            return;
        }


        const data : FormData = {
            username,
            email,
            password,
            confirmPassword
        };

       const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup` , data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            validateStatus: (status) => {
                return status >= 200 && status < 500; 
            }

        })

        if(res.status === 201) {
            toastUtils.showMessage('Sign up successful');
            login(res.data.username); 
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            router.push('/');
        }
        else if(res.status === 400) {
            toastUtils.showError(res.data.error);
        }
        else if(res.status === 409) {
            toastUtils.showError(res.data.error);
            setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
        }
        else {
            toastUtils.showError('An error occurred. Please try again later.');
        }

        
    }catch (error) {
        console.error('Error:', error);
        toastUtils.showError('An error occurred. Please try again later.');
    }
}

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div style={{border:"0.1px solid oklch(0.442 0.017 285.786)"}} className="w-full max-w-sm p-8 space-y-6 bg-gradient-to-tr from-zinc-900 via-black to-zinc-950  rounded-lg shadow-lg">
                <div>
                <UserPlus2Icon className="w-8 h-8 mx-auto text-gray-200 rounded-full  " />
                <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
                    </div>
                <form className="space-y-4">

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            style={{border:"0.1px solid gray"}}
                            className="w-full px-4 py-2 mt-1 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder="Enter your username"
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}

                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            style={{border:"0.1px solid gray"}}
                            className="w-full px-4 py-2 mt-1 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder="Enter your Email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}

                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="off"
                            style={{border:"0.1px solid gray"}}
                            className="w-full px-4 py-2 mt-1 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder="Enter your password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-300">
                           Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            autoComplete='off'
                            style={{border:"0.1px solid gray"}}
                            className="w-full px-4 py-2 mt-1 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder="Confirm your password"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>
                    
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-gray-800 bg-zinc-200 rounded-md hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-center text-gray-400">
                    Already have an account?{' '}
                    <Link href='/signin' className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Page;