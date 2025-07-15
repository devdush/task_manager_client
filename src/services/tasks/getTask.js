import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/tasks/`;
export function getTasks() {
  return httpService.get(apiEndpoint);
}
export default {
  getTasks,
};
