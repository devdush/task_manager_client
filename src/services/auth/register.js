import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/users/register`;

export function registerUser(obj) {
    console.log("Registering user with data:", obj);
  return httpService.post(apiEndpoint, obj);
}

export default {
  registerUser,
};
