import { getUniqueRecord } from '@/app/_services/services';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({ attendanceList }) {

    const [totalStudent, setTotalStudent] = useState(0);
    const [presentPercentage, setPresentPercentage] = useState(0);    useEffect(() => {
      if(attendanceList && Array.isArray(attendanceList)) {
        const totalSt = getUniqueRecord(attendanceList);
        setTotalStudent(totalSt.length);

        // Use the same calculation method as pie chart - count actual attendance records
        const processedRecords = new Set();
        let totalPresent = 0;
        
        attendanceList.forEach(record => {
          if (record.date && record.studentId) {
            const recordKey = `${record.studentId}-${record.date}`;
            
            if (processedRecords.has(recordKey)) {
              return; // Skip duplicate records
            }
            processedRecords.add(recordKey);
            
            if (record.present === true) {
              totalPresent++;
            }
          }
        });

        // Get unique dates to calculate total possible attendance
        const uniqueDates = new Set();
        attendanceList.forEach(record => {
          if (record.date) {
            uniqueDates.add(record.date);
          }
        });

        const totalPossible = uniqueDates.size * totalSt.length;
        const PresentPercentage = totalPossible > 0 ? (totalPresent / totalPossible) * 100 : 0;
        
        setPresentPercentage(PresentPercentage);
      }
    }, [attendanceList])

    var absentPercentage = 0;
    if(presentPercentage){
        absentPercentage = 100 - presentPercentage;
    }
    
    

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
        <Card icon={<GraduationCap/>} title="Total Student" value={totalStudent} />
        <Card icon={<TrendingUp/>} title="Total Present" value={(presentPercentage).toFixed(2) + " %"} />
        <Card icon={<TrendingDown/>} title="Total Absent" value={(absentPercentage).toFixed(2) + " %"} />
    </div>
  )
}

export default StatusList