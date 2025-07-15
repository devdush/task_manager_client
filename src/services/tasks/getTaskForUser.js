import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/tasks/user/`;
export function getTaskForUser(id) {
  return httpService.get(`${apiEndpoint}${id}`);
}
export default {
  getTaskForUser,
};
