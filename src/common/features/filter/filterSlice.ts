/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobList: {
        keyword: "",
        location: "",
        destination: {
            min: 0,
            max: 100,
        },
        category: "",
        jobType: [],
        jobTypeSelect: "",
        datePosted: "",
        experience: [],
        experienceSelect: "",
        salary: {
            min: 0,
            max: 20000,
        },
        tag: "",
    },
    jobSort: {
        sort: "",
        perPage: {
            start: 0,
            end: 0,
        },
    },
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addKeyword: (state: any, { payload }) => {
            state.jobList.keyword = payload;
        },
        addLocation: (state: any, { payload }) => {
            state.jobList.location = payload;
        },
        addDestination: (state: any, { payload }) => {
            state.jobList.destination.min = payload.min;
            state.jobList.destination.max = payload.max;
        },
        addCategory: (state: any, { payload }) => {
            state.jobList.category = payload;
        },
        addJobType: (state: any, { payload }) => {
            const isExist = state.jobList.jobType.includes(payload);
            if (!isExist) {
                state.jobList.jobType.push(payload);
            } else {
                state.jobList.jobType = state.jobList.jobType.filter(
                    (item: any) => item !== payload
                );
            }
        },
        clearJobType: (state: any) => {
            state.jobList.jobType = [];
        },
        addJobTypeSelect: (state: any, { payload }) => {
            state.jobList.jobTypeSelect = payload;
        },
        addDatePosted: (state: any, { payload }) => {
            state.jobList.datePosted = payload;
        },
        addExperience: (state: any, { payload }) => {
            const isExist = state.jobList.experience.includes(payload);
            if (!isExist) {
                state.jobList.experience.push(payload);
            } else {
                state.jobList.experience = state.jobList.experience.filter(
                    (item: any) => item !== payload
                );
            }
        },
        addExperienceSelect: (state: any, { payload }) => {
            state.jobList.experienceSelect = payload;
        },
        clearExperience: (state: any) => {
            state.jobList.experience = [];
        },
        addSalary: (state: any, { payload }) => {
            state.jobList.salary.min = payload.min;
            state.jobList.salary.max = payload.max;
        },
        addSort: (state: any, { payload }) => {
            state.jobSort.sort = payload;
        },
        addTag: (state: any, { payload }) => {
            state.jobList.tag = payload;
        },
        addPerPage: (state: any, { payload }) => {
            state.jobSort.perPage.start = payload.start;
            state.jobSort.perPage.end = payload.end;
        },
    },
});

export const {
    addKeyword,
    addLocation,
    addDestination,
    addCategory,
    addJobType,
    clearJobType,
    addJobTypeSelect,
    addDatePosted,
    addExperience,
    addExperienceSelect,
    clearExperience,
    addSalary,
    addTag,
    addSort,
    addPerPage,
} = filterSlice.actions;
export default filterSlice.reducer;
