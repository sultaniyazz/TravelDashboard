import { AiOutlineClose } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { deleteDest, deleteTour, getAllDestData } from "../utils/request";
import { modalUpdate } from "../features/pageAction/pageActionSlice";
import { Formik, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DestForm from "./Form/DestForm";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    country: Yup.string().required("Country is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().url("Invalid URL").required("Image is required"),
});

const Destinations = () => {
    const dispatch = useDispatch();
    const dataDest = useSelector(state => state.destinationsSlice.destinations);
    const dataTour = useSelector(state => state.tourSlice.tours);
    const loading = useSelector(state => state.destinationsSlice.isDestLoad);
    const updateModalBoolean = useSelector(state => state.pageActionSlice.destModal);
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState(null);


    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    });

    const handleDelete = async (id) => {
        await dispatch(deleteDest(id));
        const tour = dataTour.find(item => item?.destinationId == id);
        await dispatch(deleteTour(tour?.id));
    };

    const handleUpdate = (item) => {
        setSelectedItem(item);
        dispatch(modalUpdate())
    };

    return (
        <div>
            {loading ? (
                <div className="w-full h-[30vh] flex relative justify-center items-center">
                    <span className="flex items-center gap-[.5vw] text-[1.2vw] font-medium max-md:text-[2vw] max-sm:text-[3vw]">
                        Loading <span className="animate-spin"><FaSpinner /></span>
                    </span>
                </div>
            ) : (
                <div className="flex justify-center  w-full">
                    {updateModalBoolean && selectedItem && (
                        <Formik
                            initialValues={{
                                name: selectedItem.name || '',
                                country: selectedItem.country || '',
                                description: selectedItem.description || '',
                                image: selectedItem.image || '',
                            }}
                            onSubmit={async (values) => {
                                try {
                                    await axios.patch(`https://travel-data-base.onrender.com/destinations/${selectedItem.id}`, values);
                                    dispatch(getAllDestData('https://travel-data-base.onrender.com/destinations'))
                                    dispatch(modalUpdate())
                                    toast.success('Update succsessfully', {
                                        position: "bottom-right",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: false,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    });

                                } catch (err) {
                                    console.log(err.message);
                                    toast.error("update error", {
                                        position: "bottom-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    });
                                }
                            }}
                            validationSchema={validationSchema}
                        >
                            {(props) => (
                                <div className="backdrop-blur-[.1vw] w-full h-[calc(90vh-1vw)] z-10 absolute flex justify-center">
                                    <div className={`${inView ? "top-0 opacity-100" : "top-[2vw] opacity-0"} dark:border-[.1vw] dark:border-gray-600 w-[35vw] max-md:w-[50vw] py-[2vw] px-[2vw] max-sm:w-[70vw] dark:bg-[#0c0a09] rounded-[1vw] max-sm:my-[5vw] h-min sticky top-0 bg-white border-black border-[.1vw]`}>
                                        <div className="w-full flex flex-col items-end justify-center">
                                            <button onClick={() => dispatch(modalUpdate())} className="bg-gray-200 dark:bg-black rounded-[.2vw] flex justify-center items-center active:scale-95">
                                                <AiOutlineClose className="text-[1vw] max-md:text-[2vw] max-sm:text-[4vw]" />
                                            </button>
                                            <DestForm props={props} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Formik>
                    )}
                    <div ref={ref} className="grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 overflow-x-hidden gap-[.5vw] overflow-y-auto">
                        {
                            dataDest.map(dest => (
                                <div key={dest.id}>
                                    <div className={`${inView ? "top-0 opacity-100" : "top-[2vw] opacity-0"} relative duration-500 flex flex-col group dark:hover:bg-[#0c0a09] hover:bg-gray-200 items-center gap-[.5vw] max-md:gap-[1vw]  h-full p-[.2vw] max-md:p-[.5vw] max-sm:p-[1vw] rounded-[1vw] border-[.1vw] dark:border-gray-500`}>
                                        <div className="relative">
                                            <div className="overflow-hidden rounded-[1vw] ">
                                                <img className='rounded-[1vw] object-cover object-center duration-200 group-hover:scale-105 w-[100vw] h-[18vw] max-md:h-[30vw] max-sm:h-[50vw]' src={dest.image} alt="" />
                                                <span className='absolute top-[.7vw] text-[.8vw] max-md:text-[1.5vw] max-sm:text-[2.5vw] right-[.7vw] bg-orange-500 text-white font-bold px-[.6vw] rounded-[.5vw] py-[.2vw]'>{dest.country}</span>
                                            </div>
                                        </div>
                                        <div className='flex h-full flex-col justify-between backdrop-blur-[.1vw] bottom-0 w-full gap-[.5vw] px-[1vw]'>
                                            <h1 className='text-[1.3vw] max-md:text-[2vw] max-sm:text-[3vw] font-bold'>{dest.name}</h1>
                                            <p className="h-full text-[.9vw] max-md:text-[1.5vw] max-sm:text-[2.5vw]">{dest.description}</p>
                                        </div>
                                        <div className='w-full flex gap-[.5vw] py-[.5vw] px-[.4vw]'>
                                            <button onClick={() => handleUpdate(dest)} className='border-[.11vw] max-md:text-[1.5vw] max-sm:text-[2.2vw] rounded-[.5vw] font-medium active:scale-95 hover:bg-gray-100 dark:hover:bg-[#171717] border-green-600 p-[.3vw] max-md:p-[.8vw] w-full'>{t("update")}</button>
                                            <button onClick={() => handleDelete(dest.id)} className='border-[.11vw] max-md:text-[1.5vw] max-sm:text-[2.2vw] rounded-[.5vw] font-medium active:scale-95 hover:bg-gray-100 dark:hover:bg-[#171717] border-red-600 p-[.3vw] max-md:p-[.8vw] w-full'>{t("delete")}</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Destinations;
