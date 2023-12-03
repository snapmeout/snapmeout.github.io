import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import Button from '@mui/material/Button';

const AddDistractions = ({setDistractions}) => {
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    return (
      <div className="window" style={{display: 'flex'}}>
      <main>
      <AnimatePresence mode='wait'>
      <motion.div
      key={"focus"}
      initial={{ x: 150, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
      >
      {/* <form className="input-form" onSubmit={handleFirstInputSubmit}> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}>
      <FormControl sx={{ m: 1}} variant="standard">
      <InputLabel htmlFor="standard-adornment-password">Add minimum 3 distractions</InputLabel>
      <Input
      id="standard-adornment-password"
      type='text'
      style={{ width: '300px' }} 
      onChange={(e) => {setDistractions(e.target.value)}}
      endAdornment={
      <InputAdornment position="end">
      <IconButton
      aria-label="toggle password visibility"
      onClick={() => {}}
      onMouseDown={handleMouseDownPassword}
      >
      <AdsClickIcon />
      </IconButton>
      </InputAdornment>
      }
      />
  
      </FormControl>
      <Button variant="contained" color="error">
      <NavLink to="/snapmeoutapp" className="nav-link">
      <span>Add Distractions</span>
      </NavLink>
      </Button>
      </Box>
  
  
      {/* </form> */}
      </motion.div>
      </AnimatePresence>
      </main>
</div>
    )
}

export default AddDistractions;