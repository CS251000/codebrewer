"use client"
import { useEffect } from 'react';

export default function Playground() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.jdoodle.com/assets/jdoodle-pym.min.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  return (
    <>
  
        <div data-pym-src="https://www.jdoodle.com/embed/v1/1e9cc8d7ad73a464"></div>
        <script src="https://www.jdoodle.com/assets/jdoodle-pym.min.js" type="text/javascript"> </script></>
    
    
  );
}