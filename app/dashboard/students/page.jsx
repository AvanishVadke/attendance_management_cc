"use client"

import GlobalApi from '@/app/_services/GlobalApi';
import { useEffect, useState } from 'react';
import AddNewStudent from './_components/AddNewStudent';
import StudentListTable from './_components/StudentListTable';
import { toast } from "sonner";

function Student() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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

  // Delete handler
  const handleDeleteStudent = async (id) => {
    setDeletingId(id);
    try {
      await GlobalApi.DeleteStudent(id);
      toast.success('Student deleted successfully');
      await getStudentsList();
    } catch (error) {
      toast.error('Failed to delete student');
    } finally {
      setDeletingId(null);
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
      <StudentListTable studentList={students} loading={loading} onDeleteStudent={handleDeleteStudent} deletingId={deletingId} />
    </div>
  );
}

export default Student