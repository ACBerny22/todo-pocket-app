// We can still put create client, thus, we can render client components inside server components.
import Link from "next/link";
import {AiFillExclamationCircle} from 'react-icons/ai'

function Importance(props){
    return(
        <div className="flex">
            {props.prior == 'Important' ? (
                <p className="p-2 rounded-xl bg-red-400 text-white font-medium flex gap-2">
                    <AiFillExclamationCircle className="text-lg mt-1"></AiFillExclamationCircle>
                    {props.prior}
                </p>
            ) : props.prior == 'Not Important' ? (
                <p className="p-2 rounded-xl bg-blue-400 text-white font-medium">{props.prior}</p>
            ) : props.prior == 'Loose'  ? (
                <p className="p-2 rounded-xl bg-green-600 text-white font-medium">{props.prior}</p>
            ) : (
                <p>Non Specified</p>
            )}
        </div>
    );
}

export default function NoteSingle(props){

    return (
        <Link href={`../tasks/${props.id}`}>
            <div className="p-10 shadow-xl flex flex-col gap-5 rounded-2xl hover:scale-105 transition-all ease-in duration-150 bg-white">
                <h1 className="text-2xl font-bold">{props.title}</h1>
                <p className="text-lg">{props.details}</p>
                <Importance prior={props.priority}></Importance>
                <p className="font-light">Created at: {props.created}</p>
            </div>
        </Link>
    );
}