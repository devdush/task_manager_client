import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/tasks/status/`;
export function updateStatus(id, obj) {
  return httpService.put(`${apiEndpoint}${id}`, {status: obj});
}
export default {
  updateStatus,
};
