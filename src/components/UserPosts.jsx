import React, { useContext, useEffect, useState } from 'react'
import CardComp from './CardComp'
import Sidebar from "./Sidebar"
import { AppContext } from '../Context';
import instance from '../../axios';

const UserPosts = () => {

  const { cookies } = useContext(AppContext);
  const [userPosts,setUserPosts] = useState([])

  useEffect(()=>{
    const func = async ()=>{
      const response = await instance.get(`/post/userposts/${cookies.user.email}`);
      console.log(response.data)
      setUserPosts(response.data.reverse())
    }
    func()
  },[])
  
  return (
    <div className='userPosts' style={{display : "flex",minHeight : "90vh"}}>
    <div className="cardComp" style={{width : "70%"}}>
    {
      userPosts.map((elem)=>{
        return <CardComp elem={elem} key={elem.id}/>
      })
    }
      
    </div>
      <Sidebar/>
    </div>
  )
}

export default UserPosts