import React from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import ContentHome from './ContentHome.jsx'

const Home = () => {
  return (
    <div>
        <div className="flex flex-col min-h-screen">
      {/* Navbar (arriba) */}
      <Navbar />

      <main className="flex-grow">
        <section className="">
          
            <ContentHome />
        </section>
      </main>

      {/* Footer (abajo) */}
      <Footer />
    </div>
    </div>
  )
}

export default Home
