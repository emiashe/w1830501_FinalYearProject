import { useEffect, useState } from 'react';
import './Sidebar.css'
import logo from '../../../LoginAssets/logo.png'
import { navigationLinks } from '../../Data/Data';
import { useContext } from 'react';
import { SidebarContext } from '../Reducer/sidebarContext';
import { Link, useLocation } from 'react-router-dom';


const Sidebar = ({ activeLinkIdx, setActiveLinkIdx }) => {

    const location = useLocation(); // Get the current path
    const [sidebarClass, setSidebarClass] = useState("");
    const { isSidebarOpen } = useContext(SidebarContext);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        if(isSidebarOpen){
          setSidebarClass('sidebar-change');
        } else {
          setSidebarClass('');
        }
      }, [isSidebarOpen]);


      // Update activeLinkIdx based on the current path
      useEffect(() => {
          const currentLink = navigationLinks.find((link) => link.path === location.pathname);
          if (currentLink) {
              setActiveLinkIdx(currentLink.id);
          }
      }, [location, setActiveLinkIdx]);

      const toggleSettings = () => {
        setIsSettingsOpen((prev) => !prev); // Toggle the dropdown
      };


    return (
        <div className={`sidebar ${sidebarClass}`}>
            <div className="user-info"> 
                <div className='info-img img-fit-cover'>
                <img src={logo} alt='Logo Image'/>
                </div>
                <span className='info-name'>emi ashe</span>
            </div>

            <nav className='navigation'>
            <ul className="nav-list">
          {navigationLinks.map(({ id, title, image, path }) => (
            <li className="nav-item" key={id}>
              {title === 'Settings' ? (
                <div>
                  <button className={`nav-link`} onClick={toggleSettings}>
                    <span className="nav-link-icon">{image}</span>
                    <span className="nav-link-text">{title}</span>
                  </button>
                  {isSettingsOpen && (
                    <ul className="nav-list">
                      <li className="nav-item">
                        <Link to="/" className="nav-link">
                          <span className="nav-link-text">Sign out</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link to={path} className={`nav-link ${id === activeLinkIdx ? 'active' : ''}`}>
                  <span className="nav-link-icon">{image}</span>
                  <span className="nav-link-text">{title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
            </nav>
         
        </div>
    );
}

export default Sidebar
