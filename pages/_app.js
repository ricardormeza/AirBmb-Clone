import '../styles/globals.css'
import Navbar from '../components/NavBar'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar/>
      <Component {...pageProps} />
    </>
  ) 
  
  
}

export default MyApp
