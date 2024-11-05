import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { getAllTourData } from '../utils/request';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import TourForm from './Form/TourForm';

const validationSchema = Yup.object({
    title: Yup.string().required("city is required").max(20, "max 20 character").min(1, "min 1 character"),
    details: Yup.string().required("details is required").max(70, "max 70 character").min(5, "min 5 character"),
    images: Yup.array().of(Yup.string().url("Valid URL required")).min(1, "At least one image URL is required"),
    rating: Yup.string().required("rating is required"),
    price: Yup.string().required("price is required"),
    destinationId: Yup.string().required("price is required"),

})

const CreateTours = () => {
    const dispatch = useDispatch()

    function convertToSlug(Text) {
        return Text.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
    }

    const { t } = useTranslation()
    return (
        <Formik
            initialValues={{ details: '', images: [], title: '', slug: '', rating: '', price: '', destinationId: undefined }}
            onSubmit={async (values, { resetForm }) => {
                try {
                    const res = await axios.post('https://travel-data-base.onrender.com/offers', { ...values, slug: convertToSlug(values.title), destinationId: +values.destinationId })
                    resetForm()
                    dispatch(getAllTourData('https://travel-data-base.onrender.com/offers'))
                    toast.success('Create succsessfully', {
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
                }
            }}
            validationSchema={validationSchema}
        >
            {(props) => (
                <div className='w-full h-full max-sm:py-[8vw] overflow-y-auto px-[15vw] max-md:px-[10vw] max-sm:px-[8vw]'>
                    <TourForm props={props} />
                    < ToastContainer />
                </div>
            )}
        </Formik>
    )
}

export default CreateTours
