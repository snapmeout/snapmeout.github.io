import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Home = () => {

    return (
      <div className="window" style={{display: 'flex'}}>
      <main>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
        <Button variant="contained">    
        <NavLink to="/focus" className="nav-link">
        <span>
          Launch App

        </span>
        </NavLink>
        </Button>
        </Box>
      </main>
      </div>
)
}

export default Home;