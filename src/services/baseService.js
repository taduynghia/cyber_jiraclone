import axios from "axios";
import {
  KEY_TOKEN_CYBERSOLF,
  DOMAIN_CYBERBUG,
  TOKEN_CYBERSOLF,
  AUTHORIZATION,
  TOKEN,
} from "../ultil/constants/settingSystem.js";

export class baseService {
  //Put json về phía backend
  put = (url, model) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        [KEY_TOKEN_CYBERSOLF]: TOKEN_CYBERSOLF,
        [AUTHORIZATION]: "Bearer " + localStorage.getItem(TOKEN),
      },
    });
  };
  //post
  post = (url, model) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "POST",
      data: model,
      headers: {
        [KEY_TOKEN_CYBERSOLF]: TOKEN_CYBERSOLF,
        [AUTHORIZATION]: "Bearer " + localStorage.getItem(TOKEN),
      },
    });
  };

  //get
  get = (url) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "GET",
      headers: {
        [KEY_TOKEN_CYBERSOLF]: TOKEN_CYBERSOLF,
        [AUTHORIZATION]: "Bearer " + localStorage.getItem(TOKEN),
      },
    });
  };
  //delete
  delete = (url) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "DELETE",
      headers: {
        [KEY_TOKEN_CYBERSOLF]: TOKEN_CYBERSOLF,
        [AUTHORIZATION]: "Bearer " + localStorage.getItem(TOKEN),
      },
    });
  };
}
