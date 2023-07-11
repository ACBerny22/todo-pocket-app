'use client';
import { deleteTask } from "@/app/lib/pocketbase";
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import { useRouter } from "next/navigation";

export default function DeleteButton(props){

    const router = useRouter();
    
    async function handleDelete(id){
        await deleteTask(id);
    }

    return(
        <div>
            <button className="p-6 border-2 rounded-2xl flex gap-2 text-white bg-red-400 border-red-400 
            hover:bg-transparent hover:text-red-400 transition-all ease-out duration-200"
            >
                <AiFillDelete className="text-2xl"></AiFillDelete>
                <p>Delete</p>
            </button>
        </div>
    );
}