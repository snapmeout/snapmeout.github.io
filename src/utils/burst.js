import mojs from "@mojs/core";

export const burstBubble = (bubbleRef) => {
    const rect = bubbleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const burst = new mojs.Burst({
        radius:   { 0: 200 },
        count:    15,
        children: {
          shape:        'circle',
          radius:       20,
          fill:         [ 'deeppink', 'cyan', 'yellow' ],
          strokeWidth:  5,
          duration:     2000
        }
      });

      burst
      .tune({ left:centerX, top: centerY })
      .setSpeed(3)
      .replay();
      console.log('end of burst');
      // bubbleRef.current.remove();
}

