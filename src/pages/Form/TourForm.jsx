import { Field, FieldArray } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { HiOutlineTrash } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const TourForm = ({ props }) => {
    const data = useSelector(state => state.destinationsSlice.destinations)
    const { pathname } = useLocation();
    const { t } = useTranslation();

    return (
        <form onSubmit={props.handleSubmit} className={`${pathname == "/tours" ? "h-[50vh]" : "w-full"} flex flex-col gap-[1vw] max-md:gap-[2vw] py-[1vw] max-sm:gap-[4vw] overflow-y-auto overflow-x-hidden`}>
            <div className='flex flex-col gap-[.3vw] w-full'>
                <label htmlFor="title" className='text-[1.4vw] max-md:text-[2vw] max-sm:text-[3vw] font-semibold'>{t("city")}</label>
                <Field onChange={props.handleChange} id='title' name='title' className='outline-none hover:bg-gray-200 dark:hover:bg-[#171717] rounded-[.3vw] bg-gray-100 dark:bg-[#1c1917] border-[.1vw] border-gray-300 px-[.6vw] py-[.6vw] max-md:py-[.8vw] max-sm:py-[2vw]' type="text" placeholder='Name...' />
                <div className='h-min'>
                    {props.errors.title && props.touched.title && <span className='text-red-500'>{props.errors?.title}</span>}
                </div>
            </div>
            <div className='flex w-full justify-center px-[1vw] gap-[1vw]'>
                <div className='flex flex-col w-[50%] gap-[.3vw]'>
                    <label htmlFor="price" className='text-[1.4vw] max-md:text-[2vw] max-sm:text-[3vw] font-semibold'>{t("price")}</label>
                    <Field onChange={props.handleChange} id='price' name='price' className='outline-none hover:bg-gray-200 dark:hover:bg-[#171717] rounded-[.3vw] bg-gray-100 dark:bg-[#1c1917] border-[.1vw] border-gray-300 px-[.6vw] py-[.6vw] max-md:py-[.8vw] max-sm:py-[2vw]' type="number" placeholder='price' />
                    <div className='h-min'>
                        {props.errors.price && props.touched.price && <span className='text-red-500'>{props.errors?.price}</span>}
                    </div>
                </div>
                <div className='flex flex-col w-[50%] gap-[.3vw]'>
                    <label htmlFor="rating" className='text-[1.4vw] max-md:text-[2vw] max-sm:text-[3vw] font-semibold'>{t("rating")}</label>
                    <Field onChange={props.handleChange} id='rating' name='rating' className='outline-none hover:bg-gray-200 dark:hover:bg-[#171717] rounded-[.3vw] bg-gray-100 dark:bg-[#1c1917] border-[.1vw] border-gray-300 px-[.6vw] py-[.6vw] max-md:py-[.8vw] max-sm:py-[2vw]' type="number" placeholder='rating' />
                    <div className='h-min'>
                        {props.errors.rating && props.touched.rating && <span className='text-red-500'>{props.errors?.rating}</span>}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-[.3vw]'>
                <label htmlFor="details" className='text-[1.4vw] max-md:text-[2vw] max-sm:text-[3vw] font-semibold'>{t("details")}</label>
                <Field as={"textarea"} onChange={props.handleChange} id='details' name='details' className='h-[10vw] max-md:h-[15vw] max-sm:h-[25vw] resize-none outline-none hover:bg-gray-200 dark:hover:bg-[#171717] rounded-[.3vw] bg-gray-100 dark:bg-[#1c1917] border-[.1vw] border-gray-300 px-[.6vw] py-[.6vw] max-md:py-[.8vw] max-sm:py-[2vw]' type="text" placeholder='details...' />
                <div className='h-min'>
                    {props.errors.details && props.touched.details && <span className='text-red-500'>{props.errors?.details}</span>}
                </div>
            </div>
            <div className='flex flex-col gap-[.3vw]'>
                <label htmlFor="images" className='text-[1.4vw] max-md:text-[2vw] max-sm:text-[3vw] font-semibold'>{t("Image-URLs")}</label>
                <FieldArray name="images" render={(arrayHelpers) => (
                    <div className="flex flex-col px-[1vw]">
                        {props.values.images.map((image, index) => (
                            <div key={index} className='flex items-center gap-[.5vw]'>
                                <Field onChange={props.handleChange} name={`images[${index}]`} className='outline-none w-full my-[.5vw] hover:bg-gray-200 dark:hover:bg-[#171717] rounded-[.3vw] bg-gray-100 dark:bg-[#1c1917] border-[.1vw] border-gray-300 px-[.6vw] py-[.6vw]' type="url" placeholder='htt2s://photo...' />
                                <button type="button" onClick={() => arrayHelpers.remove(index)} className="max-sm:px-[1vw] flex active:scale-95 justify-center items-center  h-min text-white rounded">
                                    <HiOutlineTrash className="text-[2vw] max-md:text-[3vw] max-sm:text-[4vw] text-red-500 hover:text-red-600" />
                                </button>
                            </div>
                        ))}
                        <div>
                            <button type="button" onClick={() => arrayHelpers.push('')} className="bg-green-500 text-white px-[1vw] py-[.5vw] font-semibold rounded hover:bg-green-600">
                                {t("Add-Image")}
                            </button>
                        </div>
                    </div>
                )}
                />
                <div className='h-min'>
                    {props.errors.images && props.touched.images && (
                        <span className='text-red-500'>{props.errors.images}</span>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-[.3vw]'>
                <label htmlFor="destinationId" className='text-[1.4vw] max-md:text-[2vw] max-sm:text-[3vw] font-semibold'>{t("destinations")}</label>
                <select id='destinationId' defaultValue="" onChange={props.handleChange} name='destinationId' className='outline-none hover:bg-gray-200 dark:hover:bg-[#171717] rounded-[.3vw] bg-gray-100 dark:bg-[#1c1917] border-[.1vw] border-gray-300 px-[.6vw] py-[.6vw] max-md:py-[.8vw] max-sm:py-[2vw] placeholder:opacity-25'>
                    <option value="" disabled>{t("select-destinations")}</option>
                    {data.map(dest => (
                        <option name={dest.destinationId} key={dest.id} value={dest.id}>{dest.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <span className='flex justify-end'>
                    <button type='submit' className='flex max-sm:w-full max-sm:flex max-sm:justify-center max-sm:py-[1.5vw] bg-teal-500 hover:bg-teal-600 px-[3vw] max-md:px-[4vw] max-sm:px-[5vw] py-[.5vw] font-bold text-white active:scale-95 rounded-[.5vw]'>{t("update")}</button>
                </span>
            </div>
        </form>
    )
}

export default TourForm
