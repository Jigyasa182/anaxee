import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='bg-gray-800 text-white p-4'>
            <ul className='flex space-x-4'>
                <li><a href="#" className='hover:text-gray-300'>Welcome</a></li>
                <li><a href="#" className='hover:text-gray-300'>userName</a></li>
                <li><a href="#" className='hover:text-gray-300'>Logout</a></li>
            </ul>
        </nav>
    </div>
  )
}


export default Navbar
