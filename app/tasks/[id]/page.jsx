
import { getSingleTask, deleteTask } from "@/app/lib/pocketbase";
import NoteSingle from "@/app/components/NoteSingle";
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import DeleteButton from "@/app/components/DeleteButton";
import { redirect } from 'next/navigation';


export default async function({params}){

    const note = await getSingleTask(params.id)

    function handleDelete(id){
        deleteTask(id);
        redirect('/tasks');
    }

    return(
        <div className="flex flex-col gap-10 p-10 justify-center">
            <NoteSingle key={note.id} title={note.title} details={note.details} id={note.id}
              priority={note.priority} created={note.created.slice(0,16)}/>
            <div className="flex gap-10 justify-center">
                <DeleteButton idToDelete={params.id}></DeleteButton>
                <button className="p-6 border-2 rounded-2xl flex gap-2 text-white bg-purple-500 border-purple-500 
                hover:bg-transparent hover:text-purple-500 transition-all ease-out duration-200">
                    <AiFillEdit className="text-2xl"></AiFillEdit>
                    <p>Edit</p>
                </button>
            </div>
        </div>

    );
}