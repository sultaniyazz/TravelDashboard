import { CiDark, CiSun } from "react-icons/ci";
import React, { useEffect, useState } from 'react';
import { navBars } from "../constant/navBars";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lang, mode } from "../features/pageAction/pageActionSlice";
import { languages } from "../constant/language";
import { useTranslation } from "react-i18next";

const Header = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const darkMode = useSelector(state => state.pageActionSlice.darkMode);
    const langData = useSelector(state => state.pageActionSlice.langChange);
    const { t, i18n } = useTranslation()

    const [changeImg, setchangeImg] = useState(languages[0].image);


    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            dispatch(mode());
        }
    }, [dispatch]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.removeItem('theme');
        }
    }, [darkMode]);


    const changeLangBtn = (title) => {
        dispatch(lang());
        const result = languages.find((lang) => lang.title === title);
        setchangeImg(result.image);
        i18n.changeLanguage(title.toLowerCase())
    };


    return (
        <div className='w-full flex justify-between items-center'>
            <div>
                <span className="font-bold text-[1.5vw] max-md:text-[2.5vw] max-sm:text-[4vw]">
                    {navBars.map((nav) => (
                        <span key={nav.id}>
                            {nav.url === pathname &&
                                <div className="flex items-center gap-[.5vw]">
                                    <span className="text-[2vw] max-md:text-[2.5vw] max-sm:text-[5vw] text-orange-500 p-[.5vw] rounded-[.7vw] bg-gray-100 dark:bg-gray-600">{nav.icon()}</span>
                                    <span>{t(nav.title)}</span>
                                </div>
                            }
                        </span>
                    ))}
                </span>
            </div>
            <div className="flex items-center gap-[.8vw] max-md:gap-[1.2vw] relative">
                <button onClick={() => dispatch(lang())} className="w-[6vw] max-md:w-[12vw] max-sm:w-[22vw] flex items-center gap-[.5vw] rounded-[.5vw] px-[.7vw]  py-[.4vw] max-md:py-[.5vw] max-sm:py-[1.5vw] max-sm:gap-[1vw] justify-center border-[.1vw] bg-gray-100 dark:bg-[#0c0a09] dark:border-[.1vw] dark:border-[#171717] active:scale-95">
                    <img className="w-[1.8vw] max-md:w-[3vw] max-sm:w-[4vw]" src={changeImg} alt="language" />
                    <span className="font-bold text-[1vw] max-md:text-[1.8vw] max-sm:text-[3vw]">{languages.find(lang => lang.image === changeImg)?.title || "ENG"}</span>
                </button>
                <div className={`${langData ? "flex" : "hidden"} flex flex-col max-w-[6vw] items-center absolute top-[3vw] max-md:top-[5vw] max-sm:top-[9vw] max-sm:right-[17.2vw] right-[3.6vw] max-md:right-[9.2vw] gap-[.2vw]`}>
                    {languages.map(item => (
                        <button key={item.id} onClick={() => changeLangBtn(item.title)} className="w-[6vw]  z-30 max-md:w-[12vw] max-sm:w-[22vw] flex items-center gap-[.5vw] rounded-[.5vw] px-[.7vw]  py-[.4vw] max-md:py-[.5vw] max-sm:py-[1.5vw] max-sm:gap-[1vw] justify-center border-[.1vw] bg-gray-100 dark:bg-[#0c0a09] dark:border-[.1vw] dark:border-[#171717] active:scale-95">
                            <img className="w-[1.8vw] max-md:w-[3vw] max-sm:w-[4vw]" src={item.image} alt={item.title} />
                            <span className="font-bold text-[1vw] max-md:text-[1.8vw] max-sm:text-[3vw]">{item.title}</span>
                        </button>
                    ))}
                </div>
                <button onClick={() => dispatch(mode())} className="text-[1.8vw] max-md:text-[4vw] max-sm:text-[7vw] bg-gray-100 dark:bg-[#0c0a09] dark:border-[.1vw] dark:border-[#171717] active:scale-95 rounded-full p-[.5vw]">
                    {darkMode ? <CiSun /> : <CiDark />}
                </button>
            </div>
        </div>
    );
};

export default Header;
