import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/users/login`;

export function loginUser(obj) {
console.log(apiEndpoint);
  return httpService.post(
    apiEndpoint,
    {
      email: obj.email,
      password: obj.password,
    },

  );
}
export default {
  loginUser,
};
