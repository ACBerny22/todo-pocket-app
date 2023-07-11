'use client';

import { useEffect } from "react";
import {nameOfTheBastard, isUserValid, signout} from "../lib/pocketbase";
import { useState } from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function NavBar(props){

    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    async function handleLogOut(){
        await router.push('/');
        signout();
        window.location.reload();

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
                    {!isUserValid ? 
                                  
                    <div className="p-3">
                        <label className="p-3">Log In</label>
                        <label className="p-3">Register</label>
                     </div>
                     
                    
                    : null}
                     <p className="p-3 font-light text-lg">Welcome: <span className="
                     font-bold">{ isUserValid ? nameOfTheBastard.username : null}</span></p>
                    <button onClick={handleLogOut}>
                        <p className='p-3 bg-red-500 text-white'>Log Out</p>
                    </button>
                </div>
               
            </div>
        </div>
    );
}