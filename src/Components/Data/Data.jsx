
import { HiAcademicCap } from 'react-icons/hi';
import question1 from './../../LoginAssets/question1.png';
import question3 from './../../LoginAssets/question3.png';
import github from './DataAssets/github.png';
import html from './DataAssets/html.png';
import css from './DataAssets/css.png';
import javascript from './DataAssets/javascript.png';

export const getNavigationLinks = (userRoles = []) => {
  const baseLinks = [
    { id: 1, title: 'Home', image: <HiAcademicCap />, path: '/homepage' },
    { id: 2, title: 'Courses', image: <HiAcademicCap />, path: '/coursespage' },
    { id: 4, title: 'Forum', image: <HiAcademicCap />, path: '/forumpage' },
    { id: 6, title: 'Feedback/Support', image: <HiAcademicCap />, path: '/supportpage' },
    { id: 8, title: 'Settings', image: <HiAcademicCap />, path: '/news' },
  ];

  const adminLink = {
    id: 7,
    title: 'Admin Page',
    image: <HiAcademicCap />,
    path: '/adminpage',
  };

  const hasAccess = userRoles.includes('Admin') || userRoles.includes('Editor');

  return hasAccess ? [...baseLinks, adminLink] : baseLinks;
};

