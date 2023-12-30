import React,{ useEffect, useMemo, useState, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthContext } from "./compoforuser/AuthProvider"
import Cartt from "./compoforuser/main/Cartt"
import Delivery from "./compoforuser/main/Delivery"
import MainPage from "./compoforuser/main/MainPage"
import ResponsiveAppBar from "./compoforuser/main/Navbar"
import Orderitem from "./compoforuser/main/Orderitem"
import ProductPage from "./compoforuser/main/ProductPage"
import UserDetails from "./compoforuser/main/UserDetails"
import Login from "./compoforuser/pages/Login"
import Siginup from "./compoforuser/pages/Siginup"
import LoadingImg from './image/loading.svg';



const App = () => {
  const [user,setUser]=useState();
  const [loading, setLoading] = useState(true);

  const authContext = useMemo(()=>({
    user,
    setUser
  }));

  useEffect(()=>{
    const getData = async ()=>{
      let id= await localStorage.getItem('id');
      let name=await localStorage.getItem('user_name');
      let phone=await localStorage.getItem('phone');
      if(id != null){
        setUser({
          id:id,
          name:name,
          phone:phone
        })
        setLoading(false);
      }else{
        setLoading(false);
      }
      }
    
    getData();
  },[])


  
  return (
    <AuthContext.Provider value={authContext}>
      <BrowserRouter>
      {
      loading?
    <img src={LoadingImg} style={{width:100,height:100}} className='loadingimg' />
    :<Suspense fallback={
      <img src={LoadingImg} style={{width:100,height:100}} className='loadingimg' />
    }>
      {
        !user? 
      <Login /> :
      <div>
      <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<MainPage/>}>
          <Route  path="/" element={<ProductPage/>}/>
          <Route path="cart" element={<Cartt/>}/>
          <Route path="Orders" element={<Orderitem/>}/>
          <Route path="delivery" element={<Delivery/>}/>
          <Route path="/:id" element={<UserDetails/>}/>
          
          <Route path="login" element={<Login/>}/>
          
        </Route>
        <Route path="/signup" element={<Siginup/>}/>
      </Routes>

      </div>
      }
      </Suspense>
      }
      </BrowserRouter>
</AuthContext.Provider>
  
    
  );
}

export default App


