import { Api } from '..';
export class GetReadmeDetails {
  static getReadmeDetails = async({ currRepository }) => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      const readmeOptions = {
        owner: currRepository?.owner?.login,
        repo: currRepository?.name,
        headers: {
          accept: 'application/vnd.github.html+json',
        },
      };

      let response = await octoKitService.request({
        method: 'GET',
        url: '/repos/{owner}/{repo}/readme',
        options: readmeOptions,
      });
      if (!response) {
        reject(new Error('Error in Repository content fetching!'));
      }

      resolve(response);
    });
  };
}
