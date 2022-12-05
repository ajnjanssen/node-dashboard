import React, { useRef, useState } from 'react'
import {
    facebookProvider,
    googleProvider,
    githubProvider,
} from '../../config/authMethods'
import socialMediaAuth from '../../service/auth'
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import { Button } from '@mui/material'
import { useAuth } from '../../service/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-hero-pattern bg-no-repeat bg-auto bg-opacity-25">
            <div class="flex justify-center ">
                <div class="mt-52 mb-44 backdrop-blur-md w-1/3 rounded-lg  shadow  bg-neutral bg-opacity-95 ">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tightmd:text-2xl text-primary">
                            Create a new account
                        </h1>
                        {error && <div className="text-red-500">{error}</div>}
                        <form
                            class="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                            action="#"
                        >
                            <div>
                                <label
                                    for="email"
                                    class="block mb-2 text-sm font-medium text-base-content"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    class="focus:outline-none bg-neutral-focus text-base-content sm:text-sm rounded-lg  block w-full p-2.5"
                                    placeholder="your@email.com"
                                    required
                                    ref={emailRef}
                                />
                            </div>
                            <div>
                                <label
                                    for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    class="focus:outline-none bg-neutral-focus text-base-content sm:text-sm rounded-lg  block w-full p-2.5"
                                    required
                                    ref={passwordRef}
                                />
                            </div>
                            <div>
                                <label
                                    for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password confirmation
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    class="focus:outline-none bg-neutral-focus text-base-content sm:text-sm rounded-lg  block w-full p-2.5"
                                    required
                                    ref={passwordConfirmRef}
                                />
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                class="w-full text-white bg-primary hover:bg-primary-focus focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign up
                            </button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link to="/login">
                                    <a
                                        // to="./login"
                                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Sign in
                                    </a>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            {/* <div class="flex justify-center ">
                <div class="mt-52 mb-44 backdrop-blur-md w-1/3 rounded-lg  shadow  bg-neutral bg-opacity-95 ">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tightmd:text-2xl text-primary">
                            Sign in to your account
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    for="email"
                                    class="block mb-2 text-sm font-medium text-base-content"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    class="focus:outline-none bg-neutral-focus text-base-content sm:text-sm rounded-lg  block w-full p-2.5"
                                    placeholder="your@email.com"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    class="focus:outline-none bg-neutral-focus text-base-content sm:text-sm rounded-lg  block w-full p-2.5"
                                    required=""
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            class="w-4 h-4  border border-neutral-focus rounded bg-neutral focus:ring-3 focus:ring-primary-focus "
                                            required=""
                                        />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label
                                            for="remember"
                                            class="text-base-content"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                class="w-full text-white bg-primary hover:bg-primary-focus focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{' '}
                                <a
                                    href="#"
                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </a>
                            </p>
                        </form>
                        <div className="flex space-between space-x-4 mt-10  justify-center">
                            <div className=" w-12 h-12 flex justify-center rounded-sm">
                                <Button
                                    disabled
                                    onClick={() =>
                                        handleOnClick(facebookProvider)
                                    }
                                >
                                    <FacebookIcon
                                        color="disabled"
                                        className="hover:text-primary"
                                    />
                                </Button>
                            </div>
                            <div className="w-12 h-12 flex justify-center rounded-sm">
                                <Button
                                    onClick={() =>
                                        handleOnClick(githubProvider)
                                    }
                                >
                                    <GitHubIcon
                                        color="primary"
                                        className="hover:text-primary"
                                    />
                                </Button>
                            </div>
                            <div className="group  w-12 h-12 flex justify-center rounded-sm">
                                <Button
                                    className="group-hover:text-primary"
                                    onClick={() =>
                                        handleOnClick(googleProvider)
                                    }
                                >
                                    <GoogleIcon
                                        color="primary"
                                        className="hover:text-primary"
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <img
                src="https://picsum.photos/1920/1080"
                alt=""
                className="fixed z-0"
            /> */}
        </div>
    )
}

export default Signup
