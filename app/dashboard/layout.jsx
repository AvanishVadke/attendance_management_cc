import React from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 fixed left-0 top-0 h-full z-30">
        <SideNav />
      </div>
      
      {/* Mobile Sidebar - handled in SideNav component */}
      <div className="md:hidden">
        <SideNav />
      </div>
      
      {/* Main Content */}
      <div className="md:ml-64">
        <Header />
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}