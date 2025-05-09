import React, { useEffect, useState } from 'react'
import { useUserLogOut } from '../hooks/apis/mutation/useUserMutationHook'
import { useUserGetProfile } from '../hooks/apis/query/useUserQuery';
import { toast } from 'react-toastify/unstyled';
import { useNavigate } from 'react-router-dom';


const UserHome = () => {
  const  {LogOutUser ,logOutisError ,logOutIsSuccess} = useUserLogOut();
  const { userProfileIsSuccess,userProfileIsError,UserProfileData,userProfileIsLoading} = useUserGetProfile();
  const navigate =useNavigate();
  const [dropMenu,setDropMenu]=useState(false);

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
  },[logOutIsSuccess])

  const handleDropMenu=(e)=>{
    setDropMenu(true);
  }
  if(userProfileIsLoading){
    return <div>
      iloading.....
    </div>
  }
  return (
    <>
    { userProfileIsSuccess && UserProfileData &&<div className='flex flex-col min-h-screen w-full'>
      <div className='container max-h-16 w-full bg-white py-4 px-12  flex justify-between items-center'>
      <div className='text-2xl font-bold text-black'>Twitter clone</div>
      <div className='w-14 h-14 relative'>
        <img onClick={handleDropMenu} className='h-full w-full object-cover  rounded-full cursor-pointer' src={UserProfileData?.avtar}/>
        {
          dropMenu && <div className=' absolute top-full -right-3 h-[40px] w-[70px] shadow-md border border-gray-100 rounded-lg  bg-white text-grey-500 hover:text-blue-600 hover:border-blue-500 z-50' onMouseLeave={()=>{
            setDropMenu(false);
          }}>
            <button onClick={handleLogout} className='h-full w-full'>logout</button>
          </div>
        }
      </div>
    </div>
    <div className='bg-[#e2e8f0] h-full w-full'>heleo</div>
    </div>}
    {/* <button onClick={handleLogout} className='h-[200px] w-[200px]'>logout</button>
    {userProfileIsSuccess && UserProfileData && (<div className='h-[500px] w-[500px] bg-black text-white'>
       {UserProfileData.avtar} hello bhai
      </div>)} */}
    </>
  )
}

export default UserHome