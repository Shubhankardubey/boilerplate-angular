// typing implementation of CONFIG to make it work with AOT
declare const CONFIG: {
  env: string,
  apiEndpoint: string,
  sentryDSN: string,
  sentryENV: string,
  serverLogUrl: string,
  intercomAppId: string,
  mixpanelToken: string,
  gaTrackingId: string
};

export default CONFIG;
