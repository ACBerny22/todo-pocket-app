import PocketBase from "pocketbase"
import { useRouter, redirect } from "next/navigation";


const pb = new PocketBase('https://pocket-do.pockethost.io');
pb.autoCancellation(false);
export const isUserValid = pb.authStore.isValid;
export const nameOfTheBastard = pb.authStore.model;


export async function getTasks(){
    const res = await fetch(`https://pocket-do.pockethost.io/api/collections/tasks/records`);
    const data = await res.json();
  
    return data?.items;
  }

  export async function getTasksSDK(){
    const records = await pb.collection('tasks').getFullList();
    return records;
  }

  export async function getSingleTask(id){
    const res = await fetch(`https://pocket-do.pockethost.io/api/collections/tasks/records/${id}`, {cache: 'no-store'});
    const data = await res.json();
  
    return data;
  }

  export const createTaskSDK = async (title, details, priority) => {
    const user = pb.authStore.model.id;

    const data = {
      "title": title,
      "details": details,
      "priority": priority,
      "user": user
  };
  
  const record = await pb.collection('tasks').create(data);
  }

  export const createTask = async (title, details, priority) => {
    const user = pb.authStore.model.id;
    console.log(user);
    await fetch('http://127.0.0.1:8090/api/collections/tasks/records', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            details,
            priority,
            user
        })
    })
  };

  export async function deleteTask(id){
    await pb.collection('tasks').delete(id);
  }

  export async function editTask(id, title, details, priority, user){
    const data = {
      "title": title,
      "details": details,
      "priority": priority,
      "user": user
  };
  
  const record = await pb.collection('tasks').update(id, data);
  }

  export async function login(username, password){
    const res = await pb.collection("users").authWithPassword(username, password).catch(() => {
      alert("Failed to Authenticate, bad credentials!!")
    });

    window.location.reload();
  }

  export async function loginAPI(identity, password){
    console.log('shgote');
    await fetch('http://127.0.0.1:8090/api/collections/users/auth-with-password', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identity,
            password,
        })
    })
    console.log('shgote22222');
  }

  export function signout(){
    
    pb.authStore.clear();
    redirect('/');

  }

export default pb;