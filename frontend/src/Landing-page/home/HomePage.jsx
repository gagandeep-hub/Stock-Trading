import React from 'react'
import Award from './Award'
import Hero from './Hero'
import Educaion from './Educaion'
import Pricing from './Pricing'
import Stats from './Stats'
import OpenAccount from '../OpenAccount'

const HomePage = () => {
  return (
    <div>
      <Hero/> 
      <Award/>
     <Stats/>
     <Pricing/>
       <Educaion/>
       <OpenAccount/>
    
    </div>
  )
}

export default HomePage
