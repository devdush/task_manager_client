import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/tasks/chart-data`;
export function getPieChartData() {
  return httpService.get(apiEndpoint);
}
export default {
  getPieChartData,
};
