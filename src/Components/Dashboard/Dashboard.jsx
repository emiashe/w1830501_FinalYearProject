import React from 'react';
import { useEffect, useState } from 'react';
import '../../App.css'
import Sidebar from './Sidebar/Sidebar';




const Dashboard = () => {

    const [activeLinkIdx, setActiveLinkIdx] = useState(1);
    return (
    <div >
        
        <Sidebar activeLinkIdx={activeLinkIdx} setActiveLinkIdx={setActiveLinkIdx}/>
        

       
    </div>
    )
};

export default Dashboard