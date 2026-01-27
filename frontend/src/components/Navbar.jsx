import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets"
import { NavLink, useNavigate } from 'react-router'
import { AppContext } from '../context/AppContext'
function Navbar() {
    const navigate=useNavigate()
    const[showMenu,setshowmenu]=useState(false)
    const[showProfile,setShowProfile]=useState(false)
    
    const{token,setToken,userData}=useContext(AppContext)

    const logout=()=>{
      setToken(false)
      localStorage.removeItem('token')
    }
    
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
        <img src={assets.logo} >
        </img>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to="/">
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary  w-3/5 m-auto hidden'/>
            </NavLink>
             <NavLink to="/doctors">
                <li className='py-1'>All Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-primary  w-3/5 m-auto hidden'/>
            </NavLink>
             <NavLink to="/about">
                <li className='py-1'>About</li>
                <hr className='border-none outline-none h-0.5 bg-primary  w-3/5 m-auto hidden'/>
            </NavLink>
             <NavLink to="/contact">
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary  w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token&& userData
               ?<div className='flex items-center gap-2 cursor-pointer group relative'>
    <img className='w-8 rounded-full' src={userData.image}
    onClick={() => setShowProfile(prev => !prev)}
    />
    <img className='w-2.5 hidden md:block' src={assets.dropdown_icon}/>
    <div className={`absolute top-12 right-0 text-base font-medium text-gray-600 z-20 ${showProfile ? 'block' : 'hidden'} md:group-hover:block`}>
        <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
            <p onClick={()=>{navigate('my-profile'); setShowProfile(false)}} className='hover:text-black cursor-pointer'>My profile</p>
            <p onClick={()=>{navigate('my-appointment'); setShowProfile(false)}} className='hover:text-black cursor-pointer'>my Appointment</p>
            <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
        </div>
    </div>
</div>
                :<button  onClick={()=>navigate('/login')} className='bg-blue-800 text-white px-8 py-3 rounded-full font-light hidden md:block' >create Account</button>
            }
            <img onClick={()=>setshowmenu(true)}className='w-6 md:hidden' src={assets.menu_icon}/>
            {/* mobile menu*/ }
   <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
  <div className='flex items-center justify-between px-5 py-6'>
    <img className='w-36' src={assets.logo} alt="" />
    <img className='w-7' onClick={() => setshowmenu(false)} src={assets.cross_icon} alt="" />
  </div>
  <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
    <NavLink onClick={() => setshowmenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
    <NavLink onClick={() => setshowmenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
    <NavLink onClick={() => setshowmenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
    <NavLink onClick={() => setshowmenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
  </ul>
</div>
        </div>
        
    </div>
  )
}

export default Navbar