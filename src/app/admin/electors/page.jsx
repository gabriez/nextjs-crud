import AddCandidate from "@/app/components/electors/AddCandidate"
import ElectorsTable from "@/app/components/electors/ElectorsTable"
const page = () => {
  return (
    <>
        <h1 className="text-center text-3xl font-bold mt-14 mb-6 md:my-6 text-white">Candidatos a elecciones</h1>
        <div className="bg-gray-600 rounded-md shadow-slate-500 shadow-md mx-auto w-[80%] md:w-3/5 px-7 py-4">
          <AddCandidate/>
        </div>
      <ElectorsTable/>
    </>
  )
}

export default page
