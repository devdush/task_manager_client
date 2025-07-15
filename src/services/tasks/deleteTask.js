import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/tasks/`;
export function deleteTask(id) {

  return httpService.delete(`${apiEndpoint}${id}`);
}
export default {
  deleteTask,
};
