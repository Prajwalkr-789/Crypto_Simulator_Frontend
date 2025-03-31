'use client';
import React from 'react';



const page = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div style={{border:"0.1px solid oklch(0.442 0.017 285.786)"}} className="w-full max-w-sm p-8 space-y-9  rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>
                <form className="space-y-8">
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
                            style={{border:"0.1px solid gray"}}
                            className="w-full px-4 py-2 mt-1 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-zinc-800 rounded-md hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-sm text-center text-gray-400">
                    Don&apos;t have an account?{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default page;