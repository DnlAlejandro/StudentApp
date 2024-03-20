import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
    name: 'student',
    initialState: {
        status: 'not-selected', //selected, not-selected
        studentId: null,
        studentName: null,
    },
    reducers: {
        selectStudent: (state, { payload } ) => {
            state.status = 'selected';
            state.studentId = payload.studentId;
            state.studentName = payload.studentName;
        },
        deselectStudent: (state ) => {
            state.status = 'not-selected';
            state.studentId = null;
            state.studentName = null;
        },
    }
});

export const { selectStudent, deselectStudent } = studentSlice.actions;