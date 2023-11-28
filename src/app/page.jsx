import axios from "axios";
import FormVotes from "./components/FormVotes";

// const getCandidates = async () => {
//   const data = await axios(`${process.env.BACKEND_API}candidates`).then(data => data.data).
//   catch(error => console.error('errrrrrrrrrrrrrrrrrrrroooooooooooooooooor ===>', error))
//   return JSON.parse(JSON.stringify(data));
// }

export default async function Home() {
  // const listCandidates = JSON.parse(JSON.stringify(await getCandidates()));

  return (
   <main className="bg-gray-900 pb-7">
      <h1 data-testid='heading' className="block bg-gray-800 text-center text-white font-bold text-4xl py-5">
        Encuesta electoral
      </h1>
      <div className="m-auto p-6 mt-5 shadow-lg w-5/6 md:w-4/6 lg:w-[50%] xl:w-[42%] text-white bg-gray-600 rounded-md">
        <FormVotes />
      </div>
   </main>
  )
}
