import React, { useEffect, useState } from 'react'
import { useUserLogOut } from '../hooks/apis/mutation/useUserMutationHook'
import { useUserGetProfile } from '../hooks/apis/query/useUserQuery';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import TweetsList from '../components/organism/tweetsList';
import { useUserProfileStore } from '../store/useUserProfileStore';
import TweetInput from '../components/molecules/TweetInput';
import { useCreateTweetHook } from '../hooks/apis/mutation/useTweetsMutationHook';
import { useGetAllTweetHook } from '../hooks/apis/query/useTweetQueryHook';


const UserHome = () => {
  const  {LogOutUser ,logOutisError ,logOutIsSuccess} = useUserLogOut();
  const navigate =useNavigate();
  const [dropMenu,setDropMenu]=useState(false);
  const {userProfile}=useUserProfileStore();
  const { createTweetFn,CTisError,CTisPending,CTisSuccess,CTdata} =useCreateTweetHook();
  const {isFetching,isFetched,isError,AllTweets ,getAllTweetsError,getTweetList} = useGetAllTweetHook()

  const handleLogout =()=>{
    LogOutUser();
  }

  useEffect(()=>{
    if(logOutIsSuccess){
      toast.success('logOut Success !!');
      toast.info("moving to SignIn page !!");
      setTimeout(()=>{
        navigate('/');
      },2000)
    }  
    if(CTisSuccess && CTdata){
      toast.success('Tweet Created Success !!');
      setTimeout(()=>{
        getTweetList();
      },2000)
    }
  },[logOutIsSuccess,CTisSuccess,CTdata])

  const handleDropMenu=(e)=>{
    setDropMenu(true);
  }

  if(userProfile==null){
    return <div>
      {console.log(userProfile)}
      loading.....
    </div>
  }

  return (
    <>
    {   userProfile &&<div className='flex flex-col h-screen w-full relative overflow-hidden'>
      <div className='container max-h-16 w-full bg-white py-4 px-12  flex justify-between items-center sticky top-0'>
      <div className='text-2xl font-bold text-black'>Twitter clone</div>
      <div className='w-14 h-14 relative'>
        <img onClick={handleDropMenu} className='h-full w-full object-cover  rounded-full cursor-pointer' src={userProfile.userAvtar}/>
        {
          dropMenu && <div className=' absolute top-full -right-3 h-[40px] w-[70px] shadow-md border border-gray-100 rounded-lg  bg-white text-grey-500 hover:text-blue-600 hover:border-blue-500 z-50' onMouseLeave={()=>{
            setDropMenu(false);
          }}>
            <button onClick={handleLogout} className='h-full w-full'>logout</button>
            <ToastContainer position='top-center'/>
          </div>
        }
      </div>
    </div>
    <div className='bg-[#e2e8f0] h-full w-full md:flex overflow-auto'>
      <TweetInput avtar={userProfile.userAvtar} username={userProfile.userName} createTweetFn={createTweetFn}/>
      <TweetsList isFetched={isFetched} isFetching={isFetching} getTweetList={getTweetList} AllTweets={AllTweets}/>
    </div>
    </div>}
    {/* <button onClick={handleLogout} className='h-[200px] w-[200px]'>logout</button>
    {userProfileIsSuccess && UserProfileData && (<div className='h-[500px] w-[500px] bg-black text-white'>
       {UserProfileData.avtar} hello bhai
      </div>)} */}
      <ToastContainer/>
    </>
  )
}

export default UserHome