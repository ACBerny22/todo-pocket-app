'use client';

import Image from 'next/image'
import pb from './lib/pocketbase';
import { useRouter } from "next/navigation";
import { login, isUserValid, signout, nameOfTheBastard, loginAPI } from './lib/pocketbase';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLoggedState, useLoggedModel } from './states/LoggedState';
import LoginForm from './components/LoginForm';


export default function Home() {

  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    console.log(nameOfTheBastard);
  }, [])
 

  const handleLogOut = () => {
    signout(identity, password);
  }

  function BaseRender(){
    if(isUserValid){
      return(
      <div>
        <div className='flex flex-col justify-center items-center gap-12 my-20 text-center mx-10'>
        <h1 className='text-6xl font-bold'>Welcome back!!</h1>
         <Link href={'./tasks'}>
           <p className='p-3 bg-blue-500 text-white'>Go to the tasks</p>
         </Link>
       </div>
     </div>
     );
    }
    else{
      return(
        <LoginForm/>
      );
    }
  }

  if (!mounted) return <></>;
  return (
    <div>
      <BaseRender></BaseRender> 
    </div>
  )
}
