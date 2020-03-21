import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-key"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-key"];
  }
};

export default setAuthToken;
