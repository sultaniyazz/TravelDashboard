import axios from 'axios'
import { Field, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { getAllDestData } from '../utils/request';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DestForm from './Form/DestForm';

const CreateDestinations = () => {
    const dispatch = useDispatch()

    function convertToSlug(Text) {
        return Text.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("city is required").max(20, "max 20 character").min(1, "min 1 character"),
        description: Yup.string().required("description is required").max(70, "max 70 character").min(5, "min 5 character"),
        country: Yup.string().required("country is required").max(15, "max 15 character").min(1, "min 1 character"),
        image: Yup.string().required("image is required").url("valid URL"),
    })
    const { t } = useTranslation()
    return (
        <Formik
            initialValues={{ country: '', description: '', id: '', image: '', name: '', slug: '' }}
            onSubmit={async (values, { resetForm }) => {
                try {
                    const res = await axios.post('https://travel-data-base.onrender.com/destinations', { ...values, slug: convertToSlug(values.name), id: values.length + 1 })
                    resetForm()
                    dispatch(getAllDestData('https://travel-data-base.onrender.com/destinations'))
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
                    <DestForm props={props} />
                    <ToastContainer />
                </div>
            )}
        </Formik>
    )
}

export default CreateDestinations
