import React, { useState } from 'react'
import { useUserSignUp } from '../hooks/apis/mutation/useUserMutationHook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';

const UserSignUpPage = () => {

  const [formData ,setFormData]=useState({
    email: '',
    password: '',
    username: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImages, setCoverImages] = useState([]);
  const {createUser ,isError,isPending,isSuccess} = useUserSignUp();
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImages(Array.from(e.target.files));
  };

  const handleClick =()=>{
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('avtar', avatar);

    coverImages.forEach((file) => {
      data.append('coverImage', file);
    });

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    createUser(data);
    

    if(isPending){
      toast.info("waiting for server")
    }
    else if(isSuccess){
      toast.success("Sign Up success")
      navigate('/')
    }
    else if(isError){
      toast.error("error in Sign Up")
    }
  };

  return (
    <>
      <div className='min-h-screen w-full flex flex-col-reverse  md:flex-row overflow-y-hidden'>
        <div className=' bg-[#1da1f2] w-full h-1/2 md:h-full md:max-w-[50%] flex flex-1 justify-center items-center'>
          <div className='max-w-md max-h-md   h-[430px] w-[400px]  text-white md:text-2xl flex flex-col justify-center gap-4 '>
            <div className='flex gap-4  items-center '>
              <img className="h-[38px]" src='https://image.ibb.co/bzvrkp/search_icon.png'/>
              <p>Follow your interests.</p>
            </div>
            <div className='flex gap-4  items-center '>
              <img className="h-[40px]" src="https://image.ibb.co/mZPTWU/heart_icon.png"/>
              <p>Hear what people are talking about.</p>
            </div>
            <div className='flex gap-4  items-center '>
              <img className="h-[40px]" src="https://image.ibb.co/kw2Ad9/conv_icon.png"/>
              <p>Join the conversation.</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-1 h-1/2 flex-col justify-center gap-4 max-w-md md:h-full mx-auto p-6 bg-white ">
          
          <div className='flex justify-between items-center '>
            <img className="h-[60px]" src="https://image.ibb.co/d0hbJ9/twt_icon.png" alt="bird"/>
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
          <div className='flex justify-around'>
            <h2 className="block mb-1 font-medium">Avtar</h2>
            <input type="file"  accept="image/*" required  onChange={handleAvatarChange} className=""/>
          </div>
          <div className='flex justify-around'>
            <h2 className="block mb-1 font-medium">CoverImage</h2>
            <input type="file" accept="image/*" onChange={handleCoverImageChange} className="block"/>
          </div>
          <button type="submit" className="bg-[#1da1f2] hover:bg-[#0683d0] text-white  p-2 rounded-full">
            Sign Up
          </button>
          <button onClick={handleClick} className=" text-[#1da1f2] border-2 border-[#1da1f2] hover:text-[#0683d0] hover:border-[#0683d0] p-2 rounded-full">
          Log In
        </button>
          <ToastContainer position='top-center'/>
        </form>

      </div>
    </>
  )
}

export default UserSignUpPage