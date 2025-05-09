import React from 'react'
import { useUserLogOut } from '../hooks/apis/mutation/useUserMutationHook'
import { useUserGetProfile } from '../hooks/apis/query/useUserQuery';


const UserHome = () => {
  const  {LogOutUser ,isError ,isSuccess,UserProfile,error} = useUserLogOut();
  const { } = useUserGetProfile();
  const handleLogout =()=>{
    LogOutUser();

    if(isSuccess){
      console.log("succes in loginf out")
    }
  }
  return (
    <>
    hello
    <button onClick={handleLogout} className='h-[200px] w-[200px]'>logout</button>
    {isSuccess && UserProfile && <div>
       here is profile
      </div>}
    </>
  )
}

export default UserHome