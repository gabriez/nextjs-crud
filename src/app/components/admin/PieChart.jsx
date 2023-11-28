'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  color: '#FFF',
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
      color: '#FFF'
    },
  ]
};

const options = {
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
    setWorstData({
      labels: data.countWorst.length > 0 ? data.countWorst.map(item => item.name) : ['No hay votos'],
      color: '#FFF',
      datasets: [
        {
          label: '# de votos',
          data: data.countWorst.length > 0 ? data.countWorst.map(item => item.quantity) : [0],
          backgroundColor: data.countWorst.length > 0 ? data.countWorst.map(item => item.color) : ['#FFF'],
          borderColor: data.countWorst.length > 0 ? data.countWorst.map(item => item.color) : ['#FFF'],
          borderWidth: 1,
          color: '#FFF'
        },
      ]
    })
    setBestData({
      labels: data.countBest.length > 0 ? data.countBest.map(item => item.name) : ['No hay votos'],
      color: '#FFF',
      datasets: [
        {
          label: '# de votos',
          data: data.countBest.length > 0 ?  data.countBest.map(item => item.quantity) : [0],
          backgroundColor:data.countBest.length > 0 ? data.countBest.map(item => item.color)  : ['#FFF'],
          borderColor: data.countBest.length > 0 ? data.countBest.map(item => item.color)  : ['#FFF'],
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
        <div className='md:w-2/4 text-white md:border-r-2 md:border-r-gray-500 border-r-0  border-b-2 border-b-gray-500 pr-2'>
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
