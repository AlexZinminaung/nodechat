import './App.css'
import Hero from './components/Hero'

import Navbar from './components/Navbar'
function App() {


  return (
      <div className="p-2 w-full md:w-[80%]  md:m-auto">
        <Navbar/>
        <Hero/>
      </div>
  )
}

export default App
