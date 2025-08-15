"use client";

//Fetched using the tanStack Query

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import fetchPost from "../lib/api";

const FetchNew = () => {

  const[pageNumber,setPageNumber]=useState(1);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts",pageNumber], // like useState for caching
    queryFn:()=> fetchPost(pageNumber), // like useEffect for fetching
    //staleTime:10000, //This it will go stale after 5s which means till the time data remains fresh the data from server wont be fetched , it will be fetched from cache.
   // refetchInterval:1000, We can use either staleTime or refetchInterval
   //refetchIntervalBackground:true, by default it's but making it true will allow to refetch in the background also.
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
    <button onClick={()=>setPageNumber(prev=>prev-1)}>Prev</button>
    <p>{pageNumber}</p>
    <button onClick={()=>setPageNumber(prev=>prev+1)}>Next</button>
    </div>

    <div>
      {data?.map((curElem) => (
        <div
          key={curElem.id}
          className="w-auto h-auto p-2 border border-amber-100 rounded-2xl flex flex-col gap-2 my-4"
        >
          
          <p className="text-2xl text-amber-700">{curElem.title}</p>
          <p>{curElem.body}</p>
          
        </div>
      ))}
    </div>

    </>
  );
};

export default FetchNew;
