//w1830501
// Sidebar component with navigation links and logout functionality

import { useEffect, useState, useContext } from 'react';
import './Sidebar.css';
import logo from '../../../LoginAssets/logo.png';
import { getNavigationLinks } from '../../Data/Data';
import useAuth from '../../../Hooks/useAuth';
import { SidebarContext } from '../Reducer/sidebarContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useLogout from '../../../Hooks/useLogout';

const Sidebar = ({ activeLinkIdx, setActiveLinkIdx }) => {
  const location = useLocation();
  const navigateTo = useNavigate();

  // Context and auth
  const { isSidebarOpen } = useContext(SidebarContext);
  const { auth } = useAuth();
  const userRoles = auth?.roles || [];

  // State for sidebar and dropdowns
  const [sidebarClass, setSidebarClass] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Get navigation links based on user roles
  const navigationLinks = getNavigationLinks(userRoles);

  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigateTo('/');
  };

  // Toggle sidebar open/close styles
  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  // Highlight current active link based on route
  useEffect(() => {
    const currentLink = navigationLinks.find(link => link.path === location.pathname);
    if (currentLink) {
      setActiveLinkIdx(currentLink.id);
    }
  }, [location, setActiveLinkIdx]);

  const toggleSettings = () => {
    setIsSettingsOpen(prev => !prev);
  };

  return (
    <div className={`sidebar ${sidebarClass}`}>
      {/* Logo */}
      <div className="user-info">
        <div className='info-img img-fit-cover'>
          <img src={logo} alt='Logo Image' />
        </div>
      </div>

      {/* Navigation */}
      <nav className='navigation'>
        <ul className="nav-list">
          {navigationLinks.map(({ id, title, image, path }) => (
            <li className="nav-item" key={id}>
              {title === 'Settings' ? (
                <div>
                  <button className="nav-link" onClick={toggleSettings}>
                    <span className="nav-link-icon">{image}</span>
                    <span className="nav-link-text">{title}</span>
                  </button>
                  {isSettingsOpen && (
                    <ul className="nav-list">
                      <li className="nav-item">
                        <div className="nav-link">
                          <button onClick={signOut}>Sign out</button>
                        </div>
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
};

export default Sidebar;
