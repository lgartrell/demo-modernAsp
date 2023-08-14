import React from 'react';
import './Navbar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog, faUser, faRightFromBracket, faCalendar, faSquarePhone } from '@fortawesome/free-solid-svg-icons';

function Navbar(props) {

   return (
      <nav className='navbar'>

         <div className='leftNav'>
            <button id='btnSchedule' className='dashboard-button' title='Schedule an appointment'>
               <span className='scheduleIcon'>
                  <FontAwesomeIcon icon={faCalendar} />
               </span>
               Request Appointment
            </button>
            <span className='teleLink'>
               Need support?
               <div>
                  <FontAwesomeIcon icon={faSquarePhone} style={{ marginRight: '5px', color: 'green' }} />
                  <a href='tel:+123456789' title='Call us today!' style={{ textDecoration: 'none' }}>123-45678</a>
               </div>
            </span>

         </div>

         <div className='title'>
            SiteLogo
            <FontAwesomeIcon
               style={{ marginLeft: '3px' }}
               icon={faDog}
            />
         </div>

         <div className='rightNav'>
            <button id='btnProfile' className='dashboard-button' title='Open your profile'>
               <span className='profileIcon'>
                  <FontAwesomeIcon icon={faUser} />
               </span>
               <div className='profileInfo'>
                  <span>
                     Lucas Gartrell
                  </span>
                  <span>
                     Bird Owner
                  </span>
               </div>
            </button>
            <button id='btnLogout' className='dashboard-button' title='Sign out'>
               <span className='logoutIcon'>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span className='logoutText'>Sign Out</span>
               </span>
            </button>
         </div>

      </nav>
   );
}

export default Navbar;