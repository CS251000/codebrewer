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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Online Compiler</h1>
      <div data-pym-src="https://www.jdoodle.com/embed/v1/17be7ed9f46fc2da"></div>
    </div>
  );
}