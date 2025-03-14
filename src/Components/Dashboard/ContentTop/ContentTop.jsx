import React, { useContext } from 'react'
import './ContentTop.css'
import { SidebarContext } from '../Reducer/sidebarContext';
import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import {Link, useNavigate} from 'react-router-dom';


const ContentTop = () => {

    const { toggleSidebar } = useContext(SidebarContext);

    return (
        <div className='main-content-top'>
            <div className='content-top-left'>
                <button type="button" className='sidebar-toggler' onClick={() => toggleSidebar() }>
                   <FaBars />
                </button>
                <Link to={'/homepage'}>
                <h3 className='content-top-title'>Home</h3>
                </Link>
            </div>
            <div className='content-top-btns'>
                <button type='button' className='search-btn content-top-btn'>
                  <FiSearch />
                </button>
                <button className='notification-btn content-top-btn'>
                 <FiBell />
                </button>
            </div>
         
        </div>
    );
}

export default ContentTop
