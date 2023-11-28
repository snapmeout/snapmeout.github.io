import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Draggable from 'react-draggable';
import './styles.css'
import './styles-circle.css'
import './styles-display.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
Button, TextField,
useMediaQuery, useTheme} from '@mui/material';
import { fetchData, updateData } from './utils/serverApi.js';
import MindSpace from './components/MindSpace';
import { ThoughtContext } from './utils/ThoughtContext';

const RegisterThought = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const { thoughts, setThoughts } = useContext(ThoughtContext);

  const handleAdd = async (event) => {
    event.preventDefault();
    // console.log(event.target.elements);
    // const input = event.target.elements.item.value;
    console.log(currentInput);
    if (currentInput) {
      const currentThought = await updateData('message', currentInput)
      if(currentThought.status.success) {
        setThoughts([...thoughts, {id: currentThought.status.id, message: currentInput}]);
        setConfirmationMessage('Item added!');
      } else {
        setConfirmationMessage('Adding Item Failed!');
      }
      // event.target.reset();
      setCurrentInput('');
      setTimeout(() => setConfirmationMessage(''), 2000); // Clear message after 2 seconds
    }
  };

  return (<div className='container'>
  <form>
    <input value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} type="text" id="item" name="item" placeholder="Enter a thought..." />
    <button onClick={handleAdd}><i className="fa-solid fa-pencil"></i></button>
  </form>
  {confirmationMessage && <p>{confirmationMessage}</p>}
</div>)
}

const Circle = ({circleRef, parentBounds, priority, item}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState(item);
  const handleOpen = () => {
    if (!open) {
      setOpen(true)
    }
    // setContent(content + '-*')

  };

  const handleClose = () => {
    console.log('Calling close')
    setOpen(false)
  };

  let lastTap = 0;
  const handleTouch = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      handleOpen();
    } else {
      lastTap = now;
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  
  const getColorClass = () => {
    switch (priority) {
      case 'urgent':
        return 'circle-red';
      case 'important':
        return 'circle-orange';
      case 'must':
        return 'circle-yellow';
      default:
        return '';
    }
  };
  return (
    <Draggable bounds="parent"  nodeRef={circleRef}>
    <div className="circle" ref={circleRef} onDoubleClick={handleOpen} onTouchStart={handleTouch} onTouchEnd={handleTouch} >
      <div className="circle-text">{content}</div>
      <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
        <DialogTitle>{content}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      </div>
    </Draggable>          
  )
}

const CircleList = ({ items }) => {
  const circleRefs = useRef([]);

  const parentRef = useRef(null);

  const getParentBounds = () => {
    if (parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      return {
        left: parentRect.left,
        top: parentRect.top,
        right: parentRect.right,
        bottom: parentRect.bottom,
      };
    }
    return null;
  };

  useEffect(() => {
    console.log(items)
    // calculate size of circle based on text length
    circleRefs.current.forEach((circleRef) => {
      const circle = circleRef.current;
      const text = circle.querySelector('.circle-text');
      const textWidth = text.offsetWidth;
      const circleSize = Math.max(textWidth, 60) + 20; // minimum size of 60px
      circle.style.width = `${circleSize}px`;
      circle.style.height = `${circleSize}px`;
    });
  }, [items]);

  return (
    // <div ref={parentRef} className="display-content">
    <>
    {/* <ul className="circle-list"> */}
      {items.map((item, index) => {
        const circleRef = React.createRef();
        circleRefs.current[index] = circleRef;
        // console.log(getParentBounds())
        return (
          // <li key={index} className="circle-list-item">
              <Circle key={item?.id} circleRef={circleRef} item={item?.message} parentBounds={getParentBounds()}/>
          // </li>
        );
      })
      }
    {/* </ul> */}
    </>
    // </div>
  );
};

const DisplayThoughts = () => {
  const { thoughts, setThoughts } = useContext(ThoughtContext);
  const [key, setKey] = useState(0);

  console.log(thoughts)
  return (
  <div key={key} className="container">
    <CircleList items={thoughts} />
    <button className="refresh-button" onClick={() => setKey(key+1)}>
    <i className="fas fa-sync-alt"></i>      
    </button>
  </div>
)
}



function App() {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [step, setStep] = useState(1);

  const handleFirstInputChange = (event) => {
    setFirstInput(event.target.value);
  };

  const handleSecondInputChange = (event) => {
    setSecondInput(event.target.value);
  };

  const handleFirstInputSubmit = (event) => {
    event.preventDefault();
    // Validate first input (Example: Check if it's not empty)
    if (firstInput.trim() !== "") {
      setStep(2); // Move to next step
    }
  };

  const handleSecondInputSubmit = (event) => {
    event.preventDefault();
    // Validate second input (Example: Check if it's not empty)
    if (secondInput.trim() !== "") {
      setStep(3); // Move to next step
    }
  };

  return (
    <div className="app">
      <div className={`page page-${step}`}>
        {step === 1 && (
          <form className="input-form" onSubmit={handleFirstInputSubmit}>
            <input
              type="text"
              placeholder="Enter First Input"
              value={firstInput}
              onChange={handleFirstInputChange}
              required
            />
            <button type="submit">Next</button>
          </form>
        )}
        {step === 2 && (
          <form className="input-form" onSubmit={handleSecondInputSubmit}>
            <input
              type="text"
              placeholder="Enter Second Input"
              value={secondInput}
              onChange={handleSecondInputChange}
              required
            />
            <button type="submit">Next</button>
          </form>
        )}
        {step === 3 && (
          <div className="display-screen">
            <h2>Display Screen</h2>
            <p>First Input: {firstInput}</p>
            <p>Second Input: {secondInput}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
