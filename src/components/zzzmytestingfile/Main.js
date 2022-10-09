import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Meetup from './Meetup';
import About from './About';
import MeetupDetails from './MeetupDetails';
import AddMeetup from './AddMeetup';
import EditMeetup from './EditMeetup';

const Main = () => (
  <main>
    <Routes>
      <Route path='/' element={Meetup} />
      <Route path='/about' element={About} />
      <Route path='/meetups/add' element={AddMeetup} />
      <Route path='/meetups/edit/:id' element={EditMeetup} />
      <Route path='/meetups/:id' element={MeetupDetails} />
    </Routes>
  </main>
)

export default Main;