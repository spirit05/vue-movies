function setParams(config) {
  const params = config.params || {};
  const appParams = {
    apikey: process.env.VUE_APP_API_KEY,
    plot: "full",
  };
  config.params = Object.assign(params, appParams);
  return config;
}

function responseData(res) {
  return res.data;
}

export default function (axios) {
  axios.interceptors.request.use(setParams);
  axios.interceptors.response.use(responseData);
}
