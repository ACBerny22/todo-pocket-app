'use client';

import NoteSingle from '../components/NoteSingle'
import AddButton from '../components/AddButton';
import {getTasksSDK} from '../lib/pocketbase';
import { useEffect, useState } from 'react';


export default function Home() {

  const [domLoaded, setDomLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setDomLoaded(true);
  }, []);


  useEffect(() => {
   async function callback(){
     setIsLoading(true);
     const data = await getTasksSDK();
     setTasks(data);
     setIsLoading(false);
    }
    callback();
  }, [])

  if(isLoading){
    return(
      <div className='text-5xl font-bold flex justify-center my-20 gap-10'>
         <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-500"></div>
         <h1>Loading...</h1>
      </div>
     );
   }


  return (
    
    <main className=' '>
      {domLoaded && (
      <div className='mx-16 pb-20'>
        <h1 className='text-4xl font-bold py-10'>Tasks</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {tasks?.map((note) => {
          return (
              <NoteSingle key={note.id} title={note.title} details={note.details} id={note.id}
              priority={note.priority} created={note.created.slice(0,16)}/>
          );    
        })}
        <AddButton></AddButton>
        </div>
      </div>
      )}
    </main>
  )
}
