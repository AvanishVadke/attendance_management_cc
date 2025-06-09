"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { GraduationCap, BarChart3, Calendar, TrendingUp, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Simple Dot Pattern Background - Fallback */}
      <div className="absolute inset-0 opacity-20" 
           style={{
             backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
             backgroundSize: '20px 20px'
           }}>
      </div>

      {/* Neon Glowing Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/6 left-1/5 w-56 h-56 bg-blue-500/30 rounded-full blur-2xl animate-pulse" 
             style={{
               animation: 'breathe 4s ease-in-out infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
             }}></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" 
             style={{
               animation: 'breathe 6s ease-in-out infinite reverse'
             }}></div>
        <div className="absolute bottom-1/5 left-1/2 w-64 h-64 bg-emerald-500/25 rounded-full blur-2xl" 
             style={{
               animation: 'breathe 5s ease-in-out infinite'
             }}></div>
      </div>

      {/* Custom CSS for breathing animation */}
      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }
      `}</style>

      {/* Animated background elements with colors */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-10 left-1/2 w-1 h-1 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-10 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-10 w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20"></div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-lg md:text-xl font-bold">Coder's Club</h1>
              <p className="text-xs md:text-sm text-blue-300">AM System</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" className="bg-white/10 border-blue-500/30 cursor-pointer text-white hover:bg-blue-500/20 hover:border-blue-500/50 text-sm md:text-base transition-colors duration-200">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center space-x-3">
              <Link href="/dashboard">
                <Button className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-sm md:text-base">
                  Go to Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 md:px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
            Welcome to the{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
              Coder's Club AM System
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Professional attendance management system for administrators. 
            Track student participation, generate insights, and manage records efficiently.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-200">
                  Login to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-200">
                  Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Essential Features
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Everything administrators need to manage student attendance efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-blue-500/20 hover:bg-blue-950/20 hover:border-blue-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Attendance Management</h3>
              <p className="text-gray-300">
                Track daily attendance with an intuitive interface. Mark present/absent status efficiently.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-purple-500/20 hover:bg-purple-950/20 hover:border-purple-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow duration-300">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Analytics & Reports</h3>
              <p className="text-gray-300">
                Generate comprehensive reports and visualize attendance patterns with charts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-emerald-500/20 hover:bg-emerald-950/20 hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Student Management</h3>
              <p className="text-gray-300">
                Organize students by year and division. Add, edit, and manage student records.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 md:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold">Coder's Club AM System</span>
          </div>
          <p className="text-gray-400 text-sm">
            Professional attendance management system for administrators.
          </p>
        </div>
      </footer>
    </div>
  );
}
