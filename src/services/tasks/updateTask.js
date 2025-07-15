import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/tasks/`;
export function updateTask(id, obj) {
  return httpService.put(`${apiEndpoint}${id}`, obj);
}
export default {
  updateTask,
};