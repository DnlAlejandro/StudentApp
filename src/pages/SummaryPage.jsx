import { FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Controller } from "react-hook-form";
import { useSummaryPage } from '../hooks/useSummaryPage';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { studentsData } from "../data";

export const SummaryPage = () => {
    const {
        control,
        errors,
        studentName,
        studentRecords,
        studentIdField,
        hasData,
        findCommonClasses,
        changeRate,
    } = useSummaryPage();
    
    const commonClasses = findCommonClasses();

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
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        "@media (min-width:600px)": { width: "40%" },
                    }}
                >
                    <FormControl
                        variant="filled"
                        sx={{ width: "100%", marginRight: "16px" }}
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
                                >
                                    {studentsData.students.map((student) => (
                                        <MenuItem
                                            key={student.id}
                                            value={student.id}
                                        >
                                            {student.name}
                                        </MenuItem>
                                    ))}
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
                        }}
                    >
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    </Link>
                </Grid>
                {studentIdField && (
                    <Grid
                        item
                        xs={12}
                        sx={{
                            my: 2,
                            width: "100%",
                            "@media (min-width: 600px)": { width: "40%" },
                        }}
                    >
                        {hasData(studentIdField) ? (
                            <TableContainer component={Paper}>
                                <Table
                                    aria-label="student details table"
                                    sx={{ width: "100%" }}
                                >
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
                                                    {record.subjects}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {record.credits}
                                                </TableCell>
                                                <TableCell align="right">
                                                    $1350 ({changeRate} €)
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
                        )}
                    </Grid>
                )}{" "}
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ mt: 2 }} textAlign="center">
                        {commonClasses && commonClasses.length > 0
                            ? `Common classes with other students: ${commonClasses.map(c => `${c.studentName} (${c.subjects.join(", ")})`).join(", ")}`
                            : "No common classes with other students."}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};