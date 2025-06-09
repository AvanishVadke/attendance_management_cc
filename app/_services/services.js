export const getUniqueRecord = (attendanceList) => {
  const uniqueRecord = [];
  const existingUser = new Set();

  // Check if attendanceList is an array
  if (!Array.isArray(attendanceList)) {
    console.warn('getUniqueRecord: attendanceList is not an array', attendanceList);
    return uniqueRecord;
  }

  attendanceList.forEach((record) => {
    if (!existingUser.has(record.studentId)) {
      existingUser.add(record.studentId);
      uniqueRecord.push(record);
    }
  });

  return uniqueRecord;
};
