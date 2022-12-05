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

function ForgotPassword() {
    const emailRef = useRef()

    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to Reset Password')
        }
        setLoading(false)
    }

    const handleOnClick = async (provider) => {
        const res = await socialMediaAuth(provider)
        navigate('/')
        console.log(res)
    }

    return (
        <div className="min-h-screen bg-hero-pattern bg-no-repeat bg-auto bg-opacity-25">
            <div class="flex justify-center ">
                <div class="mt-52 mb-44 backdrop-blur-md w-1/3 rounded-lg  shadow  bg-neutral bg-opacity-95 ">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tightmd:text-2xl text-primary">
                            Password reset
                        </h1>
                        {error && (
                            <div className="alert alert-error shadow-lg">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current flex-shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            </div>
                        )}
                        {message && (
                            <div className="alert alert-success shadow-lg">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current flex-shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{message}</span>
                                </div>
                            </div>
                        )}
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

                            <button
                                disabled={loading}
                                type="submit"
                                class="w-full text-white bg-primary hover:bg-primary-focus focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Reset Password
                            </button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                I do know my password.{' '}
                                <Link to="/login">
                                    <a class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Login here
                                    </a>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
