import { Octokit } from "@octokit/core";
import { getToken } from "../../utils/getToken";
import { useDispatch } from "react-redux";
import { githubIssueActions } from "../../redux/slices/githubIssueSlice";
import { Api } from "../../api";

export const useGithubApi = () => {
    const dispatch = useDispatch()
    const createGithubIssue = async ({ currRepository, title, body }) => {
        try{
            dispatch(githubIssueActions.setIsCreatingIssue(true))
            const res = await Api.GithubService.createGithubIssue({ currRepository, title, body })
            dispatch(githubIssueActions.setIsCreatingIssue(false))
            return res
        }catch(err){
            dispatch(githubIssueActions.setIsCreatingIssue(false))
            return
        }
    };

    const updateGithubIssue = async ({ currRepository, issue_number, ...updatedBody }) => {
        try{
            dispatch(githubIssueActions.setIsUpdatingIssue(true))
            const res = await Api.GithubService.updateGithubIssue({ currRepository, issue_number, ...updatedBody })
            dispatch(githubIssueActions.setIsUpdatingIssue(false))
            return res
        }catch(err){
            dispatch(githubIssueActions.setIsUpdatingIssue(false))
            return
        }
    };

    const getGithubIssue = async ({ currRepository, issue_number }) => {
        try{
            dispatch(githubIssueActions.setIsLoadingIssue(true))
            const res = await Api.GithubService.getGithubIssue({ currRepository, issue_number })
            dispatch(githubIssueActions.setIsLoadingIssue(false))
            return res
        }catch(err){
            dispatch(githubIssueActions.setIsLoadingIssue(false))
            return
        }
      };
    return {
        createGithubIssue,
        updateGithubIssue,
        getGithubIssue
    }
}