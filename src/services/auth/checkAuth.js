import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/users/check_auth`;

export function checkUserAuth(token) {

  return httpService.get(apiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-store,no-cache, must-revalidate,proxy-validate",
    },
  });
}
