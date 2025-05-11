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
import NavBar from '../components/molecules/NavBar';


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
        getTweetList();
    }
  },[logOutIsSuccess,CTisSuccess,CTdata])

  

  if(userProfile==null){
    return <div>
      {console.log(userProfile)}
      loading.....
    </div>
  }
  const handleDropMenu=(e)=>{
    setDropMenu(true);
  }
  return (
    <>
    {   userProfile &&
    <div className='flex flex-col h-screen w-full relative overflow-hidden'>
      <NavBar userAvtar={userProfile.userAvtar} handleDropMenu={handleDropMenu} handleLogout={handleLogout} dropMenu={dropMenu} setDropMenu={setDropMenu} />
    <div className='bg-[#e2e8f0] h-full w-full md:flex overflow-auto'>
      <TweetInput avtar={userProfile.userAvtar} username={userProfile.userName} createTweetFn={createTweetFn}  userId={userProfile.userId}/>
      <TweetsList isFetched={isFetched} isFetching={isFetching} getTweetList={getTweetList} AllTweets={AllTweets} isError={isError} getAllTweetsError={getAllTweetsError}/>
    </div>
    </div>}
    <ToastContainer/>
    </>
  )
}

export default UserHome