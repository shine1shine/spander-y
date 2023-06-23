import { configureStore } from "@reduxjs/toolkit";
import loginUserDetailsSlice from "./slices/loginUserDetailsSlice";
import allRepositorySlice from "./slices/allRepositoryDetails";
import orgsDetailSlice from "./slices/orgsDetails";
import repositoryTreeDetailsSlice from "./slices/repositoryTreeDetailsSlice";
import githubIssueSlice from "./slices/githubIssueSlice";

export const store = configureStore({
    reducer: {
        loginUserDetailsSlice: loginUserDetailsSlice,
        allRepositorySlice: allRepositorySlice,
        orgsDetailSlice: orgsDetailSlice,
        repositoryTreeDetailsSlice:repositoryTreeDetailsSlice,
        githubIssueSlice : githubIssueSlice
    },
});