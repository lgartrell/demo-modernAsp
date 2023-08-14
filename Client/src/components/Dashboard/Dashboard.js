import './Dashboard.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component imports
import { Calendar } from 'primereact/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog, faUser } from '@fortawesome/free-solid-svg-icons';

import toast, { Toaster } from 'react-hot-toast';

function Dashboard(props) {
   const [date, setDate] = useState(new Date());

   const formatDate = (date) => {
      return date.toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });
   }

   const formattedDate = formatDate(date);

   const [appointments, setAppointments] = useState([]);
   const requestAppointments = () => {
      console.log('retrieving appointments from the server...')
      axios
         .get('https://localhost:7007/api/appointments/demo-data')
         .then(res => {
            setAppointments(res.data);
            console.log('result from request: ', res);
         }).catch(errorRes => {
            console.log('Something went wrong retrieving appointment data, ', errorRes);
         });
   }

   let hasLoaded = false;
   // Runs every time the dom tree reloads
   useEffect(() => {
      if (!hasLoaded) {
         requestAppointments();
      }

      hasLoaded = true;
   }, []); // empty [] is equivalent to the class-based componentDidMount

   const [currentAppointment, setCurrentAppointment] = useState();
   const getAppointmentByDate = (date) => appointments.find(appt => formatDate(new Date(appt.requestedDateTimeOffset)) == formatDate(date));

   // Runs every time the date state obj changes
   useEffect(() => setCurrentAppointment(getAppointmentByDate(date)), [date]);

   const getAppointmentInfo = () => {
      return (
         <>
            {currentAppointment === undefined
               ?
               <div>
                  <h3>No Appointment Found</h3>
               </div>
               :
               <div>
                  <h3>Appointment Found!</h3>
                  <h5><span className='no-text-shadow'>Created on: </span> {formatDate(new Date(currentAppointment.createDateTime))}</h5>
                  <h5><span className='no-text-shadow'>Client: </span> {currentAppointment.user.lastName}, {currentAppointment.user.firstName}</h5>
                  <h5><span className='no-text-shadow'>Pet: </span> {currentAppointment.animal.firstName}, {currentAppointment.animal.breed}</h5>

                  <div class='apptBtnRow'>
                     <button
                        id='RescheduleBtn'
                        className='dashboard-button'
                        title='Send reschedule appoint request'
                        onClick={() => {
                           toast('Appointment Reschedule Request Sent!', {
                              position: 'top-center',
                              style: {
                                 background: '#da7171',
                                 color: 'white',
                              },
                              duration: 2500,
                           });
                        }}
                     >
                        Reschedule
                     </button>
                     <button
                        id='ConfirmBtn'
                        className='dashboard-button'
                        title='Send confirmation for appointment request'
                        onClick={() => {
                           toast('Appointment Confirmation Sent!', {
                              position: 'top-center',
                              style: {
                                 background: '#22C55E',
                                 color: 'white',
                              },
                              duration: 2500,
                           });
                        }}
                     >
                        Confirm
                     </button>
                  </div>
               </div>
            }
         </>
      );
   }

   const getUserInfo = () => {
      return (
         <>
            {currentAppointment === undefined
               ?
               <div style={{ color: '#deddfc' }}>
                  <FontAwesomeIcon icon={faUser} />
               </div>
               :
               <div style={{ color: '#22C55E', textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faUser} />
                  <span className='petParentName'>
                     {currentAppointment.user.lastName}, {currentAppointment.user.firstName}
                  </span>
                  <span className='userVetId'>{currentAppointment.user.vetDataId}</span>
               </div>
            }
         </>
      );
   }

   const getPetInfo = () => {
      return (
         <>
            {currentAppointment === undefined
               ?
               <div style={{ color: '#deddfc' }}>
                  <FontAwesomeIcon icon={faDog} />
               </div>
               :
               <div style={{ color: '#22C55E', textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faDog} />
                  <span className='petParentName'>
                     {currentAppointment.animal.firstName}
                  </span>
                  <span className='petBreed'>{currentAppointment.animal.breed}</span>
               </div>
            }
         </>
      );
   }

   return (
      <main className='dashboard-container'>

         <div className='calendar-container'>
            <div className='dashboard-panel calendar-container'>
               <span className='panel-title'>My Calendar</span>
               <div className='calendar-info'>
                  <h1>{formattedDate}</h1>
                  <h6>Selected Date</h6>
                  <div className='appointmentInfo'>
                     <hr></hr>
                     {getAppointmentInfo()}
                  </div>
               </div>

               <Calendar
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  inline
                  showWeek
               />
            </div>
         </div>

         <div className='details-container'>
            <div className='dashboard-panel'>
               <span className='panel-title'>The Pet Parent</span>
               <div className='userInfo'>
                  {getUserInfo()}
               </div>
            </div>
            <div className='dashboard-panel'>
               <span className='panel-title'>The Furry Friend</span>
               <div className='petInfo'>
                  {getPetInfo()}
               </div>
            </div>
         </div>
         <Toaster />
      </main>
   );
}

export default Dashboard;