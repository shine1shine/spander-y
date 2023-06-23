import { Api } from '../..';
import logoutHandler from '../../../utils/logoutHandler';

export class RepositoryService {
  static addNewRepository = async ({ name, description, isPrivate, owner, currentUser }) => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      const requestOptions = {
        name: name,
        description: description,
        private: isPrivate,
        auto_init: false,
      };
      const loginRequestOption = {
        name: name,
        description: description,
        org: owner,
        private: isPrivate,
        auto_init: false,
      };
      const response =
        owner === currentUser?.login
          ? await octoKitService.request({ method: 'POST', url: '/user/repos', options: requestOptions })
          : await octoKitService
              .request({ method: 'POST', url: '/orgs/{org}/repos', options: loginRequestOption })
              .catch((err) => (err.status === 422 ? { nameExists: true } : err.message));
      if (!response) {
        reject(new Error('Error!'));
      }
      resolve(response);
    });
  };
  static getAllRepositories = async (count = 1) => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      const requestOptions = {
        sort: 'created',
        direction: 'desc',
        per_page: 100,
        page: count,
      };
      try {
        const allRepos = await octoKitService.request({
          method: 'GET',
          url: '/user/repos',
          options: requestOptions,
        });
        if (!allRepos) {
          reject(new Error('Error!'));
        }
        if (allRepos?.data?.length < 100) {
          resolve(allRepos.data);
          return;
        } else {
          const nextPageData = await this.getAllRepositories(count + 1);
          const data = (allRepos.data || []).concat(nextPageData || []);
          resolve(data);
        }
      } catch (err) {
        if (err.status === 401) {
          logoutHandler();
        }
      }
    });
  };
  static getAllRepositoriesByPage = async (page = 1, perPage = 9) => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      const options = {
        sort: 'created',
        direction: 'desc',
        per_page: perPage,
        page: page,
      };
      try {
        const allRepos = await octoKitService.request({ method: 'GET', url: '/user/repos', options: options });
        if (!allRepos) {
          reject(new Error('Error!'));
        }
        resolve({ data: allRepos.data, page, perPage, isLastPage: allRepos.data?.length < perPage });
      } catch (err) {
        if (err.status === 401) {
          logoutHandler();
        }
      }
    });
  };
  static getRepository = async (id) => {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        resolve({ notFound: true });
      }
      const octoKitService = new Api.OctoKitService();
      try {
        const Repo = await octoKitService.request({ method: 'GET', url: '/repositories/:id', options: { id } });

        if (!Repo) {
          reject(new Error('Error!'));
          return;
        }
        if (Repo.data) {
          resolve(Repo.data);
          return;
        }
      } catch (err) {
        if (err.status == 404) {
          window.location.href = '/404';
        }
        if (err.status == 401) {
          logoutHandler();
        }
      }
    });
  };
  static getRepositoryCollaborators = async ({ owner, repo }) => {
    return new Promise(async (resolve, reject) => {
      const octoKitService = new Api.OctoKitService();
      const options = {
        owner: owner,
        repo: repo,
      };
      if (owner && repo) {
        const response = octoKitService.request({
          method: 'GET',
          url: '/repos/{owner}/{repo}/collaborators',
          options: options,
        });

        if (!response) {
          reject(new Error('Error has occured while fetching'));
        }

        resolve(response);
      }
    });
  };
}
