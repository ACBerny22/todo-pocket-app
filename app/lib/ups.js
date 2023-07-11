'use server';

import PocketBase from 'pocketbase';
import pb from './pocketbase';
import { revalidatePath } from 'next/cache';



export async function getTaskBut(){

    const res = await pb.collection('tasks').getFullList({sort: '-created',});
    const data = res;
    return data;

  }

  export async function doIt(){
    const data = await getTaskBut();
    return data;
  }


export async function getTasks(){
    const res = await fetch('http://127.0.0.1:8090/api/collections/tasks/records?sort=-created,id', {cache: 'no-store'});
    const data = await res.json();
  
    return data?.items;
  }
