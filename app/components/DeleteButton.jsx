'use client';
import { deleteTask } from "@/app/lib/pocketbase";
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import { useRouter } from "next/navigation";

export default function DeleteButton(props){

    const router = useRouter();
    
    function handleDelete(id){
        deleteTask(id);
        router.push('/tasks');
    }

    return(
        <div>
            <button className="p-6 border-2 rounded-2xl flex gap-2 text-white bg-red-400 border-red-400 
            hover:bg-transparent hover:text-red-400 transition-all ease-out duration-200"
            onClick={() => {handleDelete(props.idToDelete)}}>
                <AiFillDelete className="text-2xl"></AiFillDelete>
                <p>Delete</p>
            </button>
        </div>
    );
}