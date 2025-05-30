import React from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header';

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className="w-64 fixed md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header/>
        {children}
      </div>
    </div>
  );
}