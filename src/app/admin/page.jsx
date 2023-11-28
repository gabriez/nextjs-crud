import VotesTable from "../components/admin/VotesTable"
import PieChart from "../components/admin/PieChart"

export const metadata = {
  title: 'Administrador - Resumen de los votos',
  description: 'Resumen de los votos',
}

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
