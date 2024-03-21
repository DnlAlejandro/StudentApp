import { useEffect, useState } from "react";

export const useStudentSelection = (initialId) => {
    const [studentId, setStudentId] = useState(initialId);
    const [studentDetails, setStudentDetails] = useState({});

    useEffect(() => {
        const student = studentsData.students.find((s) => s.id === studentId);
        setStudentDetails(student || {});
    }, [studentId]);

    return { studentId, setStudentId, studentDetails };
};
