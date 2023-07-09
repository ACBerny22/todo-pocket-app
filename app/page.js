import Image from 'next/image'
import PocketBase from 'pocketbase';
import NoteSingle from './components/NoteSingle'
import AddButton from './components/AddButton';


async function getTasks(){
  const res = await fetch('http://127.0.0.1:8090/api/collections/tasks/records?sort=-created,id', {cache: 'no-store'});
  const data = await res.json();

  return data?.items;
}

export default async function Home() {

  const tasks = await getTasks();

  console.log(tasks);

  return (
    <main className=' bg-zinc-100'>
      <div className='mx-10 pb-20'>
        <h1 className='text-5xl font-bold py-10'>To-do App</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {tasks?.map((note) => {
          return (
              <NoteSingle title={note.title} details={note.details} id={note.id}
              priority={note.priority} created={note.created.slice(0,16)}/>
          );    
        })}
        <AddButton></AddButton>
        </div>
      </div>
    </main>
  )
}
