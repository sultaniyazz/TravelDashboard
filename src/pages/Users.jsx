import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React from 'react';
import { useSelector } from 'react-redux';

const Users = () => {
    const users = useSelector(state => state.pageUsersSlice.users)
    const loading = useSelector(state => state.pageUsersSlice.isUserLoad)
    console.log(users);


    return (
        <div>
            {loading ?
                <div className='w-full h-full flex justify-center mt-[10vw]'>
                    <div className="flex items-center text-[2vw] max-md:text-[3vw] max-sm:text-[4vw] gap-[1.5vw]">
                        <span>Loading</span>
                        <span className="animate-spin"><AiOutlineLoading3Quarters /></span>
                    </div>
                </div>
                :
                <div>
                    <div className="overflow-x-auto w-full">
                        <table className="table-fixed w-full border-[.1vw]">
                            <thead>
                                <tr className="bg-orange-600">
                                    <th className="border-[.1vw] w-[5%]">ID</th>
                                    <th className="border-[.1vw] w-[15%]">FullName</th>
                                    <th className="border-[.1vw] w-[20%]">Number</th>
                                    <th className="border-[.1vw] w-[20%]">Email</th>
                                    <th className="border-[.1vw] w-[20%]">destination</th>
                                    <th className="border-[.1vw] w-[20%]">Description</th>
                                </tr>
                            </thead>
                            {users.map((item, index) => (
                                <tbody>
                                    <tr className="hover:bg-gray-100 hover:dark:bg-gray-900">
                                        <td className="border-[.1vw] py-[.5vw] max-md:py-[1vw] max-sm:py-[1.1vw] scrollbar-thin text-center">{index + 1}</td>
                                        <td className="border-[.1vw] py-[.5vw] max-md:py-[1vw] max-sm:py-[1.1vw] scrollbar-thin overflow-auto whitespace-nowraps">{item.name}</td>
                                        <td className="border-[.1vw] py-[.5vw] max-md:py-[1vw] max-sm:py-[1.1vw] scrollbar-thin overflow-auto whitespace-nowrap">{item.phone}</td>
                                        <td className="border-[.1vw] py-[.5vw] max-md:py-[1vw] max-sm:py-[1.1vw] scrollbar-thin overflow-auto whitespace-nowrap">{item.email}</td>
                                        <td className="border-[.1vw] py-[.5vw] max-md:py-[1vw] max-sm:py-[1.1vw] scrollbar-thin overflow-auto whitespace-nowrap">{item.notes}</td>
                                        <td className="border-[.1vw] py-[.5vw] max-md:py-[1vw] max-sm:py-[1.1vw] scrollbar-thin overflow-auto whitespace-nowrap">{item.notes}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            }
        </div>
    );
}

export default Users;
