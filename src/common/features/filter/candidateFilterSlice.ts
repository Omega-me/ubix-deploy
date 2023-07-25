/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: "",
    location: "",
    destination: {
        min: 0,
        max: 100,
    },
    category: "",
    candidateGender: "",
    datePost: "",
    experiences: [],
    qualifications: [],
    sort: "",
    perPage: {
        start: 0,
        end: 0,
    },
};

export const candidateFilterSlice = createSlice({
    name: "candidate-filter-slice",
    initialState,
    reducers: {
        addKeyword: (state: any, { payload }) => {
            state.keyword = payload;
        },
        addLocation: (state: any, { payload }) => {
            state.location = payload;
        },
        addDestination: (state: any, { payload }) => {
            state.destination.min = payload.min;
            state.destination.max = payload.max;
        },
        addCategory: (state: any, { payload }) => {
            state.category = payload;
        },
        addCandidateGender: (state: any, { payload }) => {
            state.candidateGender = payload;
        },
        addDatePost: (state: any, { payload }) => {
            state.datePost = payload;
        },
        addExperience: (state: any, { payload }) => {
            const isExist = state.experiences.includes(payload);
            if (!isExist) {
                state.experiences.push(payload);
            } else {
                state.experiences = state.experiences.filter(
                    (item: any) => item !== payload
                );
            }
        },
        clearExperienceF: (state: any) => {
            state.experiences = [];
        },
        addQualification: (state: any, { payload }) => {
            const isExist = state.qualifications.includes(payload);
            if (!isExist) {
                state.qualifications.push(payload);
            } else {
                state.qualifications = state.qualifications.filter(
                    (item: any) => item !== payload
                );
            }
        },
        clearQualificationF: (state: any) => {
            state.qualifications = [];
        },
        addSort: (state: any, { payload }) => {
            state.sort = payload;
        },
        addPerPage: (state: any, { payload }) => {
            state.perPage = payload;
        },
    },
});

export const {
    addKeyword,
    addLocation,
    addDestination,
    addCategory,
    addCandidateGender,
    addDatePost,
    addExperience,
    clearExperienceF,
    addQualification,
    clearQualificationF,
    addSort,
    addPerPage,
} = candidateFilterSlice.actions;
export default candidateFilterSlice.reducer;
