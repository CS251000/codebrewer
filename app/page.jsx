"use client";
import FeaturesSection from '@/components/HomePage/Features';
import HeroSection from '../components/HomePage/Hero'
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

import React from 'react'

export default function Page() {
  return (
    <div>
        <>
        <HeroSection/>
        <FeaturesSection/>
        </>
        
      
    </div>
  )
}
