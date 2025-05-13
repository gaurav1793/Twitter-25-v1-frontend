import React, { useEffect, useState } from 'react'
import { useUserLogOut } from '../hooks/apis/mutation/useUserMutationHook'
import { useUserGetProfile } from '../hooks/apis/query/useUserQuery';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import TweetsList from '../components/organism/tweetsList';
import { useUserProfileStore } from '../store/useUserProfileStore';
import TweetInput from '../components/molecules/TweetInput';
import { useCreateTweetHook, useUpdateTweet } from '../hooks/apis/mutation/useTweetsMutationHook';
import { useGetAllTweetHook } from '../hooks/apis/query/useTweetQueryHook';
import NavBar from '../components/molecules/NavBar';
import UserAccount from '../components/molecules/UserAccount';
import TweetIdByList from '../components/organism/TweetIdByList';


const UserHome = () => {
  const  {LogOutUser ,logOutisError ,logOutIsSuccess} = useUserLogOut();
  const navigate =useNavigate();
  const [dropMenu,setDropMenu]=useState(false);
  const [open,setopen]=useState(false)
  const [profileId,setProfileId]=useState(null)
  // const {userProfile,setUserProfile}=useUserProfileStore();
  const userProfile = useUserProfileStore((state) => state.userProfile); 
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

   const {UpdateTweet,UpdateTweetisError,UpdateTweetisSuccess,UpdateTweetError}=useUpdateTweet();

  const { createTweetFn,CTisError,CTisPending,CTisSuccess,CTdata} =useCreateTweetHook();
  const {isFetching,isFetched,isError,AllTweets ,getAllTweetsError,getTweetList} = useGetAllTweetHook()

  const handleLogout =()=>{
    LogOutUser();
  }

   useEffect(() => {
    console.log("User profile changed:", userProfile);
  }, [userProfile]);
  
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

  function showP(e){
    console.log(e.target.dataset.userid);
    const id=e.target.dataset.userid;
    setProfileId(id);
    setopen(!open);
  }
  return (
    <>
    {   userProfile &&
    <div className='flex flex-col h-screen w-full relative overflow-hidden'>
      <NavBar userAvtar={userProfile.userAvtar} handleDropMenu={handleDropMenu} handleLogout={handleLogout} dropMenu={dropMenu} setDropMenu={setDropMenu} />
    { open ?
      <div className='bg-[#e2e8f0] h-full w-full md:flex overflow-auto'>
      <UserAccount id={profileId} setUserProfile={setUserProfile} setopen={setopen} UpdateTweet={UpdateTweet} UpdateTweetisSuccess={UpdateTweetisSuccess} setProfileId={setProfileId}/>
      <TweetIdByList id={profileId} UpdateTweetisSuccess={UpdateTweetisSuccess}/>
    </div>
      :
      <div className='bg-[#e2e8f0] h-full w-full md:flex overflow-auto'>
      <TweetInput avtar={userProfile.userAvtar} username={userProfile.userName} createTweetFn={createTweetFn}  userId={userProfile.userId} showP={showP}/>
      <TweetsList isFetched={isFetched} isFetching={isFetching} getTweetList={getTweetList} AllTweets={AllTweets} isError={isError} getAllTweetsError={getAllTweetsError} showP={showP}/>
    </div>}
    </div>}
    <ToastContainer/>
    </>
  )
}

export default UserHome