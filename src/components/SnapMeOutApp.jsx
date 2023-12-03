import React, {useState, useEffect} from 'react';
import { motion } from "framer-motion";
import HighlightForward from './framer/HighlightForward';
import SpringCircle from './framer/SpringCircle';

const SnapMeOutApp = ({focus, distractions}) => {
  const [distractionsCopy, setDistractionsCopy] = useState(Array.from(distractions.slice()))
  const [distraction, setDistraction] = useState();
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    if(showComponent && distractionsCopy?.length > 0 ) {
      const distractionsTemp = distractionsCopy.slice() 
      console.log(showComponent, distractionsCopy)
      setDistraction(distractionsTemp.pop())
      setDistractionsCopy(distractionsTemp);
      console.log('received popped infop')
    }
  }, [])

  useEffect(() => {
    if(!showComponent && distractionsCopy?.length > 0 && !distraction) {
      const distractionsTemp = distractionsCopy.slice() 
      console.log(showComponent, distractionsCopy)
      setDistraction(distractionsTemp.pop())
      setDistractionsCopy(distractionsTemp);
      console.log('received popped infop')
    }
  }, [showComponent])

  // useEffect(() => {
  //   if(!showComponent && distraction) {
  //     setShowComponent(true);
  //   }
  // }, [distraction])

  const onBurst = () => {
    setShowComponent(false);
    setDistraction();
  }


  console.log('reredeing for new dis: ', distractionsCopy)
    return (
    <div>
      <HighlightForward content={focus} style={{
      position: 'absolute',
      top: 0,
      left: 0,
      }}/>
      {
        distraction &&
        <SpringCircle 
      content={distraction}
      onBurst={onBurst}
      onLoad={() => {setShowComponent(true)}}
      />
      }
    </div>

    )
}

export default SnapMeOutApp;


