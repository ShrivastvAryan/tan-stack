//Old method of fetching the API Data without tanStack query

'use client'
import React from 'react'
import{useState,useEffect} from 'react'
import fetchPost from '../lib/api'

const FetchOld = () => {

  const[post,setPosts]=useState([])
  const[isLoading,setIsLoading]=useState(true);
  
  const getPostsData=async()=>{
    try {
      const res=await fetchPost()
      console.log(res);
      res.status===200? setPosts(res.data):[];
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      return [];
    }
  }

  useEffect(()=>{
    getPostsData()
  },[])

  return (
    <>
    <div>
      {isLoading?<p>is loading...</p>:<p></p>}
    </div>
    <div>

      {post?.map((curElem)=>{
        return(
          <div key={curElem.id} className='w-auto h-auto p-2 border border-amber-100 rounded-2xl flex flex-col gap-2 my-4'>
            <p className='text-2xl text-amber-700'>{curElem.title}</p>
            <p>{curElem.body}</p>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default FetchOld