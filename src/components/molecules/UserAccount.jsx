import React, { useEffect } from 'react'
import { useGetUserById } from '../../hooks/apis/query/useUserQuery'
import { useNavigate } from 'react-router-dom'

const UserAccount = ({id ,setProfileId,setopen}) => {
  
  console.log(id)
  const {GUByIdFn,GUByIdisFetching,GUByIdisFetched,GUByIdData,GUByIdisError}=useGetUserById(id);
  useEffect(()=>{
    GUByIdFn(id)
  },[])

  function handleClose(){
    setopen(false);
    setProfileId(null);
  }
  if(GUByIdisFetched && GUByIdData){
      console.log(GUByIdData);
    }
  return (
    <>
      { GUByIdisFetched && GUByIdData &&
        <div className="bg-white h-1/3 w-4/6 md:h-1/2 rounded-2xl shadow-lg md:w-3/6 p-4 ml-20 mb-4 mt-4 space-y-2 md:sticky top-4 relative border-2 border-black">
        <div className='flex md:gap-2 lg:gap-5 items-center border-2 border-black h-1/3 '>
          <img src={GUByIdData.avtar}   className='w-1/3 h-full md:h-auto rounded-md shadow-xl hover:border-2 cursor-pointer hover:border-blue-400 object-cover' />

          <h2 className='font-bold text-4xl'> {GUByIdData.username}</h2>
          <div className="text-sm text-gray-500 text-right">
            {new Date(GUByIdData.createdAt).toLocaleString()}
          </div>
        </div>
        <div className='h-2/3 w-full border-2 border-black'>
          <img src={GUByIdData.coverImage}   className='w-full h-full border-2 border-black  rounded-md shadow-xl cursor-pointer object-fill' />
        </div>
        <button
            onClick={handleClose}
        className="absolute -top-3 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow"
      >
        ✖
      </button>
      </div>
      }
    </>
  )
}

export default UserAccount