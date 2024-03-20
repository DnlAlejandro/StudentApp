import { FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import studentsData from "../data/students.json";
import subjectsData from "../data/subjects.json";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectStudent } from '../store/studentSlice';
import { useChangeRate } from '../hooks/useChangeRate';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export const SummaryPage = () => {

    const dispatch = useDispatch();
    const { studentId, studentName } = useSelector((state) => state.student);
    const [studentRecords, setStudentRecords] = useState([]);
    const changeRate = useChangeRate(1350);

    const hasData = (id) =>  {
        const storedData = JSON.parse(localStorage.getItem("studentRecords") || "{}");
        return !!storedData[id];
    }

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
            const student = studentsData.students.find(
                (student) => student.id === studentIdField
            );
            const studentName = student ? student.name : null;
            dispatch(selectStudent({ studentId: studentIdField, studentName }));

            const storedData = JSON.parse(
                localStorage.getItem("studentRecords") || "{}"
            );
            const studentRecord = storedData[studentIdField];

            if (studentRecord) {
                setStudentRecords([
                    {
                        subjects: studentRecord.subjects.join(", "),
                        credits: studentRecord.credits,
                    },
                ]);
            } else {
                setStudentRecords([]);
            }
        }
    }, [studentIdField, dispatch]);

    useEffect(() => {
        if (studentId) {
            setValue('student', studentId);
        }
        
    }, [studentId, setValue])

    return (
        <>
            <Typography textAlign="center" my={2} variant="h5">
                {studentName} Summary
            </Typography>
            <Grid
                container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 2,
                    "& form": {
                        width: "30%",
                        "@media (max-width: 600px)": {
                            width: "100%",
                        },
                    },
                }}
            >
                <form>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            my: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FormControl
                            variant="filled"
                            sx={{ flexGrow: 1 }}
                            error={!!errors.student}
                        >
                            <InputLabel>Student</InputLabel>
                            <Controller
                                name="student"
                                control={control}
                                rules={{ required: "Student is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Student"
                                        name="student"
                                        sx={{ width: "100%" }}
                                    >
                                        {studentsData.students.map(
                                            (student) => (
                                                <MenuItem
                                                    key={student.id}
                                                    value={student.id}
                                                >
                                                    {student.name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                )}
                            />
                            {errors.student && (
                                <FormHelperText>
                                    {errors.student.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Link
                            to="/register"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                marginLeft: "16px",
                            }}
                        >
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </Grid>
                </form>
                <Grid item xs={12} sx={{ my: 2 }}>
                    {studentIdField ? (
                        hasData(studentIdField) ? (
                            <TableContainer
                                component={Paper}
                                sx={{
                                    width: "100%",
                                    maxWidth: "100%",
                                    margin: "auto",
                                    "@media (min-width: 600px)": {
                                        maxWidth: "40%",
                                    },
                                }}
                            >
                                <Table aria-label="student details table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Subjects</TableCell>
                                            <TableCell align="right">
                                                Credits
                                            </TableCell>
                                            <TableCell align="right">
                                                Value credits
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {studentRecords.map((record, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {record.subjects
                                                        .split(", ")
                                                        .map((subjectId) => {
                                                            const subject =
                                                                subjectsData.subjects.find(
                                                                    (s) =>
                                                                        s.id.toString() ===
                                                                        subjectId
                                                                );
                                                            return subject
                                                                ? subject.name
                                                                : "Unknown";
                                                        })
                                                        .join(", ")}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {record.credits}
                                                </TableCell>
                                                <TableCell align="right">
                                                    $1350 // €{changeRate}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Typography
                                variant="h5"
                                textAlign="center"
                                color="red"
                            >
                                {studentName
                                    ? `${studentName} does not have data and needs to register.`
                                    : "This student has no data."}
                            </Typography>
                        )
                    ) : (
                        <Typography variant="h5" textAlign="center" color="red">
                            Please select a student*
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </>
    );
};
