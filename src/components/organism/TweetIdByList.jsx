import React, { useEffect } from 'react'
import { UseTweetDelete } from '../../hooks/apis/mutation/useTweetsMutationHook';
import { useGetAllTweetsByIdHook } from '../../hooks/apis/query/useTweetQueryHook';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';
import Tweets from '../molecules/tweets';

const TweetIdByList = ({id}) => {
    const {GTbyIdisFetching,GTbyIdisFetched,GTbyIdisError,data,GTbyIdError,gtFn}=useGetAllTweetsByIdHook(id);
    const {DTisSuccess,DTisError,deleteTweet}=UseTweetDelete();
    const navigate =useNavigate()
    console.log(id);
    // useEffect(()=>{
    //     if(GTbyIdisError){
    //         toast.error(`some error occur redirecting to signIn page`)
    //         // setTimeout(()=>{
    //         //     navigate('/logout')
    //         // },2000)
    //     }
    // },[data,GTbyIdisError,DTisSuccess])
    useEffect(()=>{
        console.log('first render');
        gtFn(id);
    },[DTisSuccess])
    useEffect(()=>{
        if(DTisError){
            toast.error('some error occured try again after some time !!')
        }
    },[DTisError])
  return (
    <>
     {console.log(data)}
    { GTbyIdisFetched && data &&
        
        <div className='w-full h-full'>
            { data.length>0 &&[...data].reverse().map((tweet)=>{
               return <Tweets deleteTweet={deleteTweet} tweet={tweet} key={tweet._id}/>
            })}
            <ToastContainer/>
        </div>
        
    }
    <ToastContainer/>
   </>
  )
}

export default TweetIdByList