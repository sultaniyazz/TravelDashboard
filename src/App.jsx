import React, { useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Destinations from './pages/Destinations'
import Tours from './pages/Tours'
import CreateDestinations from './pages/CreateDestinations'
import CreateTours from './pages/CreateTours'
import Users from './pages/Users'
import { useDispatch } from 'react-redux'
import { getAllDestData, getAllTourData, getAllUsersData } from './utils/request'
import '../src/config/i18next'

const App = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllDestData('https://travel-data-base.onrender.com/destinations'))
    dispatch(getAllTourData('https://travel-data-base.onrender.com/offers'))
    dispatch(getAllUsersData('https://travel-data-base.onrender.com/users'))
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Destinations />} />
        <Route path='tours' element={<Tours />} />
        <Route path='create-destinations' element={<CreateDestinations />} />
        <Route path='create-tours' element={<CreateTours />} />
        <Route path='users' element={<Users />} />
      </Route>
    )
  )
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
