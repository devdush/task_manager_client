import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/tasks/user-chart-data`;

export const getUserChartData = (id) => {
  return httpService.get(`${apiEndpoint}/${id}`);
};
export default {
  getUserChartData,
};
