import React from 'react'
import { useAuth } from '../../service/AuthContext'

function Index() {
    const { currentUser } = useAuth()
    return (
        <div class="mx-auto mt-24 px-4">
            <div class="relative mx-auto flex w-1/2 min-w-0 break-words bg-base-300  mb-6 shadow-xl rounded-lg ">
                <div class="px-6 ">
                    <div class="flex flex-wrap justify-center pb-16">
                        <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                            <img
                                alt="..."
                                src={currentUser.photoURL}
                                class="shadow-xl rounded-full h-auto align-middle border-none absolute w-36 -mt-12 -m-16 -ml-20 lg:-ml-16 "
                            />
                        </div>
                    </div>
                    <div class="text-center mt-12">
                        <h3 class="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                            {currentUser.displayName}
                        </h3>
                        <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                            Groningen, Groningen
                        </div>
                        <div class="mb-2 text-blueGray-600 mt-10">
                            <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                            Junior Frontend & UX/UI Designer
                        </div>
                        <div class="mb-2 text-blueGray-600">
                            <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                            Hanze University of Applied Sciences
                        </div>
                        <div class="mb-2 text-blueGray-600">
                            <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                            {currentUser.email}
                        </div>
                    </div>
                    <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div class="flex flex-wrap justify-center">
                            <div class="w-full lg:w-9/12 px-4">
                                <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                                    4th year student Communication & Multimedia
                                    Design with a passion for user interface,
                                    animation and creating interesting user
                                    experiences. Problem solver and independent
                                    person with great attention to detail.
                                </p>
                                <a
                                    href="#pablo"
                                    class="font-normal text-primary hover:text-primary-focus"
                                >
                                    Show more
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
