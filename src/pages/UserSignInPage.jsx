import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useUserSignIn } from '../hooks/apis/mutation/useUserMutationHook';
import { useNavigate } from 'react-router-dom';

const UserSignInPage = () => {
    const navigate =useNavigate();
    const [formData ,setFormData]=useState({
        password: '',
        username: '',
      });
    
    
    const {signInUser,signInIsError ,signInIsSuccess,signInData,signInError} = useUserSignIn()

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:[e.target.value]})
    }

    const handleClick =()=>{
        navigate('/SignUp');
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        
        const data=new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
          });
        signInUser(data);
    }

    useEffect(() => {
        if (signInIsSuccess) {
          toast.success('Sign In successful!');
          setTimeout(() => {
            navigate('/logout');
          }, 2000); 
        } else if (signInIsError) {
          toast.error('Error in Sign In');
        }
      }, [signInIsError, signInIsSuccess]);
    
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
      <form  onSubmit={handleSubmit} className="flex flex-1 h-1/2 flex-col justify-center gap-4 max-w-md md:h-full mx-auto p-6 bg-white ">
      
        <div className='flex-col gap-3 mb-7 justify-center'>
          <img className="h-[60px]" src="https://image.ibb.co/d0hbJ9/twt_icon.png" alt="bird"/>
          <h2 className="text-3xl font-bold mb-2 ">See what’s happening in the world right now</h2>
        </div>
        <h2 className='text-2xl font-bold'>Join Twitter today.</h2>
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
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded-full"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-[#1da1f2] hover:bg-[#0683d0] text-white  p-2 rounded-full">
          Log In
        </button>
        <button onClick={handleClick} className=" text-[#1da1f2] border-2 border-[#1da1f2] hover:text-[#0683d0] hover:border-[#0683d0] p-2 rounded-full">
          Sign Up
        </button>
        <ToastContainer position='top-center'/>
      </form>

    </div>
  </>
  )
}

export default UserSignInPage 