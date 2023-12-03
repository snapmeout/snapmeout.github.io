import React from 'react';
import { motion } from "framer-motion";

const HighlightForward = ({content}) => {

    return (<motion.div
        className="special-circle"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["50%", "50%", "0%", "0%", "50%"]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: 0,
          repeatDelay: 1
        }}
        >
        <span> {content} </span>
        </motion.div>)
}

export default HighlightForward;