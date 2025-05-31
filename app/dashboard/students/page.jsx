"use client"

import GlobalApi from '@/app/_services/GlobalApi';
import { useEffect, useState } from 'react';
import AddNewStudent from './_components/AddNewStudent';
import StudentListTable from './_components/StudentListTable';

function Student() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStudentsList = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentsList();
  }, []);

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center mb-7">
        Students
        <AddNewStudent onStudentAdded={getStudentsList} />
      </h2>
      <StudentListTable studentList={students} loading={loading} />
    </div>
  );
}

export default Student