import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSpinner } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTour, getAllTourData } from "../utils/request";
import { Formik } from "formik";
import { modalUpdate } from "../features/pageAction/pageActionSlice";
import * as Yup from 'yup';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import TourForm from "./Form/TourForm";

const validationSchema = Yup.object({
    title: Yup.string().required("city is required").max(40, "max 40 character").min(1, "min 1 character"),
    details: Yup.string().required("details is required").max(300, "max 300 character").min(5, "min 5 character"),
    images: Yup.array().of(Yup.string().url("Valid URL required")).min(1, "At least one image URL is required"),
    rating: Yup.string().required("rating is required"),
    price: Yup.string().required("price is required"),
    destinationId: Yup.string().required("price is required"),
})

const Tours = () => {
    const dispatch = useDispatch()
    const updateModalBoolean = useSelector(state => state.pageActionSlice.destModal);
    const loading = useSelector(state => state.tourSlice.isTourLoad);
    const dataTours = useSelector(state => state.tourSlice.tours);
    const [selectedItem, setSelectedItem] = useState(null);
    const { t } = useTranslation();


    const handleDelete = (id) => {
        dispatch(deleteTour(id));
    };

    const handleUpdate = (item) => {
        setSelectedItem(item);
        dispatch(modalUpdate())
    };

    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });
    return (
        <div>
            {loading ? (
                <div className='w-full h-[30vh] flex justify-center items-center'>
                    <span className="flex items-center gap-[.5vw] text-[1.2vw] font-medium max-md:text-[2vw] max-sm:text-[3vw]">
                        Loading <span className="animate-spin"><FaSpinner /></span>
                    </span>
                </div>
            ) : (
                <div className="flex justify-center w-full">
                    {updateModalBoolean && selectedItem && (
                        <Formik
                            initialValues={{
                                title: selectedItem.title || '',
                                price: selectedItem.price || '',
                                rating: selectedItem.rating || '',
                                details: selectedItem.details || '',
                                images: selectedItem?.images || [],
                                destinationId: selectedItem.destinationId || '',
                            }}
                            onSubmit={async (values) => {
                                try {

                                    await axios.patch(`https://travel-data-base.onrender.com/offers/${selectedItem.id}`, values);
                                    dispatch(getAllTourData('https://travel-data-base.onrender.com/offers'))
                                    dispatch(modalUpdate())
                                    toast.success("update succesfully", {
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
                                    <div className={`${inView ? "top-0 opacity-100" : "top-[2vw] opacity-0"} h-[60vh] overflow-hidden dark:border-[.1vw] dark:border-gray-600 w-[35vw] max-md:w-[50vw]  px-[2vw] max-sm:w-[70vw] dark:bg-[#0c0a09] rounded-[1vw] max-sm:my-[5vw]  sticky top-0 bg-white border-black border-[.1vw]`}>
                                        <div className="w-full  py-[1vw] flex flex-col items-end justify-center">
                                            <button onClick={() => dispatch(modalUpdate())} className="bg-gray-200 dark:bg-black rounded-[.2vw] flex justify-center items-center active:scale-95">
                                                <AiOutlineClose className="text-[1.5vw] max-md:text-[2vw] max-sm:text-[4vw]" />
                                            </button>
                                        </div>
                                        <TourForm props={props} />

                                    </div>
                                </div>
                            )}
                        </Formik>
                    )}
                    <div ref={ref} className='grid overflow-x-hidden  grid-cols-5 text-[1vw] max-md:grid-cols-3 max-sm:grid-cols-2 gap-[.5vw] max-md:gap-[1vw] max-md:p-[1vw] h-full overflow-y-auto'>
                        {dataTours.map((tour) => (
                            <div key={tour.id}>
                                <div className={`${inView ? "top-0 opacity-100" : "top-[2vw] opacity-0"} relative duration-500 flex flex-col group dark:hover:bg-[#0c0a09] hover:bg-gray-200 items-center gap-[.5vw] max-md:gap-[1vw] h-full p-[.2vw] max-md:p-[.5vw] max-sm:p-[1vw] rounded-[1vw] border-[.1vw] dark:border-gray-500`}>
                                    <div className="relative">
                                        <div className="overflow-hidden rounded-[1vw]">
                                            <img className='rounded-[1vw] object-cover object-center duration-200 group-hover:scale-105 w-[100vw] h-[18vw] max-md:h-[30vw] max-sm:h-[50vw]' src={tour?.images} alt="" />
                                            <span className='absolute top-[.7vw] text-[.8vw] max-md:text-[1.5vw] max-sm:text-[2.5vw] right-[.7vw] bg-orange-500 text-white font-bold px-[.6vw] rounded-[.5vw] py-[.2vw] flex items-center gap-[.1vw]'>
                                                {tour.rating}<AiFillStar />
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex h-full flex-col justify-between backdrop-blur-[.1vw] bottom-0 w-full gap-[1vw] px-[1vw]'>
                                        <h1 className='text-[1.3vw] h-full max-md:text-[2vw] max-sm:text-[3vw] font-bold'>{tour.title}</h1>
                                        <p className="h-full flex items-end gap-[.2vw] text-[1vw] max-md:text-[1.5vw] max-sm:text-[2.5vw] font-medium">
                                            <span className='font-bold text-orange-500'>$</span> {tour.price}
                                        </p>
                                    </div>
                                    <div className='w-full flex gap-[.5vw] py-[.5vw] px-[.4vw]'>
                                        <button onClick={() => handleUpdate(tour)} className='border-[.11vw] max-md:text-[1.5vw] max-sm:text-[2.2vw] rounded-[.5vw] font-medium active:scale-95 hover:bg-gray-100 dark:hover:bg-[#171717] border-green-600 p-[.3vw] max-md:p-[.8vw] w-full'>
                                            {t("update")}
                                        </button>
                                        <button onClick={() => handleDelete(tour.id)} className='border-[.11vw] max-md:text-[1.5vw] max-sm:text-[2.2vw] rounded-[.5vw] font-medium active:scale-95 hover:bg-gray-100 dark:hover:bg-[#171717] border-red-600 p-[.3vw] max-md:p-[.8vw] w-full'>
                                            {t("delete")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Tours;
