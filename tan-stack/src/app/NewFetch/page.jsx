"use client";

//Fetched using the tanStack Query

import React from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import fetchPost from "../lib/api";
import { deletePost } from "../lib/api";
import { updatePost } from "../lib/api";

const FetchNew = () => {

  const[pageNumber,setPageNumber]=useState(1);
  const queryClient=useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts",pageNumber], // like useState for caching
    queryFn:()=> fetchPost(pageNumber), // like useEffect for fetching
    placeholderData:keepPreviousData, //This will avoid showing loading text which makes page better
    //staleTime:10000, //This it will go stale after 5s which means till the time data remains fresh the data from server wont be fetched , it will be fetched from cache.
   // refetchInterval:1000, We can use either staleTime or refetchInterval
   //refetchIntervalBackground:true, by default it's but making it true will allow to refetch in the background also.
  });


  //mutation function to delete post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id !== id);
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      console.log(apiData, postId);

      queryClient.setQueryData(["posts", pageNumber], (postsData) => {
        return postsData?.map((curPost) => {
          return curPost.id === postId
            ? { ...curPost, title: apiData.data.title }
            : curPost;
        });
      });
    },
  });

  if (isLoading) {
    return <p>Loading...</p>; // show loading state
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (

    <>
    <div className="flex gap-4 p-4">
    <button disabled={pageNumber===1 ? true:false} onClick={()=>setPageNumber(prev=>prev-3)}>Prev</button>
    <p>{(pageNumber/3)}</p>
    <button onClick={()=>setPageNumber(prev=>prev+3)}>Next</button>
    </div>

    <div>
      {data?.map((curElem) => (
        <div
          key={curElem.id}
          className="w-auto h-auto p-2 border border-amber-100 rounded-2xl flex flex-col gap-2 my-4"
        >
          
          <p className="text-2xl text-amber-700">{curElem.title}</p>
          <p>{curElem.body}</p>
          <button onClick={()=>deleteMutation.mutate(curElem.id)}>Delete</button>
          <button onClick={() => updateMutation.mutate(curElem.id)}>Update</button>
          
        </div>
      ))}
    </div>

    </>
  );
};

export default FetchNew;
