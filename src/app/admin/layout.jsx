"use client";
import Sidebar from '../components/Sidebar'
import ModalCandidates from '../components/admin/ModalCandidates'
import Modal from 'react-modal'
import { Squash as Hamburger } from "hamburger-react";
import { useSurveyContext } from '../context/SurveyProvider'
import { useState } from 'react';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: ' rgb(75 85 99 / 1)',
        border: 'none',
        width: 'fit',
        maxWidth: '75%',
        paddingTop: '7px'
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
};
Modal.setAppElement('#root');

const layout = ({children}) => {
    const {modal, isOpen, setOpen} = useSurveyContext()
  return (
    <div className='flex'>
        <div className='md:hidden absolute top-5 left-5 text-white z-10'>
                <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>
        <aside className={`w-full md:w-3/12 lg:w-4/12 xl:w-2/12 h-screen md:sticky absolute top-0 ${isOpen ? 'left-0' : 'left-[-100%]'} bg-gray-800 transition-all duration-500`}>
            <Sidebar/>
        </aside>
        <main className=' w-full md:w-9/12 lg:w-8/12 xl:w-10/12 bg-gray-900 pb-4 min-h-screen'>
            {children}
        </main>
        {
            modal &&
                <Modal
                isOpen={modal}
                style={customStyles}
            >
                    <ModalCandidates/>
                </Modal>
        }
    </div>
  )
}

export default layout
