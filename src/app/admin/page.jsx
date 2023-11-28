import VotesTable from "../components/admin/VotesTable"
import PieChart from "../components/admin/PieChart"
const page = () => {
  return (
    <>
        <h1 className="text-center text-3xl font-bold mt-14 md:mt-6 text-white">Resumen de los votos</h1>
        <VotesTable/>
        <PieChart/>
    </>
  )
}

export default page
