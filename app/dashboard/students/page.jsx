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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">Students</h2>
        <AddNewStudent onStudentAdded={getStudentsList} />
      </div>
      
      {/* Students Table */}
      <div className="bg-card rounded-lg border">
        <StudentListTable 
          studentList={students} 
          loading={loading} 
          onDeleteStudent={handleDeleteStudent} 
          deletingId={deletingId} 
        />
      </div>
    </div>
  );
}

export default Student