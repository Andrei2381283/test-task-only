import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [mobile, setMobile] = useState(window.innerWidth <= 734);
  
  useEffect(() => {
    const onResize = () => {
      if(mobile && window.innerWidth > 734){
        setMobile(false);
        console.log(false);
      } else if(!mobile && window.innerWidth <= 734) {
        setMobile(true);
        console.log(true);
      }
    };
    
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [mobile]);

  return mobile;
}