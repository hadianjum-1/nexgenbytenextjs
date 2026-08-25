import React from 'react'
import Hero from './Hero';
import About from './About';
import Trustbadgesection from './Trustbadgesection';
import Services from './Services';
import Portfolio from './Portfoliio';
import Process from './Process';
import Testimonials from './Testimonials';
import Cta from './Cta';

const Main = () => {
  return (
    <main>
        <Hero/>
      <About/>
        <Trustbadgesection/>
        <Services/>
        <Portfolio/>
        <Process/>
        <Testimonials/>
        <Cta/>
    </main>
  )
}

export default Main
