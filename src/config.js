const BASE_URL = "http://43.201.244.153:9001";
const BC_URL = "http://43.201.244.153:9002";

export const API = {
  SIGNUP: `${BASE_URL}/member/signup`,
  SIGNIN: `${BASE_URL}/member/signin`,
  GETWALLETADDRESS: `${BC_URL}/contract/wallet`,
  WALLETGENERATE: `${BC_URL}/contract/wallet/create`,
};
