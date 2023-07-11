'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask, createTaskSDK } from "../lib/pocketbase";

export default function AddButton(){

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');

    const [priority, setPriority] = useState('');
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
      setTitle('');
      setDetails('');
      setPriority('');
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

        
        await createTaskSDK(title, details, priority);

        closePopup();
        router.refresh();
        //window.location.reload();
    };
    

    return (
        <div>
            <div className="p-10 shadow-xl flex gap-5 rounded-2xl hover:scale-105 transition-all bg-white
            justify-center items-center ease-in duration-150" onClick={openPopup}>
                <h1 className="text-6xl font-bold">+</h1>
            </div>
            {isOpen && (
                <div className="overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex flex-col
                items-center justify-center transition-opacity duration-300 z-50 overflow-auto">
                    <div className="bg-white p-10 flex flex-col gap-16 rounded-2xl">
                        <h2 className="font-bold text-xl">Create a New Task</h2>
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
                            <button type="submit" className="p-4 bg-blue-400 text-white font-bold text-lg rounded-2xl border-2 border-blue-400
                            hover:bg-transparent hover:text-blue-400 hover:border-2 transition-all ease-out duration-200">Submit</button>
                        </form>
                        <button onClick={closePopup} className="p-4 bg-red-400 text-white font-bold text-lg rounded-2xl border-2 border-red-400
                        hover:bg-transparent hover:text-red-400 hover:border-2 transition-all ease-out duration-200">Close</button>
                    </div>
                </div>
            )}
        </div>
        
    );
}