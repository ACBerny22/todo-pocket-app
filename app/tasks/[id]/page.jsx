'use client'

import { getSingleTask, deleteTask, editTask } from "@/app/lib/pocketbase";
import NoteSingle from "@/app/components/NoteSingle";
import {IoIosArrowRoundBack} from 'react-icons/io'
import DeleteButton from "@/app/components/DeleteButton";
import EditButton from "@/app/components/EditButton";
import { redirect } from 'next/navigation';
import Link from "next/link";


export default async function({params}){

    const note = await getSingleTask(params.id)
    

    return(
        <div className="flex flex-col gap-10 p-10 justify-center">
            <Link href={'/tasks'}>
                <IoIosArrowRoundBack
                    className="text-6xl text-slate-600 hover:-translate-x-3 transition-all ease-out duration-300"
                />
            </Link>
            <NoteSingle key={note.id} title={note.title} details={note.details} id={note.id}
              priority={note.priority} created={note.created.slice(0,16)}/>
            <div className="flex gap-10 justify-center">
                <DeleteButton idToDelete={params.id}></DeleteButton>
                <EditButton userId={note.user} noteId={params.id} title={note.title} details={note.details} priority={note.priority}></EditButton>
            </div>
        </div>

    );
}