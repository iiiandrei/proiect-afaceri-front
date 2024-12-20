import React, {useEffect, useState} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar } from '../components/Navbar';
import { AllAnnouncements } from '../views/allAnnouncements/AllAnnouncements';
import { Announcements } from '../views/announcements/Announcements';


const DefaultLayout = () => {

  const authToken = useSelector((state) => state.authToken);
  const [tokenLoaded, setTokenLoaded] = useState(false);

  useEffect(() => {
    setTokenLoaded(true);
  }, [])

  return (
    tokenLoaded && !authToken ?
      <Navigate replace to="/login" />
    :
      <div>
        <Navbar/>
        <Routes>
          <Route exact path="/all-announcements" name="All Announcements" element={<AllAnnouncements />} />
          <Route exact path="/my-announcements" name="My Announcements" element={<Announcements />} />
        </Routes>
      </div>
  )
}

export default DefaultLayout
