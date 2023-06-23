import { Base64 } from 'js-base64';
import { Api } from '../..';
import { objToJson } from '../../../utils/json-utils';
export const  FILE_PATH  = '.spander/treeNode.txt';

export class TreeService {
  static getContentOfRepository = async ({ currRepository }) => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      const options = {
        owner: currRepository?.owner?.login,
        repo: currRepository?.name,
        path: FILE_PATH,
      };
      try {
        let response = await octoKitService.request({
          method: 'GET',
          url: '/repos/{owner}/{repo}/contents/{path}',
          options: options,
        });
        resolve(response);
      } catch (err) {
        const base64Content = Base64.encode(
          objToJson({
            name: currRepository?.name,
            uniqueIndex: 0,
            childNodes: [],
            parentNode: null,
            issueDetails: {},
            isGithubIssue: false,
            nonGithubIssueDetail: { markAsDone: false },
          })
        );
        await this.postContentToRepository({
          currRepository,
          user: currRepository?.owner?.login,
          base64Content: base64Content,
        });
        resolve(await Api.TreeService.postContentToRepository({ currRepository }));
      }
    });
  };
  static postContentToRepository = async ({ currRepository, user, base64Content }) => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      const options = {
        owner: currRepository?.owner?.login,
        repo: currRepository?.name,
        path: FILE_PATH,
        message: `Commit from Spander by ${user?.login}`,
        content: `${base64Content}`,
      };
      const response = await octoKitService.request({
        method: 'PUT',
        url: '/repos/{owner}/{repo}/contents/{path}',
        options: options,
      });
      if (!response) {
        reject(new Error('Error!'));
      }
      resolve(response);
    });
  };
  static updateContent = async ({ currRepository, user, base64Content, sHA }) => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      let userEmail = await Api.GetEmailOfAuthUser.getEmailOfAuthUser();
      const authEmail = Array.isArray(userEmail) && userEmail?.find((i) => i?.primary === true);
      const option = {
        owner: currRepository?.owner?.login,
        repo: currRepository?.name,
        path: FILE_PATH,
        message: `Commit from Spander by ${user?.login}`,
        committer: {
          name: user?.login,
          email: authEmail?.email,
        },
        content: `${base64Content}`,
        sha: sHA,
      };

      let response;
      if (authEmail.email) {
        response = await octoKitService.request({
          method: 'PUT',
          url: '/repos/{owner}/{repo}/contents/{path}',
          options: option,
        });
      }

      if (!response) {
        reject(new Error('Error!'));
      }
      resolve(response);
    });
  };
}
