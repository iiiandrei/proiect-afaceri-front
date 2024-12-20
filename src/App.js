import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Redirect } from "react-router-dom";
import './App.css';

import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const Login = React.lazy(() => import('./views/pages/login/Login'))
const DefaultLayout = React.lazy(() => import('../src/layout/DefaultLayout'))

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login" element={<Login />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </div>
  );
}

export default App;
