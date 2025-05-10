import React, { useState } from 'react'
import { CiImageOn } from "react-icons/ci";

const TweetInput = ({avtar,username,createTweetFn}) => {
    const [body,setBody]=useState('')
    const [img,setImg]=useState(null)
    

    function handleImg(e){
        setImg(e.target.files[0]);
    }
    function handleClick(){
        const data =new FormData()
        data.append('img',img);
        data.append('username',username);
        data.append('avtar',avtar);
        data.append('body',body);
        createTweetFn(data);
        setBody('')
        setImg(null);
    }
  return (
    <> 
        <div className="bg-white h-1/3 w-4/6 md:h-1/2 rounded-2xl shadow-lg md:w-3/6 p-4 ml-20 mb-4 mt-4 space-y-2">
            <div className='flex justify-between items-center  h-1/3 px-2'>
                <img src={avtar} className='w-1/3 h-full md:h-auto rounded-md shadow-xl object-cover'/>
                
                <h2 className='font-bold text-4xl'> {username}</h2>
            </div>
            <div className='h-1/3'>
                <textarea maxLength={670} value={body}onChange={(e)=>{setBody(e.target.value)}} placeholder="   What's happening..." className='max-h-[70px] h-[70px] md:max-h-[140px] md:min-h-[140px] w-full  overflow-auto rounded-md bg-[#e2e8f0]'/>
            </div>
            <div className='flex items-end justify-between  h-1/3  pb-3'>
                <label className="cursor-pointer">
                    <CiImageOn color="gray" className="h-[40px] w-[50px]" />
                    <input type="file" accept="image/*,video/*" onChange={handleImg} className="hidden" />
                </label>
                <button onClick={handleClick} className=" bg-[#1da1f2] text-white p-2 rounded-lg">create Tweet</button>
            </div>
        </div>
    </>
  )
}

export default TweetInput