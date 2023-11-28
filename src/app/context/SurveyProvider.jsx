'use client';
import { useState, useContext, createContext } from "react";
const SurveyContext = createContext()

export const useSurveyContext = () => {
    return useContext(SurveyContext);
}

const SurveyProvider = ({children}) => {
    const [modal, setModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        bestCandidate: '', 
        bestCDescription: '',
        worstCandidate: '',
        worstCDescription: ''
    })
    const [isOpen, setOpen] = useState(false)
    const [candidate, setCandidate] = useState(
        {
            id: '',
            name: '',
            color: ''
        }
    )
    const [update, setUpdate] = useState(false)

    const handleModal = () => {
        setModal(!modal)
    }

    const getModalInfo = (data) => {
        setModalInfo({});

        handleModal();
        setModalInfo({...data});
    }

    const editCandidate = (data) => {
        setCandidate(
            {
                ...data
            }
        )
    }


  return (
    <SurveyContext.Provider
        value={{
            modalInfo, 
            modal,
            getModalInfo,
            handleModal, isOpen, setOpen,
            candidate, setCandidate,
            editCandidate, update, setUpdate
        }}
    >
      {children}
    </SurveyContext.Provider>
  )
}

export default SurveyProvider
