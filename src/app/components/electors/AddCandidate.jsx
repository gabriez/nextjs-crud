'use client'
import axios from "axios"
import { useState, useEffect} from "react"
import { useSurveyContext } from "@/app/context/SurveyProvider"
import { toast } from 'react-toastify';


const AddCandidate = () => {
  const {candidate, setCandidate, setUpdate} = useSurveyContext();
  const [dataCandidato, setDataCandidato] = useState({
    id: '',
    name: '',
    color: '#FFFFFF'
  })

  const updateCandidate = async (updateData) => {
    const {data} = await axios.put(`${process.env.BACKEND_API}candidates/${dataCandidato.id}`, updateData).then(response => response).catch(error => toast.error(error.message))
    setDataCandidato({
      id: '',
      name: '',
      color: '#FFFFFF'
    })
    setCandidate({
      id: '',
      name: '',
      color: ''
    })
  }

  const createCandidate = async (updateData) => {

    const {data} = await axios.post(`${process.env.BACKEND_API}candidates`, updateData).then(response => toast.success('Se agregó exitosamente el candidato')).catch(error => toast.error(error.message))
    setDataCandidato({
      id: '',
      name: '',
      color: '#FFFFFF'
    })

      setUpdate(prevState => !prevState)
  }

  useEffect(()=> {
    if (!Object.values(candidate).includes('')) {
      setDataCandidato({...candidate})
    } 
  }, [candidate])

  const handleSubmit = async e =>{
    e.preventDefault();
    const {id, ...updateData} = dataCandidato

    if (Object.values(updateData).includes('')){
      return toast.error('No puede dejar el nombre vacío')
    }
    if (!Object.values(candidate).includes('')) {
      return await updateCandidate(updateData)
    } 

     await createCandidate(updateData)
    
  }

  const handleValues = e => {
    const {value, name} = e.target;
    setDataCandidato(prevState => ({
      ...prevState, [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="flex xl:flex-wrap flex-col xl:flex-row text-white xl:gap-5">
        <legend className="w-full text-center text-xl font-semibold mb-2 lg:mb-0">
            Agrega un candidato
        </legend>

        <div className="flex flex-col flex-1">
            <label htmlFor="name" className="text-lg ml-1">Candidato</label>
            <input className="block mb-5 bg-gray-800 
            rounded-md p-2 py-3 outline-none w-full" 
            placeholder="Ejem: Nicolás Maduro"
            type="text" id="name" name="name" onChange={handleValues} value={dataCandidato.name} />
        </div>
        <div className="flex flex-col mb-3 flex-1">
            <label htmlFor="color" className="text-lg ml-1">Color para la gráfica</label>
            <input type="color" id="color" name="color"
            className="bg-transparent w-full h-12" onChange={handleValues} value={dataCandidato.color} />
        </div>

            <input type="submit" value="Agregar" className="py-3 m-auto xl:w-none w-full flex-1 text-sm uppercase font-semibold
            bg-gray-800 border-0 border-s border-gray-700 rounded hover:bg-gray-90
            text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"/>
        </fieldset>
    </form>
  )
}

export default AddCandidate
