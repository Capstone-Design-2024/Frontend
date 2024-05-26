// const BASE_URL = "http://43.201.244.153:9001";
// const BC_URL = "http://43.201.244.153:9002";

const BASE_URL = "http://itm.suitestudy.com";
// const BC_URL = "http://itm.suitestudy.com";

export const API = {
  SIGNUP: `${BASE_URL}/member/signup`,
  SIGNIN: `${BASE_URL}/member/signin`,
  GETWALLETADDRESS: `${BASE_URL}/contract/wallet/`,
  WALLETGENERATE: `${BASE_URL}/contract/wallet/create`,
  READMYPROJECT: `${BASE_URL}/project/own`,
  READPROJECTS: `${BASE_URL}/project/`,
  INITPROJECT: `${BASE_URL}/project/init`,
  REGISTERPROJECT: `${BASE_URL}/project/registration`,
  UPLOADIMAGE: `${BASE_URL}/project/thumbnail`,
  GETCONTRACTMETAINFO: `${BASE_URL}/contract/wallet/contract`,
  CHARGEPNPTOKEN: `${BASE_URL}/contract/wallet/mint/`,
};
