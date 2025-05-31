import React, { useEffect, useRef, useState } from 'react'
import { useGetUserById } from '../../hooks/apis/query/useUserQuery'
import { CiImageOn } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";

import { useUpdateUser } from '../../hooks/apis/mutation/useUserMutationHook';



const UserAccount = ({ id, setProfileId, setopen ,UpdateTweetisSuccess,UpdateTweet,setUserProfile}) => {
  const [newName, setNewName] = useState('');
  const [change, setChange] = useState(false);
  const inputRef = useRef(null);
  const [pic, setPic] = useState(null);
  const [img, setImg] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [coverPicimg, setCoverPicImg] = useState(null)
  const inputcoverPicRef = useRef(null);
  const {UpdateUser,UpdateUserisError,UpdateUserisSuccess,UpdateUserData,UpdateUserError,isPending}=useUpdateUser()



  console.log(id)
  const { GUByIdFn, GUByIdisFetching, GUByIdisFetched, GUByIdData, GUByIdisError } = useGetUserById(id);
  
  useEffect(() => {
    if(UpdateUserisSuccess)
    {
    console.log("m chl rha hu bhai ",UpdateUserData);
    //  const username=UpdateUserData.username;
    // const avtar=UpdateUserData.avtar;
    // const coverImage=UpdateUserData.coverImage;
    // const email=UpdateUserData.email;
    // const _id=UpdateUserData._id;
    setUserProfile(UpdateUserData.username,UpdateUserData.avtar,UpdateUserData.coverImage,UpdateUserData.email,UpdateUserData._id);
  }
  console.log("updateuser wala chl rha hu")
    GUByIdFn(id);
  }, [UpdateUserisSuccess,UpdateUserData])

  // useEffect(()=>{
  //   console.log("nhi chl rha kya")
  //   if(GUByIdisFetched&&GUByIdData){
  //     console.log("useeffect",GUByIdData)
  //   }
    
  //   // const username=GUByIdData.username;
  //   // const avtar=GUByIdData.avtar;
  //   // const coverImage=GUByIdData.coverImage;
  //   // const email=GUByIdData.email;
  //   // const _id=GUByIdData._id;
  //   // setUserProfile(username,avtar,coverImage,email,_id)
  // },[GUByIdisFetched , GUByIdData ])

  function handleClose() {
    setopen(false);
    setProfileId(null);
  }
  function handleImg(e) {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setPic(imgUrl);
    }
    setImg(e.target.files[0]);
  }
  function handleCoverImg(e) {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setCoverPic(imgUrl);
    }
    setCoverPicImg(e.target.files[0]);
  }

  function handleSettings(){
    setChange(!change);
  }

  function handleSave(){
    const data= new FormData();
    
    if(newName.length>0){
      data.append('username',newName);
    }
    else{
      data.append('username',GUByIdData.username)
    }
    if(img!=null){
      data.append('avtar',img);
    }
    else{
      data.append('avtar',GUByIdData.avtar)
    }
    if(coverPicimg!=null){
      data.append('coverImage',coverPicimg);
    }
    else{
      data.append('coverImage',GUByIdData.coverImage)
    }

    data.append('id',GUByIdData._id)

    //for tweet api
    const data1 =new FormData();
    for (const [key, value] of data.entries()) {
      data1.append(key, value);
    }
    data1.delete('coverImage');

    UpdateTweet(data1);
    
    setTimeout(() => {
      UpdateUser(data);
    }, 1000);

    setNewName('');
    setImg(null);
    setCoverPicImg(null);
    setCoverPic(null);
    setPic(null);
    setChange(false);
  }

  if (GUByIdisFetched && GUByIdData) {
    console.log(GUByIdData);
  }
  return (
    <>
      {GUByIdisFetched && GUByIdData &&
        <div className="bg-white h-1/3 w-4/6 md:h-1/2 rounded-2xl shadow-xl md:w-3/6 p-4 ml-20 mb-4 mt-4 space-y-2 md:sticky top-4 relative ">
          <div className='flex md:gap-2 md:flex-col lg:gap-5 lg:flex-row items-center  h-1/3 '>
            <img src={GUByIdData.avtar} className='w-1/3 h-full md:h-auto rounded-md shadow-xl hover:border-2 cursor-pointer hover:border-blue-400 object-cover' />

            <h2 className='font-bold  text-xl md:text-2xl'> {GUByIdData.username}</h2>
            <div className="text-sm text-gray-500 text-right">
              {new Date(GUByIdData.createdAt).toLocaleString()}
            </div>
          </div>
          <div className='h-2/3 w-full '>
            <img src={GUByIdData.coverImage} className='w-full h-full   rounded-md shadow-xl cursor-pointer object-fill' />
          </div>
          <button
            onClick={handleClose}
            className="absolute -top-3 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow"
          >
            ✖
          </button>
          <button
            onClick={handleSettings}
            className="absolute top-4 -right-2 bg-black text-gray-700 hover:bg-gray-200 rounded-full w-5 h-5 text-xs flex items-center justify-center shadow"
          >
            ⚙️
          </button>
          {
            change &&
            <div className=' bg-[#e2e8f0]  rounded-lg h-2/3 w-2/6 p-2 absolute top-7 right-1 shadow-xl shadow-slate-300 '>
              <div className=' h-1/3 w-3/3 flex flex-col justify-center items-center  rounded-lg shadow-xl '>
                <h2 className='font-bold text-xl'>Settings</h2>
                  <input placeholder='New Name' value={newName}onChange={(e)=>{setNewName(e.target.value)}} className='h-1/2 w-full rounded-lg'
                   />
                  
              </div>
              <div className="h-1/3 flex justify-between items-center shadow-xl rounded-lg">
                <label className="cursor-pointer">
                  <FaUserCircle color="gray" className="h-7 w-7 md:h-8 md:w-8" />
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleImg}
                    className="hidden"
                  />
                </label>

                {pic && (
                  <div className='relative'>
                    <img
                      src={pic}
                      alt="Preview"
                      className="h-20 w-20 object-contain  rounded-md  mr-4"
                    />
                    <button
                      onClick={() => {
                        setImg(null);
                        setPic(null);
                        if (inputRef.current) {
                          inputRef.current.value = null
                        }
                      }}
                      className="absolute top-2 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow"
                    >
                      ✖
                    </button>
                  </div>
                )}

              </div>
              <div className="h-1/3 flex justify-between items-center shadow-xl rounded-lg ">
                <label className="cursor-pointer">
                  <CiImageOn color="gray" className="h-7 w-7 md:h-8 md:w-8" />
                  <input
                    ref={inputcoverPicRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleCoverImg}
                    className="hidden"
                  />
                </label>

                {coverPic && (
                  <div className='relative'>
                    <img
                      src={coverPic}
                      alt="Preview"
                      className="h-20 w-20 object-contain  rounded-md  mr-4"
                    />

                    <button
                      onClick={() => {
                        setCoverPicImg(null);
                        setCoverPic(null);
                        if (inputcoverPicRef.current) {
                          inputcoverPicRef.current.value = null
                        }
                      }}
                      className="absolute top-2 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow"
                    >
                      ✖
                    </button>
                  </div>
                )}

              </div>
               <button
            onClick={handleSave}
            className=" bg-green-400 text-black hover:bg-green-600 rounded-lg w-10 h-7 text-xs flex items-center justify-center shadow-xl"
          >
            save
          </button>
            </div>
          }
        </div>
      }
    </>
  )
}

export default UserAccount