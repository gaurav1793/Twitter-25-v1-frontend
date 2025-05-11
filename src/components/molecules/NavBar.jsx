import React from 'react'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const NavBar = ({dropMenu,setDropMenu,userAvtar,handleLogout,handleDropMenu}) => {

  return (
    <div className='container max-h-16 w-full bg-white py-4 px-12  flex justify-between items-center sticky top-0'>
      <div className='text-2xl font-bold text-black'>Twitter clone</div>
      <div className='w-14 h-14 relative'>
        <img onClick={handleDropMenu} className='h-full w-full object-cover hover:border-2 hover:border-blue-400  rounded-full cursor-pointer' src={userAvtar}/>
        {
          dropMenu && <div className=' absolute top-full -right-3 h-[40px] w-[70px] shadow-md border border-gray-100 rounded-lg  bg-white text-grey-500 hover:text-blue-600 hover:border-blue-500 z-50' onMouseLeave={()=>{
            setDropMenu(false);
          }}>
            <button onClick={handleLogout} className='h-full w-full'>logout</button>
            <ToastContainer position='top-center'/>
          </div>
        }
      </div>
      </div>
  )
}

export default NavBar