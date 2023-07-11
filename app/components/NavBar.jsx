'use client';

import { useEffect } from "react";
import {nameOfTheBastard, isUserValid, signout} from "../lib/pocketbase";
import { useState } from "react";
import {useRouter, redirect} from "next/navigation";
import Link from "next/link";
import {RxHamburgerMenu} from 'react-icons/rx'

export default function NavBar(props){

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        };
    

        // Add event listener for resize
        window.addEventListener('resize', handleResize);
    
        // Initial check on component mount
        handleResize();
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    async function handleLogOut(){
        signout();
        router.push('/');
    }

    useEffect(() => {
        setMounted(true);
      }, []);

    if (!mounted) return <></>;
    return(
        <div className="p-10 shadow-lg text-center">
            <div className="mx-8 flex justify-between ">
                <Link href={'/'} className='p-3'>
                    <p className="font-light text-3xl">Simple To-Do App</p>
                </Link>
                <div className="flex gap-10">
                    {isUserValid ? 
                    <div className="">
                        {isMobile ? 
                        <div className="flex gap-5">
                            <RxHamburgerMenu className="text-3xl mt-4"></RxHamburgerMenu>
                        </div>
                        :
                        <div className="flex gap-5">
                            <div className="">
                                <p className="p-3 font-light text-lg">Welcome: <span className="
                                font-bold">{ isUserValid ? nameOfTheBastard.username : null}</span></p>
                            </div>
                            <div>
                                <button onClick={handleLogOut}>
                                    <p className='p-3 bg-red-500 text-white rounded-lg'>Log Out</p>
                                </button> 
                            </div>
                        </div>
                        }
                        
                    </div>
                    : 
                    null}
                    
                </div>
               
            </div>
        </div>
    );
}