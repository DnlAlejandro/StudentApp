import { Button, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form";
import subjectsData from "../data/subjects.json";
import studentsData from "../data/students.json";
import { useChangeRate } from "../hooks/useChangeRate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const RegisterPage = () => {
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

    useEffect(() => {
        if (studentIdField) {
            const storedData = JSON.parse(localStorage.getItem('studentRecords')) || {};
            const studentData = storedData[studentIdField];

            if (studentData) {
                reset({ ...studentData });
            }
        }
    }, [studentIdField, reset]);

    useEffect(() => {
        if (studentId) {
            setValue('student', studentId);
        }
        
    }, [studentId, setValue])

    const credits = watch("credits");
    const calculatedValue = credits ? credits * 150 : null;
    const changeRate = useChangeRate(calculatedValue);

    const validateSubjects = (selectedSubjectIds) => {
        if (selectedSubjectIds.length !== 3 ) {
            return "You must select 3 subjects";
        }
    
        const professorIds = selectedSubjectIds.map(subjectId => {
            const subject = subjectsData.subjects.find(subject => subject.id === subjectId);
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

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>
            <IconButton

                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <>
            <Typography textAlign="center" my={2} variant="h5">
                Register your subjects
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item xs={12} sx={{ my: 2 }}>
                        <FormControl
                            variant="filled"
                            sx={{ display: "flex", justifyContent: "center" }}
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
                    </Grid>
                    <Grid
                        container
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <Grid item xs={12}>
                            <TextField
                                {...register("credits", {
                                    required: "Credits is required",
                                    min: {
                                        value: 9,
                                        message: "You need to select 9 credits",
                                    },
                                    max: {
                                        value: 9,
                                        message: "You need to select 9 credits",
                                    },
                                })}
                                fullWidth
                                label="Credits"
                                type="number"
                                variant="filled"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.credits}
                                inputProps={{ min: 0 }}
                                helperText={
                                    errors.credits ? errors.credits.message : ""
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                    >
                        <Grid item>
                            <Typography sx={{ mt: 2 }}>
                                Value credits:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mt: 2 }}>
                                ${calculatedValue ? calculatedValue : 0}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mt: 2 }}>
                                €{calculatedValue ? changeRate : 0}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ my: 2 }}>
                        <FormControl
                            variant="filled"
                            error={!!errors.subjects}
                            fullWidth
                        >
                            <InputLabel htmlFor="grouped-select">
                                Subjects
                            </InputLabel>
                            <Controller
                                name="subjects"
                                control={control}
                                rules={{
                                    required: "You need to select subjects",
                                    validate: validateSubjects,
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="grouped-select-label"
                                        id="grouped-select"
                                        multiple
                                        label="Subjects"
                                    >
                                        {subjectsData.subjects.map(
                                            (subject) => (
                                                <MenuItem
                                                    key={subject.id}
                                                    value={subject.id}
                                                >
                                                    {`${subject.professor.name} - ${subject.name}`}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                )}
                            />
                            {errors.subjects && (
                                <FormHelperText>
                                    {errors.subjects.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message="Your subjects were registered correctly"
                action={action}
                sx={{ '& .MuiSnackbarContent-root': { backgroundColor: 'green' } }}
            />
        </>
    );
};
