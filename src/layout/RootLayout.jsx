import { IoIosArrowForward } from "react-icons/io";
import { SiAircanada } from "react-icons/si";
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { modal } from "../features/pageAction/pageActionSlice";

const RootLayout = () => {
    const dispatch = useDispatch();
    const modalData = useSelector(state => state.pageActionSlice.showSideBar);


    return (
        <div className='w-[100vw] h-[100vh] bg-white dark:bg-[#0a0a0a] dark:text-[#e2e8f0] select-none overflow-hidden relative p-[1vw] text-[#030712] flex gap-[.4vw] text-[1.1vw] max-md:text-[2vw] max-sm:text-[3vw] font-Montserrat'>
            <div className={`${modalData ? "left-0" : "left-[-50%]"} w-[20vw] dark:bg-[#131313] duration-500 max-md:w-[30vw] max-sm:w-[50vw] max-sm:fixed z-30 bg-white max-sm:bg-gray-50 flex flex-col gap-[.4vw]`}>
                <div className='h-[10vh] max-md:h-[9vh] rounded-[.4vw] text-[2vw] max-md:text-[2.3vw] max-sm:text-[2.4vw] gap-[.2vw] p-[1vw] border-[.1vw] dark:border-gray-800 shadow-[0vw_0.2vw_0.3vw_0.1vw_rgba(34,60,80,0.2)] flex justify-center items-center'>
                    <span className="text-[3vw] max-md:text-[4vw] max-sm:text-[6vw] text-orange-600"><SiAircanada /></span>
                    <span className="font-bold max-sm:text-[5vw] font-PermanentMarker">Tourvisto</span>
                </div>
                <div className='h-[90vh] max-md:h-[91vh] rounded-[.4vw] py-[1vw] px-[.5vw] border-[.1vw] dark:border-gray-800 shadow-[0vw_0.2vw_0.3vw_0.1vw_rgba(34,60,80,0.2)]'>
                    <Navbar />
                </div>
                <button className="absolute z-20 right-0 translate-x-[80%] sm:hidden opacity-60 h-full">
                    <span onClick={() => dispatch(modal())} className="text-[8vw]">
                        {modalData ? (
                            <IoIosArrowForward className="bg-orange-500 h-[10vw] text-white w-[4vw] rotate-180" />
                        ) : (
                            <IoIosArrowForward className="bg-orange-500 h-[10vw] text-white w-[4vw]" />
                        )}
                    </span>
                </button>
            </div>
            <div className='flex flex-col w-[80vw] max-md:w-full max-sm:w-full dark:bg-[#131313] gap-[.4vw]'>
                <div className='h-[10vh] max-md:h-[9vh] rounded-[.4vw] gap-[.2vw] p-[1vw] max-sm:px-[1.5vw] border-[.1vw] dark:border-gray-800 shadow-[0vw_0.2vw_0.3vw_0.1vw_rgba(34,60,80,0.2)] flex justify-center items-center'>
                    <Header />
                </div>
                <div className='h-[90vh] max-md:h-[91vh] rounded-[.4vw] overflow-hidden overflow-y-auto p-[1vw] border-[.1vw] dark:border-gray-800 shadow-[0vw_0.2vw_0.3vw_0.1vw_rgba(34,60,80,0.2)]'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default RootLayout;
