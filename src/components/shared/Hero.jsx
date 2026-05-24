import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  Plane,
  DollarSign,
  Heart,
} from "lucide-react";

const Hero = () => {

  const navigate = useNavigate();

  return (
    <section
  className="min-h-screen relative overflow-hidden flex items-center justify-center py-22 bg-cover bg-center"
  style={{
    backgroundImage: "url('/bg.jpg')"
  }}
>

      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/50 shadow-sm">

          <span className="relative flex h-3 w-3">

            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />

            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />

          </span>

          <span className="text-sm font-medium text-indigo-900">
            AI-Powered Travel Agent v2.0
          </span>

        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl mb-6 tracking-tight leading-tight">
          Design Your Dream Gateway in Seconds
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Tell us where you want to go, and let our advanced AI craft
          the perfect itinerary tailored to your budget and interests.
        </p>

        {/* Button */}
        <Button
          onClick={() => navigate("/create-trip")}
          className="group relative inline-flex items-center justify-center px-8 py-7 text-lg font-bold text-white transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/30 hover:scale-105 shadow-2xl"
        > 
          Start Planning

          <FaArrowRightLong className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        <div className="mt-12 grid grid-cols-3 gap-4 text-gray-200 text-sm">
            <div className="flex flex-col items-center">
              
              <div className="p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl mb-2 text-white">
                <Plane size={24} />
              </div>

              <span>Smart Routes</span>

            </div>

            <div className="flex flex-col items-center">

              <div className="p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl mb-2 text-white">
                <DollarSign size={24} />
              </div>

              <span>Budget Control</span>

            </div>

            <div className="flex flex-col items-center">

              <div className="p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl mb-2 text-white">
                <Heart size={24} />
              </div>

              <span>Personalized</span>

            </div>

          </div>

      </div>
    </section>
  );
};

export default Hero;