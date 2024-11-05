import React from 'react'
import { navBars } from '../constant/navBars'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { modal } from '../features/pageAction/pageActionSlice'
import { useTranslation } from 'react-i18next'

const Navbar = () => {

    const dispatch = useDispatch()
    const { t } = useTranslation()

    return (
        <div className='h-full overflow-y-auto flex flex-col gap-[.3vw] max-md:gap-[1vw]'>
            {navBars.map((nav) => (
                <NavLink onClick={() => dispatch(modal())} key={nav.id} to={`${nav.url}`} className='py-[1vw] flex items-center gap-[.5vw] max-md:gap-[.7vw] px-[1vw] rounded-[.5vw] border-[.1vw] dark:border-gray-800 active:scale-95 font-bold'>
                    <span className='text-[1.7vw] max-md:text-[2vw] max-sm:text-[4vw]'>{nav.icon()}</span>
                    <span className='max-md:text-[1.6vw] max-sm:text-[3.3vw]'>{t(nav.title)}</span>
                </NavLink >
            ))}
        </div>
    )
}

export default Navbar
