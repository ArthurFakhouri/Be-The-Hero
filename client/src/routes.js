import React from 'react';
import { BrowserRouter, Route, Routes as Rotas } from 'react-router-dom';
import Logon from './pages/Logon';
import NewIncident from './pages/NewIncident';
import Profile from './pages/Profile';
import Register from './pages/Register';


function Routes(props) {
    return (
        <BrowserRouter>
            <Rotas>
                <Route path='/'  element={<Logon />} />
                <Route path='/register'  element={<Register />} />
                <Route path='/profile'  element={<Profile />} />
                <Route path='/incidents/new'  element={<NewIncident />} />
            </Rotas>
        </BrowserRouter>
    );
}

export default Routes;