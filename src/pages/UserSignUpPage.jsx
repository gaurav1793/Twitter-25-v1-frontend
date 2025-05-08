import React, { useState } from 'react'
import { useUserSignUp } from '../hooks/apis/mutation/useUserSignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const UserSignUpPage = () => {

  const [formData ,setFormData]=useState({
    email: '',
    password: '',
    username: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImages, setCoverImages] = useState([]);
  const {createUser ,isError,isPending,isSuccess} = useUserSignUp();

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImages(Array.from(e.target.files));
  };

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
    }
    else{
      toast.error("error in Sign Up")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        
        <div className='flex justify-between items-center '>
          <img className="h-[60px]" src="https://image.ibb.co/d0hbJ9/twt_icon.png" alt="bird"/>
          <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
        </div>
        <input
            type='text'
            name='username'
            placeholder='Username'
            className="p-2 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
        />
        <input 
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded"
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
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Sign Up
        </button>
        <ToastContainer position='top-center'/>
    </form>
  )
}

export default UserSignUpPage