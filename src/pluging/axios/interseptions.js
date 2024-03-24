function setParams(config) {
  const params = params.config || {};
  const appParams = {
    apiKey: process.env.VUE_APP_API_KEY,
    plot: "full",
  };
  config.params = Object.assign(params, appParams);
  return config;
}

export default function (axios) {
  axios.interceptors.request.use(setParams);
}
