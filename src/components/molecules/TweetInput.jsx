import React, { useRef, useState } from 'react'
import { CiImageOn } from "react-icons/ci";

const TweetInput = ({avtar,username,createTweetFn,userId,showP}) => {
    const [body,setBody]=useState('')
    const [img,setImg]=useState(null)
    const [pic,setPic]=useState(null)
    const inputRef = useRef(null);

    function handleImg(e){
        console.log(e.target.files[0])
        const file = e.target.files[0];
        if (file) {
        const imgUrl = URL.createObjectURL(file);
        setPic(imgUrl);
        }
        setImg(e.target.files[0]);
    }
    function handleClick(){
        const data =new FormData()
        data.append('img',img);
        data.append('username',username);
        data.append('avtar',avtar);
        data.append('body',body);
        data.append('userId',userId);
        createTweetFn(data);
        setBody('')
        setImg(null);
        setPic(null);
    }
  return (
    <> 
        <div className="bg-white h-1/3 w-4/6 md:h-1/2 rounded-2xl shadow-lg md:w-3/6 p-4 ml-20 mb-4 mt-4 space-y-2 md:sticky top-4">
            <div className='flex justify-between items-center  h-1/3 px-2'>
                <img src={avtar} data-userid={userId} onClick={showP} className='w-1/3 h-full md:border-2 md:border-black rounded-md shadow-xl hover:border-2 cursor-pointer hover:border-blue-400 object-cover'/>
                
                <h2 className='font-bold text-4xl'> {username}</h2>
            </div>
            <div className='h-1/3'>
                <textarea maxLength={670} value={body} onChange={(e)=>{setBody(e.target.value)}} placeholder="   What's happening..." className='max-h-[70px] h-[70px] md:max-h-[130px] md:min-h-[130px] w-full  overflow-auto rounded-md bg-[#e2e8f0]'/>
            </div>
            <div className="h-1/3 flex justify-between items-center">
        <label className="cursor-pointer">
          <CiImageOn color="gray" className="h-7 w-7 md:h-8 md:w-8" />
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
            if(inputRef.current){
                inputRef.current.value=null
            }
            }}
        className="absolute top-2 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow"
      >
        ✖
      </button>
          </div>
        )}

        <button
          onClick={handleClick}
          className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
        >
          Tweet
        </button>
            </div>
        </div>
    </>
  )
}

export default TweetInput