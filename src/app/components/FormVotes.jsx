'use client'
import { useEffect, useState } from "react";
import { createVote } from "../lib/formAction"
import { useFormStatus, useFormState} from 'react-dom';
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
/* Componente encargado de mostrar los votos en una tabla*/

const initialState = {
    type: null,
    error: [],
    message: null
}

// Array que contiene las redes sociales
const mediaOptions = [
    'Facebook', 
    'Instagram',
    'Noticias', 
    'Twitter / X', 
    'Otros'
]

const FormVotes = ({}) => {
    const [state, formAction] = useFormState(createVote, initialState);
    const [listCandidates, setListCandidates] = useState([])
    const router = useRouter()

    const showErrors = (fieldName) => {
        return state.error?.length > 0 && state.error.some(field => fieldName === field.path[0])
    }
    const showMessage = (fieldName) => {
        let index = state.error.findIndex(field => fieldName === field.path[0])
        return state.error[index].message
    } 

    const getCandidates = async () => {
        const data = await axios(`${process.env.BACKEND_API}candidates`).then(response => response.data.data).
        catch(error => console.error(error))
        setListCandidates([...data]);
    }

    useEffect(() => {
       getCandidates();
    },[])
    
    useEffect(() => {
        if (state.type === 200) {
            toast.success('Se guardó su voto con éxito')
            router.push('/admin')
        }
        if (state.type === 400) {
            toast.error(state.message)
        }
     },[state, router])

  return (
    <form action={formAction}>
        <div className="mb-5">
            <label className="block mb-2 text-xl font-medium" htmlFor="bestCandidate">
                ¿Por qué candidato votarías? <span className="text-red-500 text-sm">*</span>
            </label>
            <select className="block  bg-gray-800 rounded px-3 py-4" name="bestCandidate" id='bestCandidate'>
                 <option value=''>
                </option>

                {listCandidates?.length > 0 && listCandidates.map(candidato => (
                    <option key={candidato.id} value={candidato.id}>
                    {candidato.name}
                </option>
                ))}

            </select>
            {showErrors('bestCandidate') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm"> {showMessage('bestCandidate')}  </p>)}
        </div>
        <div className="mb-5">
            <label className="block mb-2 text-xl font-medium" htmlFor="bestCDescription">
                ¿Por qué votarías por el candidato que seleccionaste? <span className="text-red-500 text-sm">*</span>
            </label>
            <textarea className="block resize-none w-full h-28 bg-gray-800 
            rounded-md p-2 outline-none" name="bestCDescription" id="bestCDescription"></textarea>
            {showErrors('bestCDescription') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm"> {showMessage('bestCDescription')} </p>)}

        </div>
        <div className="mb-5">
            <label className="block mb-2 text-xl font-medium" htmlFor="worstCandidate">
                ¿Cuál es el peor candidato por el cual votar? <span className="text-red-500 text-sm">*</span>
            </label>
            <select className="block bg-gray-800 rounded px-3 py-4" name="worstCandidate" id="worstCandidate">
            <option value=''>
                </option>
                { listCandidates?.length > 0 && listCandidates.map(candidato => (
                    <option key={candidato.id} value={candidato.id}>
                    {candidato.name}
                </option>
                ))}
            </select>
            {showErrors('worstCandidate') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm">{showMessage('worstCandidate')} </p>)}

        </div>
        <div className="mb-5">
            <label className="block mb-2 text-xl font-medium" htmlFor="worstCDescription">
                ¿Por qué es la peor elección votar por el candidato seleccionado? <span className="text-red-500 text-sm">*</span>
            </label>
            <textarea className="block resize-none w-full h-28 bg-gray-800 
            rounded-md p-2 outline-none" name="worstCDescription" id="worstCDescription"></textarea>
            {showErrors('worstCDescription') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm">{showMessage('worstCDescription')} </p>)}

        </div>
        <div className="mb-5">
            <label className="block mb-2 text-xl font-medium" htmlFor="email">
                Correo <span className="text-red-500 text-sm">*</span>
            </label>
            <input className="block bg-gray-800 
            rounded-md px-3 py-4 outline-none w-full sm:w-80 " 
            placeholder="Ejemp: javier@gmail.com"
            type="email" name="email" id="email" />
            {showErrors('email') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm">{showMessage('email')} </p>)}

        </div>
        <div className="mb-8">
            <label className="block mb-2 text-xl font-medium" htmlFor="media">
                ¿Cómo obtuviste esta encuesta? 
            </label>
            <select className="block bg-gray-800 rounded px-3 py-4 " name="media" id="media" defaultValue=''>
                <option value=''>
                </option>
                {mediaOptions.map(media => (
                    <option key={media} value={media}>{media}</option>
                ))}
            </select>
        </div>
        <input type="submit" value="Enviar" className="w-full sm:w-2/4 py-3 m-auto uppercase font-semibold
        flex items-center justify-center px-4 bg-gray-800 border-0 border-s border-gray-700 rounded-e 
        hover:bg-gray-90 text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer" />
    </form>
  )
}

export default FormVotes



 