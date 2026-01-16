import React from 'react'
import Hero from './Hero'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Brokerage from './Brokerage'
import OpenAccount from '../OpenAccount'
const PricingPage = () => {
  return (
    <div>
      <Hero/>
     <OpenAccount/> 
      <Brokerage/>
     
    </div>
  )
}

export default PricingPage
