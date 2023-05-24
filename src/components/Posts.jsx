import React, { useContext } from 'react'
import "../styles/Posts.css"
import CardComp from './CardComp'
import { AppContext } from "../Context";

const Posts = () => {

  const { allPosts } = useContext(AppContext);

  return (
    <div className="posts">
    {
      allPosts ?
      allPosts.map((elem)=>{
      return <CardComp elem={elem} key={elem._id}/>
      })
      : <h1>Something Went Wrong</h1>
    }
    </div>
  )
}

export default Posts