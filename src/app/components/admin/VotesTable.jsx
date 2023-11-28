'use client'
import { useSurveyContext } from "@/app/context/SurveyProvider"
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader";

const VotesTable = () => {
    const {getModalInfo} = useSurveyContext();
    const [votes, setVotes] = useState([]);
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)
    const getVotes = async () => {
        setLoading(true)
        const {data} = await axios(`${process.env.BACKEND_API}votes?limit=${limit}&offset=${offset}`).then(response => response).catch(error => console.error(error))
        if (data.count < limit || limit < 10) setLimit(data.count) 
        setCount(data.count)
        setVotes(data.data)
        setLoading(false)
    }
    useEffect(()=> {
        getVotes()
    }, [limit])

    const handleForward = () => { 
        setOffset( prevState => {
            if (prevState + 10 > limit) {
                return prevState
            }
            return prevState + 10
        })
        setLimit( prevState => {
            if (prevState + 10 > count - prevState) {
                return count
            } else {
                return prevState + 10
            }
        })
        
    }

    const handleBackwards = () => {
        
        setLimit( prevState => {
            if (prevState % 10 != 0) {
                return count - (count - offset)
            }
            if (prevState - 10 <= 0) {
                return 10
            } else {
                return prevState - 10
            }
        })
        setOffset( prevState => 
            {
    
                if (prevState - 10 == 0) {
                    return 0
                }

                return prevState - 10
            }
            )
    }

  return (
    <>
        <div className="mt-10 bg-gray-600 rounded-md shadow-slate-500 shadow-md mx-auto w-[80%] md:w-4/5 px-7 py-4">
        <div className="lg:overflow-auto overflow-x-scroll">

        <table className="bg-gray-800 text-white">
            <thead>
                <tr className="text-lg">
                    <th className="border-gray-600 border px-4 py-3 min-w-[280px]">Mejor candidato</th>
                    <th className="border-gray-600 border px-4 py-3">Comentarios</th>
                    <th className="border-gray-600 border px-4 py-3 min-w-[280px]">Peor candidato</th>
                    <th className="border-gray-600 border px-4 py-3">Comentarios</th>
                </tr>
            </thead>
            <tbody className={!loading ?? "flex w-full items-center justify-center"}>
                {
                    votes.length > 0 && votes.map(vote => 
                        (
                        <tr className="cursor-pointer" onClick={() => {
                            getModalInfo(
                                {
                                    bestcandidate: vote.bestcandidate.name,
                                    bestCDescription: vote.bestCDescription,
                                    worstcandidate: vote.worstcandidate.name,
                                    worstCDescription: vote.worstCDescription
                                }
                            )
                        }}>
                            <td className="border-gray-600 border px-4 py-3 text-center">{vote.bestcandidate.name}</td>
                            <td className="border-gray-600 border px-4 py-3 overflow-hidden">
                                <p className='description'>
                                    {vote.bestCDescription}
                                </p>
                            </td>
                            <td className="border-gray-600 border px-4 py-3 text-center">{vote.worstcandidate.name}</td>
                            <td className="border-gray-600 border px-4 py-3 overflow-hidden">
                                <p className='description'>
                                    {vote.worstCDescription}
                                    
                                </p>
                            </td>
                        </tr>  
                        )
                    ) 
                }
            </tbody>           
        </table>
                {
                    votes.length === 0 && loading ? (
                        
                            <p className="text-center text-white"> No hay datos que mostrar</p>
                        
                    ) 
                    : !loading ??
                    (
                            <div className="mx-auto w-fit"> 

                                <Loader/>
                            </div>

                    
                    ) 
                }

        </div>
    </div>
    {/* Botones para la navegación*/}
    <div className="flex flex-col items-center mt-10" >

        <span className="text-sm text-gray-400">
            Mostrando <span className="font-semibold dark:text-white">{offset > 0 ? offset : 1}</span> a <span className="font-semibold dark:text-white">{limit}</span> de <span className="font-semibold dark:text-white">{count}</span> entradas
        </span>
        <div className="inline-flex mt-2 xs:mt-0">

            <button onClick={handleBackwards} disabled={limit - 10 <= 0} className={`flex items-center justify-center px-4 h-10 text-base font-medium rounded-s  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${limit >= count ?? 'dark:hover:bg-gray-700 dark:hover:text-white' } `}>
                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                </svg>
                Atrás
            </button>
            <button onClick={handleForward} disabled={limit >= count} className={`flex items-center justify-center px-4 h-10 text-base font-medium border-0 border-s  rounded-e  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${limit >= count ?? 'dark:hover:bg-gray-700 dark:hover:text-white' }  `}>
                Siguiente
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </button>
        </div>
      </div>
    </>
  )
}

export default VotesTable
