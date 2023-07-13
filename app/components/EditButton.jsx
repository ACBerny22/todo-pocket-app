'use client';

import {nameOfTheBastard, editTask } from "../lib/pocketbase";
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function EditButton(params){

    const userId = params.userId;
    const noteId = params.noteId;
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(params.title);
    const [details, setDetails] = useState(params.details);
    const [priority, setPriority] = useState(params.priority);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const options = ['Important', 'Not Important', 'Loose', 'Very Important'];

    const handleInputChange = (e) => {
        setPriority(e.target.value);
      };
    
      const handleOptionClick = (option) => {
        setPriority(option);
        setIsDropdownOpen(false);
      };
    
      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
  
    const openPopup = () => {
      setIsOpen(true);
    };
  
    const closePopup = () => {
      setIsOpen(false);
    };
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleDetailsChange = (e) => {
        setDetails(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form submission logic here
        console.log('Name:', title);
        console.log('Desc:', details);
        console.log('Importance:', priority);
        console.log('User:', userId)
        console.log('Note', noteId);

        
        await editTask(noteId, title, details, priority, userId);

        closePopup();
        router.refresh();
        window.location.reload();
    };

    return(
        <>
         <div>
            <button className="p-6 border-2 rounded-2xl flex gap-2 text-white bg-purple-500 border-purple-500 
                hover:bg-transparent hover:text-purple-500 transition-all ease-out duration-200" onClick={openPopup}>
                    <AiFillEdit className="text-2xl"></AiFillEdit>
                    <p>Edit</p>
            </button>
            {isOpen && (
                <div className="overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex flex-col
                items-center justify-center transition-opacity duration-300 z-50 overflow-auto">
                    <div className="bg-white p-10 flex flex-col gap-16 rounded-2xl">
                        <h2 className="font-bold text-xl">Edit the Task</h2>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5 text-lg'>
                            <label className="flex gap-2">
                                <input className="p-2"
                                type="text" value={title} onChange={handleTitleChange}  placeholder="Title" required/>
                            </label>
                            <label className="flex gap-2">
                                <input className="p-2"
                                type="text" value={details} onChange={handleDetailsChange} placeholder="Description" required/>
                            </label>
                            <input className="p-2"
                                required
                                type="text"
                                value={priority}
                                onChange={handleInputChange}
                                onClick={toggleDropdown}
                                placeholder="Select the importance..."
                            />
                            {isDropdownOpen && (
                                <div className="dropdown grid grid-cols-2">
                                    {options.map((option, index) => (
                                        <div className="p-2" key={index} onClick={() => handleOptionClick(option)}>
                                            <label className="border-2 p-2 rounded-2xl">{option}</label>
                                        </div>
                                ))}
                                </div>
                            )}
                            <button type="submit" className="p-4 bg-purple-500 text-white font-bold text-lg rounded-2xl border-2 border-purple-500
                            hover:bg-transparent hover:text-purple-500 hover:border-2 transition-all ease-out duration-200">Edit</button>
                        </form>
                        <button onClick={closePopup} className="p-4 bg-red-400 text-white font-bold text-lg rounded-2xl border-2 border-red-400
                        hover:bg-transparent hover:text-red-400 hover:border-2 transition-all ease-out duration-200">Close</button>
                    </div>
                </div>
            )}
        </div>

        </>
    );


}