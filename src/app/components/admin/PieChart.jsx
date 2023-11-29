'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels:  ['Cargando los votos...'] ,
  color: '#FFF',
  datasets: [
    {
      label: '# of Votes',
      data: [1],
      backgroundColor: ['#48ad86'],
      borderColor:  ['#48ad86'],
      borderWidth: 1,
      color: '#FFF'
    },
  ]
};

const options = {#ffffff
    plugins: {
        legend: {
            position: 'bottom',

            labels: {
                
                color: '#FFF',
                // This more specific font property overrides the global property
                font: {
                    
                    size: 14
                    
                }
            }
        }
    }
}

const PieChart = () => {
  const [worstData, setWorstData] = useState({...data})
  const [bestData, setBestData] = useState({...data })

  const getData = async () => {
    const {data} = await axios(`${process.env.NEXT_PUBLIC_BACKEND_API}count`).then(response => response).catch(error => console.error(error))
    console.log(data)
    setWorstData({
      labels: data?.length === 0 ? ['No hay votos'] : data.countWorst.map(item => item.name),
      color: '#FFF',
      datasets: [
        {
          label: '# de votos',
          data: data?.length === 0  ?   [1] : data.countWorst.map(item => item.quantity),
          backgroundColor: data?.length === 0 ?  ['#FFF'] : data.countWorst.map(item => item.color),
          borderColor: data?.length === 0  ?  ['#FFF'] : data.countWorst.map(item => item.color),
          borderWidth: 1,
          color: '#FFF'
        },
      ]
    })
    setBestData({
      labels: data?.length === 0  ?  ['No hay votos'] : data.countBest.map(item => item.name) ,
      color: '#FFF',
      datasets: [
        {
          label: '# de votos',
          data: data?.length === 0  ?  [1] :  data.countBest.map(item => item.quantity) ,
          backgroundColor:data?.length === 0  ?  ['#FFF'] : data.countBest.map(item => item.color)  ,
          borderColor: data?.length === 0  ? ['#FFF'] : data.countBest.map(item => item.color),
          borderWidth: 1,
          color: '#FFF'
        },
      ]
    })

  }

  useEffect(()=> {
    getData()
  }, [])


  

  return (
     <div className='mt-10 bg-gray-600 rounded-md shadow-slate-500 flex md:flex-row flex-col md:gap-0 gap-6 shadow-md mx-auto w-4/5 px-7 py-4 '>
        <div className='md:w-2/4 text-white md:border-r-2 md:border-r-gray-500 border-r-0  border-b-2 md:border-b-0 border-b-gray-500 pr-2'>
            <h3 className='text-white text-2xl text-center font-bold mb-2'>Mejores candidatos</h3>
         <Doughnut options={options} data={bestData} />
        </div>
        <div className='md:w-2/4 text-white pl-2'>
            <h3 className='text-white text-2xl text-center font-bold mb-2'>Peores candidatos</h3>
         <Doughnut options={options} data={worstData} />
        </div>
     </div>
  )
}

export default PieChart
