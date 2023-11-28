"use client"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSurveyContext } from "../context/SurveyProvider";
const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const {setOpen} = useSurveyContext()

    const navigate = (route) => {
        setOpen(false)
        router.push(route);
    }
    const activeLink = (path) => {
        return pathname === path;
    }
  return (
    <div className="px-7">
        <div className="font-bold text-xl text-white">
            <div className="mb-5 mt-10 md:mt-3 justify-center md:justify-start flex gap-5 items-center nav-links cursor-pointer" onClick={()=> {navigate('/admin')}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                </svg>
                <button className={`${activeLink('/admin') ? 'after:w-full' : 'after:w-0' } link after:content-[''] relative after:absolute after:bottom-[-4px] after:left-0
                 after:h-[5px] after:transition-all after:duration-400 after:rounded after:origin-left
                after:bg-amber-500`} >Resumen</button>
            </div>
          <div className="mb-5 justify-center md:justify-start flex gap-5 items-center nav-links cursor-pointer" onClick={()=> {navigate('/admin/electors')}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>

            <button className={`${activeLink('/admin/electors') ? 'after:w-full' : 'after:w-0' } link after:content-[''] relative after:absolute after:bottom-[-4px] after:left-0
            after:w-0 after:h-[5px] after:transition-all after:duration-400 after:rounded after:origin-left
          after:bg-amber-500`} >Candidatos</button>
          </div>
        </div>
    </div>
  )
}

export default Sidebar
