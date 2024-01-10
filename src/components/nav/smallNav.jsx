import React, {useState} from 'react';
import './nav.css';
import { links } from './link';
import { NavLink } from 'react-router-dom';

const SmallNav = () => {
  
  const [activeNav, setActiveNav] = useState('#');
  return (
    <nav className='Nav2'>
      {links.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        onClick={() => setActiveNav(link.path)}
        className={activeNav === link.path ? 'active2' : ''}
      >
        {link.icon}
      </NavLink>
    ))}
    </nav>
  );
};

export default SmallNav;
