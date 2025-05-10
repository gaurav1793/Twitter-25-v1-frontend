import React, { useEffect, useState } from 'react'
import { useGetAllTweetHook } from '../../hooks/apis/query/useTweetQueryHook';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Tweets from '../molecules/tweets';



const TweetsList = ({isFetching,isFetched,AllTweets,getTweetList}) => {

    
    useEffect(()=>{
        getTweetList()
    },[AllTweets])

    if(isFetching){
        return <div>
            Loading...
        </div>
    }
    
  return (
   <>
    { isFetched && AllTweets &&
        <div className='w-full h-full'>
            {AllTweets.map((tweet)=>{
               return <Tweets tweet={tweet} key={tweet._id}/>
            })}
            <ToastContainer/>
        </div>
    }
   </>
  )
}

export default TweetsList