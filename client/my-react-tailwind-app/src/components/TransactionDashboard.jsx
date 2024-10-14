import React from 'react'
import Search from '../components/Search.jsx'
import Price from '../components/Price.jsx'
import Statistics from './Statistics.jsx'
import Footer from './Footer.jsx'
const TransactionDashboard = () => {
  return (
    <div>

      <div className='flex flex-col items-center justify-center bg-blue-300 min-w-100 min-h-screen gap-7'>
        <h1 className='text-4xl font-bold mt-20 '>Transaction DashBoard</h1>
        <Search/>
        <div className='flex gap-5'>
        <Price/>
        <Statistics/>
        </div>
        <Footer/>
      </div>
      
    </div>
  )
}

export default TransactionDashboard
