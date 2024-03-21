import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { selectStudent } from '../store/studentSlice';
import { studentsData, subjectsData } from '../data';
import { useChangeRate } from '../hooks/';

export const useSummaryPage = () => {
    const dispatch = useDispatch();
    const { studentId, studentName } = useSelector((state) => state.student);
    const [studentRecords, setStudentRecords] = useState([]);
    const changeRate = useChangeRate(1350);

    const {
        control, watch, setValue, formState: { errors },
    } = useForm({
        defaultValues: {
            student: "",
        },
    });

    const studentIdField = watch("student");

    useEffect(() => {
        if (studentIdField) {
            const studentRecord = JSON.parse(localStorage.getItem("studentRecords") || "{}")[studentIdField];
    
            if (studentRecord) {
                const subjectsWithNames = studentRecord.subjects.map(subjectId => {
                    const subject = subjectsData.subjects.find(s => s.id === subjectId);
                    return subject ? subject.name : "Unknown";
                });
    
                setStudentRecords([{
                    ...studentRecord,
                    subjects: subjectsWithNames.join(", "),
                }]);
            } else {
                setStudentRecords([]);
            }
        }
    }, [studentIdField]);

    useEffect(() => {
        if (studentId) {
            setValue('student', studentId);
        }
    }, [studentId, setValue]);

    const hasData = (id) => {
        const storedData = JSON.parse(localStorage.getItem("studentRecords") || "{}");
        return !!storedData[id];
    }

    const findCommonClasses = () => {
        const allStudentRecords = JSON.parse(localStorage.getItem("studentRecords") || "{}");
        const studentNames = studentsData.students.reduce((acc, student) => {
            acc[student.id] = student.name;
            return acc;
        }, {});

        if (!studentIdField || !allStudentRecords) return null;

        const selectedStudentSubjects = allStudentRecords[studentIdField]?.subjects || [];

        const commonClasses = Object.entries(allStudentRecords)
            .filter(([id,]) => id !== studentIdField)
            .map(([id, record]) => {
                const otherStudentSubjects = record.subjects || [];
                const commonSubjects = otherStudentSubjects.filter(subjectId =>
                    selectedStudentSubjects.includes(subjectId)
                );
                const subjectNames = commonSubjects.map(subjectId => {
                    const subject = subjectsData.subjects.find(s => s.id === subjectId);
                    return subject ? subject.name : "Unknown";
                });
                return {
                    studentName: studentNames[id],
                    subjects: subjectNames,
                };
            })
            .filter(entry => entry.subjects.length > 0);

        return commonClasses;
    };

    return {
        control,
        errors,
        studentName,
        studentRecords,
        studentIdField,
        hasData,
        findCommonClasses,
        changeRate,
    };
};
