import { Octokit } from "@octokit/core";
import { getToken } from "../../../utils/getToken";

export class OctoKitService {
    octokit
    constructor() {
        this.octokit = new Octokit({
            auth: getToken(),
        });
    }

    request = ({ url, method, options }) => {
        return this.octokit.request(`${method} ${url}`, options);
    }
}