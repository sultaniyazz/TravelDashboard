import { Field } from 'formik'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const DestForm = ({ props }) => {
    const { t } = useTranslation()
    const { pathname } = useLocation();

    return (
        <form onSubmit={props.handleSubmit} className={`${pathname == "/" ? "" : "py-[1vw] max-sm:gap-[5vw]"} flex justify-between w-full flex-col gap-[1vw] max-md:gap-[2vw] max-sm:gap-[3vw] `}>
            <div className="flex flex-col gap-[.3vw]">
                <label htmlFor="name" className="text-[1.4vw] max-md:text-[2vw] max-sm:text-[3vw] font-semibold">{t("city")}</label>
                <Field name="name" className="outline-none dark:bg-gray-800 dark:border-[.1vw] dark:border-gray-500 rounded-[.3vw] bg-gray-100 px-[.5vw] py-[.6vw] max-md:py-[.8vw] max-sm:py-[2vw]" type="text" placeholder="Name..." />
                <div className="h-[1vw]">
                    {props.errors.name && props.touched.name && <span className="text-red-500">{props.errors.name}</span>}
                </div>
            </div>
            <div className="flex flex-col gap-[.3vw]">
                <label htmlFor="country" className="text-[1.4vw] max-md:text-[2vw] max-sm:text-[3vw] font-semibold">{t("country")}</label>
                <Field name="country" className="outline-none dark:bg-gray-800 dark:border-[.1vw] dark:border-gray-500 rounded-[.3vw] bg-gray-100 px-[.5vw] py-[.6vw] max-md:py-[.8vw] max-sm:py-[2vw]" type="text" placeholder="Country..." />
                <div className="h-[1vw]">
                    {props.errors.country && props.touched.country && <span className="text-red-500">{props.errors.country}</span>}
                </div>
            </div>
            <div className="flex flex-col gap-[.3vw]">
                <label htmlFor="description" className="text-[1.4vw] max-md:text-[2vw] max-sm:text-[3vw] font-semibold">{t("description")}</label>
                <Field as="textarea" name="description" className="outline-none dark:bg-gray-800 dark:border-[.1vw] dark:border-gray-500 resize-none max-sm:h-[15vh] rounded-[.3vw] bg-gray-100 px-[.5vw] py-[.6vw] max-md:py-[.8vw] max-sm:py-[2vw]" placeholder="Description..." />
                <div className="h-[1vw]">
                    {props.errors.description && props.touched.description && <span className="text-red-500">{props.errors.description}</span>}
                </div>
            </div>
            <div className="flex flex-col gap-[.3vw]">
                <label htmlFor="image" className="text-[1.4vw] max-md:text-[2vw] max-sm:text-[3vw] font-semibold">{t("image-adress")}</label>
                <Field name="image" className="outline-none dark:bg-gray-800 dark:border-[.1vw] dark:border-gray-500 rounded-[.3vw] bg-gray-100 px-[.5vw] py-[.6vw] max-md:py-[.8vw] max-sm:py-[2vw]" type="url" placeholder="Image URL..." />
                <div className="h-[1vw]">
                    {props.errors.image && props.touched.image && <span className="text-red-500">{props.errors.image}</span>}
                </div>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="flex max-sm:w-full max-sm:flex max-sm:justify-center max-sm:py-[1.5vw] bg-teal-500 hover:bg-teal-600 px-[3vw] max-md:px-[4vw] max-sm:px-[5vw] py-[.5vw] font-bold text-white active:scale-95 rounded-[.5vw]">{t("update")}</button>
            </div>
        </form>
    )
}

export default DestForm
