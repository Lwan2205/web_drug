import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Context from './context';
import SummaryApi from './common';
import { useEffect, useState } from 'react';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)


  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
  }
  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }
  useEffect(() => {
    /**user Details */
    fetchUserDetails()
    fetchUserAddToCart()
  }, [])


  return (

    <>
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart


      }}>
        <div className='container'>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </Context.Provider>


    </>
  );
}

export default App;
