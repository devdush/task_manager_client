import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/tasks/`;
export function createTask(obj) {
  return httpService.post(apiEndpoint, obj);
}

export default {
  createTask,
};
