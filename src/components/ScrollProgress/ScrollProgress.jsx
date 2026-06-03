import { motion, useScroll } from "framer-motion";

function ScrollProgress() {

  const { scrollYProgress } = useScroll();

  return (

    <motion.div

      style={{
        scaleX:scrollYProgress
      }}

      className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 origin-left z-[9999]"
    />

  );
}

export default ScrollProgress;