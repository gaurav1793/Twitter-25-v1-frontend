import React, { useRef, useState } from 'react'
import { useUserSignUp } from '../hooks/apis/mutation/useUserMutationHook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { CiImageOn } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";

const UserSignUpPage = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [pic, setPic] = useState(null);
  const [img, setImg] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [coverPicimg, setCoverPicImg] = useState(null)
  const inputcoverPicRef = useRef(null);
  const { createUser, isError, isPending, isSuccess } = useUserSignUp();
  const navigate = useNavigate();

  const inputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleClick = () => {
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('avtar', img);

    data.append('coverImage', coverPicimg);


    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    createUser(data);


    if (isPending) {
      toast.info("waiting for server")
    }
    if(isSuccess) {
      toast.success("Sign Up success")
        navigate('/')
    }
    if (isError) {
      toast.error("error in Sign Up")
    }
  };

  return (
    <>
      <div className='min-h-screen w-full flex flex-col-reverse  md:flex-row overflow-y-hidden'>
        <div className=' bg-[#1da1f2] w-full h-1/2 md:h-full md:max-w-[50%] flex flex-1 justify-center items-center'>
          <div className='max-w-md max-h-md   h-[430px] w-[400px]  text-white md:text-2xl flex flex-col justify-center gap-4 '>
            <div className='flex gap-4  items-center '>
              <img className="h-[38px]" src='https://image.ibb.co/bzvrkp/search_icon.png' />
              <p>Follow your interests.</p>
            </div>
            <div className='flex gap-4  items-center '>
              <img className="h-[40px]" src="https://image.ibb.co/mZPTWU/heart_icon.png" />
              <p>Hear what people are talking about.</p>
            </div>
            <div className='flex gap-4  items-center '>
              <img className="h-[40px]" src="https://image.ibb.co/kw2Ad9/conv_icon.png" />
              <p>Join the conversation.</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-1 h-1/2  flex-col mt-5 justify-center gap-4 max-w-md md:h-full mx-auto p-6 bg-white ">

          <div className='flex justify-between items-center '>
            <img className="h-[60px]" src="https://image.ibb.co/d0hbJ9/twt_icon.png" alt="bird" />
            <h2 className="text-3xl font-bold mb-2 text-center">Sign Up</h2>
          </div>
          <input
            type='text'
            name='username'
            placeholder='Username'
            className="p-2 border rounded-full"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 border rounded-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 border rounded-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className=" flex  items-center gap-5  rounded-lg">
            <h4 className='text-xs text-gray-400 pl-2'>Add Avtar</h4>
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
          <div className=" flex  items-center gap-5 rounded-lg ">
            <h4 className='text-xs text-gray-400 pl-2'>Add Cover</h4>
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
          <button type="submit" className="bg-[#1da1f2] hover:bg-[#0683d0] text-white  p-2 rounded-full">
            Sign Up
          </button>
          <button onClick={handleClick} className=" text-[#1da1f2] border-2 border-[#1da1f2] hover:text-[#0683d0] hover:border-[#0683d0] p-2 rounded-full">
            Log In
          </button>
          <ToastContainer position='top-center' />
        </form>

      </div>
    </>
  )
}

export default UserSignUpPage