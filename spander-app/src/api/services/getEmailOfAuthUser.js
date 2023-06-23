import { Api } from '..';

export class GetEmailOfAuthUser {
  static getEmailOfAuthUser = async () => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      const userEmail = await octoKitService.request({ method: 'GET', url: '/user/public_emails', options:{} });

      if (!userEmail) {
        reject(new Error('Error!'));
      }
      resolve(userEmail?.data);
    });
  };
}
