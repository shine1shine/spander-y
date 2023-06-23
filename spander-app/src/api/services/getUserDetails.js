import { Octokit } from '@octokit/core';
import { getToken } from '../../utils/accessToken';
import logoutHandler from '../../utils/logoutHandler';
import { Api } from '..';

export class getUserDetails {
  static getUserDetails = async () => {
    return new Promise(async (resolve, reject) => {
        const octoKitService = new Api.OctoKitService();
      try {
        const userData = await octoKitService.request({method:'GET',url:'/user'});
        if (!userData) {
          reject(new Error('Error!'));
        }
        resolve(userData.data);
      } catch (err) {
        if (err.status === 401) {
          logoutHandler();
        }
      }
    });
  };
}
