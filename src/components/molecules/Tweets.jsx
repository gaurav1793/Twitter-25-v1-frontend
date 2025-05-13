import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdHeart } from "react-icons/io";
import { useUserProfileStore } from '../../store/useUserProfileStore';


const Tweets = ({tweet,deleteTweet,showP}) => {
    const [vid,setVid]=useState('');
    const [pic,setPic]=useState('');
    const {userProfile}=useUserProfileStore()

    useEffect(() => {
        const ext = tweet.img?.split('.').pop()?.toLowerCase();
        const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'];

        if (videoExts.includes(ext)) {
            setVid(tweet.img);
        } else{
            setPic(tweet.img);
        }
        }, [tweet.img]);


        function handleHeart(e){
            if(e.target.style.color!='red'){
                e.target.style.color='red'
            }
            else{
                e.target.style.color='gray'
            } 
        }
        function handleDelete(){
            console.log(tweet._id);
            if(userProfile.userId===tweet.userId){
                deleteTweet(tweet._id);
            }  
        }
  return (
    <>
    {
        
        <div className="bg-white rounded-2xl shadow-lg w-4/6 p-4 ml-20 mb-4 mt-4 flex gap-4 ">

        <div className='w-1/4 h-1/4'>
            <div>
                {
                    <img src={tweet.avtar} alt='no img' data-userid={tweet.userId} onClick={showP} className='h-full rounded-md border-2 border-black shadow-xl hover:border-2 cursor-pointer hover:border-blue-400 object-cover'/>
                
                }
            </div>
        </div>
        <div className='w-3/4 h-3/4'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl'> {tweet.username}</h2>
                <div className="text-sm text-gray-500 text-right">
                {new Date(tweet.createdAt).toLocaleString()}
                </div>
            </div>
            <p className="text-gray-800 text-base mb-3">{tweet.body}</p>

        {pic && (
            <div className="rounded-xl overflow-hidden mb-3">
            <img src={pic} alt="tweet" className="w-full h-auto object-cover" />
            </div>
        )}
        {vid && (
            <div className="rounded-xl overflow-hidden mb-3">
            <video src={vid} disablePictureInPicture controlsList="nodownload nofullscreen "  controls className="w-full h-auto object-cover" />
            </div>
        )}
        <div className='flex gap-3 items-center'>
            {userProfile.userId===tweet.userId &&<RiDeleteBin6Line onClick={handleDelete} className='cursor-pointer text-gray'/>}
            <IoMdHeart className='text-gray-500' onClick={handleHeart}/>
        </div>
        </div>
        </div>
            }
    </>

  )
}

export default Tweets