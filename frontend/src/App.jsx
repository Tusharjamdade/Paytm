import { useState } from 'react'
import Signup from "../component/Signup"
import Signin from "../component/Signin"
import './App.css'
import Navbar from "../component/Navbar"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../component/Dashboard'
import {Appbar} from '../component/Appbar'
import { Users } from '../component/Users'
import { SendMoney } from '../component/SendMoney'
import { RecoilRoot } from 'recoil'

function App() {

  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
    <Navbar/>
     <Routes>
          <Route path="/dashboard" element={<Users />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/sendmoney" element={<SendMoney />}></Route>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </>
  )
}

export default App
