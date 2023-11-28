'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useSurveyContext } from "@/app/context/SurveyProvider";
import Loading from '../Loading'
import {randomId} from '../../lib/helpers.js'


const ElectorsTable = () => {
  const {editCandidate, candidate: candidateChange, update} = useSurveyContext();

  const [candidates, setCandidates] = useState([]);
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    

    const deleteCandidate = async (id) => {
      setLoading(true)
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API}candidates/${id}`).then(response => response).catch(error => console.error(error))
      
      setLimit(prevState => prevState - 1)
    }
    useEffect(()=> {
      const getCandidates = async () => {
        setLoading(true)
        const {data} = await axios(`${process.env.NEXT_PUBLIC_BACKEND_API}candidates?limit=${limit}&offset=${offset}`).then(response => response).catch(error => console.error(error))
        if (data.count < limit || limit < 10) setLimit(data.count) 
        setCount(data.count)
        setCandidates([...data.data])
        setLoading(false)
    }
      getCandidates()
      
    }, [limit, candidateChange, update, offset])

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
      <div className="mt-10 bg-gray-600 rounded-md shadow-slate-500 shadow-md mx-auto w-[80%] md:w-3/5 px-7 py-4 ">
        <div className="lg:overflow-auto overflow-x-scroll">
        <table className="bg-gray-800 text-white mx-auto">
          <thead>
            <tr>
              <th className="border-gray-600 border px-4 py-3">
                Candidato
              </th>
              <th className="border-gray-600 border px-4 py-3">
                Color que lo representa
              </th>
              <th className="border-gray-600 border px-4 py-3">
                Editar
              </th>
              <th className="border-gray-600 border px-4 py-3">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {
              candidates.length > 0 && candidates.map(candidate => (
              <tr key={randomId()}>
              <td className="border-gray-600 border px-4 py-3">
                {candidate.name}
              </td>
              <td className="border-gray-600 border px-4 py-3">
                <span className={`block rounded-full mx-auto w-5 h-5 `} style={{backgroundColor: `${candidate.color}`, opacity: 1}}></span>
              </td>
              <td className="border-gray-600 border px-4 py-3">
                <button type="button" className="mx-auto block" onClick={() => {
                  editCandidate(candidate)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
              </td>
              <td className="border-gray-600 border px-4 py-3">
                <button type="button" className="mx-auto block" onClick={() => {
                  deleteCandidate(candidate.id)
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </td>
            </tr>
              ))
            }
            
          </tbody>
        </table>
        {
                    candidates.length === 0 && loading ? (
                        
                            <p className="text-center text-white"> No hay datos que mostrar</p>
                        
                    ) 
                    : !loading ??
                    (
                            <div className="mx-auto w-fit"> 

                                <Loading/>
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

                <button onClick={handleBackwards} disabled={limit - 10 <= 0} className={`flex items-center justify-center px-4 h-10 text-base font-medium rounded-s  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${offset > 0 ? 'dark:hover:bg-gray-700 dark:hover:text-white' : '' } `}>
                    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    Atrás
                </button>
                <button onClick={handleForward} disabled={limit >= count} className={`flex items-center justify-center px-4 h-10 text-base font-medium border-0 border-s  rounded-e  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${limit < count ? 'dark:hover:bg-gray-700 dark:hover:text-white' : ''}  `}>
                    Siguiente
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
      </div>
    </>
  )
}

export default ElectorsTable
