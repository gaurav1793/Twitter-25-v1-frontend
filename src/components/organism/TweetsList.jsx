import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Tweets from '../molecules/Tweets';
import { useNavigate } from 'react-router-dom';
import { UseTweetDelete } from '../../hooks/apis/mutation/useTweetsMutationHook';




const TweetsList = ({isFetching,isFetched,AllTweets,getTweetList,isError,getAllTweetsError,showP}) => {

    const navigate =useNavigate()
    const {DTisSuccess,DTisError,deleteTweet}=UseTweetDelete();
    
    useEffect(()=>{
        if(isError){
            toast.error(`some error occur redirecting to signIn page`)
            setTimeout(()=>{
                navigate('/')
            },2000)
        }
        getTweetList()
    },[AllTweets,isError,DTisSuccess])

    useEffect(()=>{
        if(DTisError){
            toast.error('some error occured try again after some time !!')
        }
    },[DTisError])
    
  return (
   <>
    { isFetched && AllTweets &&
        <div className='w-full h-full'>
            {[...AllTweets].reverse().map((tweet)=>{
               return <Tweets deleteTweet={deleteTweet} tweet={tweet} showP={showP} key={tweet._id}/>
            })}
            <ToastContainer/>
        </div>
        
    }
    <ToastContainer/>
   </>
  )
}

export default TweetsList