import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useChangeRate } from "./useChangeRate";
import { subjectsData } from "../data";

export const useRegisterForm = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            subjects: [],
            student: "",
        },
    });

    const { studentId } = useSelector((state) => state.student);
    const studentIdField = watch("student");
    const credits = watch("credits");
    const calculatedValue = credits ? credits * 150 : null;
    const changeRate = useChangeRate(calculatedValue);

    useEffect(() => {
        if (studentIdField) {
            const storedData =
                JSON.parse(localStorage.getItem("studentRecords")) || {};
            const studentData = storedData[studentIdField];

            if (studentData) {
                reset({ ...studentData });
            }
        }
    }, [studentIdField, reset]);

    useEffect(() => {
        if (studentId) {
            setValue("student", studentId);
        }
    }, [studentId, setValue]);

    const validateSubjects = (selectedSubjectIds) => {
        if (selectedSubjectIds.length !== 3) {
            return "You must select 3 subjects";
        }

        const professorIds = selectedSubjectIds.map((subjectId) => {
            const subject = subjectsData.subjects.find(
                (subject) => subject.id === subjectId
            );
            return subject ? subject.professor.id : null;
        });

        const uniqueProfessors = new Set(professorIds);
        if (uniqueProfessors.size < selectedSubjectIds.length) {
            return "You must not select multiple subjects from the same professor";
        }
        return true;
    };

    const onSubmit = (data) => {
        const currentRecords =
            JSON.parse(localStorage.getItem("studentRecords")) || {};
        const studentId = data.student;

        currentRecords[studentId] = {
            ...currentRecords[studentId],
            ...data,
        };

        localStorage.setItem("studentRecords", JSON.stringify(currentRecords));
        reset({
            subjects: [],
            credits: 0,
            student: "",
        });
        handleClick();
    };

    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);

    const handleClose = (reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        control,
        errors,
        validateSubjects,
        calculatedValue,
        changeRate,
        open,
        handleClick,
        handleClose,
        onSubmit,
        subjectsData,
    };
};
