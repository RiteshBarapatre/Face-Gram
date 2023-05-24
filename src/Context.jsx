import React, { createContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import instance from '../axios';

const AppContext = createContext()

const Context = ({children}) => {

    const [user,setUser] = useState(undefined)
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [allPosts,setAllPosts] = useState([])
    const [userAllPosts,setUserAllPosts] = useState([])
    
    useEffect(()=>{
      if(user){
        setCookie('user', user, { path: '/' });      
      }
    },[user])

    useEffect(()=>{
    const func = async ()=>{
      const response = await instance.get("/post/allpost");
      console.log(response.data)
      setAllPosts(response.data.reverse())
    }
    func()
    },[])
  return (
    <AppContext.Provider value={{setUser,user,cookies,removeCookie,allPosts}}>
    {children}
    </AppContext.Provider>
  )
}

export default Context
export {AppContext}