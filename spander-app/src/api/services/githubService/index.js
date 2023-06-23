import { Api } from '../..';

export class GithubService {
  static createGithubIssue = async ({ currRepository, title, body }) => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      const requestOptions = {
        owner: currRepository?.owner?.login,
        repo: currRepository?.name,
        title,
        body,
        labels: ['Spander'],
      };

      const response = await octoKitService.request({
        method: 'POST',
        url: '/repos/{owner}/{repo}/issues',
        options: requestOptions,
      });

      if (!response) {
        reject(new Error('Error!'));
      }
      resolve(response);
    });
  };
  static updateGithubIssue = async ({ currRepository, issue_number, ...updatedBody }) => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      const requestOptions = {
        owner: currRepository?.owner?.login,
        repo: currRepository?.name,
        issue_number,
        ...updatedBody,
      };
      const response = await octoKitService.request({
        method: 'PATCH',
        url: '/repos/{owner}/{repo}/issues/{issue_number}',
        options: requestOptions,
      });

      if (!response) {
        reject(new Error('Error!'));
      }
      resolve(response);
    });
  };
  static getGithubIssue = async ({ currRepository, issue_number }) => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      const options = {
        owner: currRepository?.owner?.login,
        repo: currRepository?.name,
        issue_number,
        headers: {
          'If-None-Match': '',
        },
      };
      const response = octoKitService.request({
        method: 'GET',
        url: '/repos/{owner}/{repo}/issues/{issue_number}',
        options: options,
      });

      if (!response) {
        reject(new Error('Error!'));
      }

      resolve(response);
    });
  };
}
