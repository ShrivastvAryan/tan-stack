"use client";

//Fetched using the tanStack Query

import React from "react";
import fetchPost from "../lib/api";
import { useQuery } from "@tanstack/react-query";

const FetchNew = () => {
  const getPostsData = async () => {
    try {
      const res = await fetchPost();
      if (res.status === 200) {
        return res.data; // ✅ return the data so React Query stores it
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"], // like useState for caching
    queryFn: getPostsData, // like useEffect for fetching
    staleTime:5000, //This it will go stale after 5s
  });

  if (isLoading) {
    return <p>Loading...</p>; // show loading state
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
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
  );
};

export default FetchNew;
