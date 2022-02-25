import axios from "axios";
import {
  DOMAIN_CYBERBUG,
  KEY_TOKEN_CYBERSOLF,
  TOKEN_CYBERSOLF,
  TOKEN,
  AUTHORIZATION,
} from "../ultil/constants/settingSystem";

//hàm khởi tạo đối tượng
export class CyberBugService {
  constructor() {}
  //phương thức
  signinCyberBugs = (userLogin) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/api/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  };
  getAllProjectCategory = () => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/api/ProjectCategory`,
      method: "GET",
      headers: {
        [KEY_TOKEN_CYBERSOLF]: TOKEN_CYBERSOLF,
      },
    });
  };
  createProjectAuthorizarion = (newProject) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/api/Project/createProjectAuthorize`,
      method: "POST",
      headers: {
        [KEY_TOKEN_CYBERSOLF]: TOKEN_CYBERSOLF,
        [AUTHORIZATION]: "Bearer " + localStorage.getItem(TOKEN),
      },
      data: newProject,
    });
  };
  getAllProjecAuthorization = () => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/api/Project/getAllProject`,
      method: "GET",
      headers: {
        [KEY_TOKEN_CYBERSOLF]: TOKEN_CYBERSOLF,
        [AUTHORIZATION]: "Bearer " + localStorage.getItem(TOKEN),
      },
    });
  };

  updateContentProject = (projectUpdate) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/api/Project/updateProject?projectId=${projectUpdate.id}`,
      method: "PUT",
      data: projectUpdate,
      headers: {
        [KEY_TOKEN_CYBERSOLF]: TOKEN_CYBERSOLF,
        [AUTHORIZATION]: "Bearer " + localStorage.getItem(TOKEN),
      },
    });
  };
}
export const cyberBugService = new CyberBugService();
