import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useFollowPointer } from "../../utils/use-follow-pointer";
import { burstBubble } from "../../utils/burst";

const SpringCircle = ({content, onBurst, onLoad}) => {
  let springCircleRef = useRef(null);

  const { x, y } = useFollowPointer(springCircleRef);
 console.log('inside ', content, springCircleRef)

  useEffect(() => {
    onLoad();
  }, [])

  return (
    <motion.div
      ref={springCircleRef}
      className="red-circle"
      animate={{ x, y }}
      transition={{
        type: "spring",
        damping: 3,
        stiffness: 50,
        restDelta: 0.001
      }}
      onClick={() => {
        burstBubble(springCircleRef);
        onBurst();
      }}
    >
      <span>{content}</span>
    </motion.div>

  );
}

export default SpringCircle;