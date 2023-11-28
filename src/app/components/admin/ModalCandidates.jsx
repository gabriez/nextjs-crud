import { useSurveyContext } from "@/app/context/SurveyProvider"
import Loader from "../loader";
const ModalCandidates = () => {
  const {handleModal, modalInfo} = useSurveyContext();
  if (!modalInfo.bestcandidate) {
    return (
      <div className="w-2/4 h-2/4">

      <div className="mx-auto w-fit">
        <Loader/>
      </div>
      </div>
    )
  }
  const {bestcandidate, bestCDescription, worstCDescription, worstcandidate} = modalInfo;
  return (
    <div  className="bg-gray-600 text-white">
      <div className="flex justify-end mb-2">
        <button type="button" className="text-red-400 text-lg" onClick={handleModal}>
          X
        </button>
      </div>
      <div className="flex md:flex-row flex-col items-center mb-4 md:mb-4">
        <div className="w-full md:w-4/5 text-center md:text-left mb-2 md:mb-0">
          <h4 className="text-xl font-bold">Mejor candidato:</h4>
          <p>{bestcandidate}</p>
        </div>
        <p className="bg-gray-800 p-3 rounded">
          {bestCDescription}
        </p>
      </div>
      <div className="flex md:flex-row flex-col items-center ">
        <div className="w-full md:w-4/5 text-center md:text-left mb-2 md:mb-0">
          <h4 className="text-xl font-bold">Peor Candidato:</h4>
          <p>{worstcandidate}</p>
        </div>
        <p className="bg-gray-800 p-3 rounded">
          {worstCDescription}
        </p>
      </div>
    </div>
  )
}

export default ModalCandidates
