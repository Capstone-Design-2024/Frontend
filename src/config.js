const BASE_URL = "http://itm.suitestudy.com";

export const API = {
  SIGNUP: `${BASE_URL}/member/signup`,
  SIGNIN: `${BASE_URL}/member/signin`,
  GETWALLETADDRESS: `${BASE_URL}/contract/wallet/`,
  WALLETGENERATE: `${BASE_URL}/contract/wallet/create`,
  READMYPROJECT: `${BASE_URL}/project/own`,
  READPROJECTS: `${BASE_URL}/project/p/other-project`,
  INITPROJECT: `${BASE_URL}/project/init`,
  REGISTERPROJECT: `${BASE_URL}/project/registration`,
  UPLOADIMAGE: `${BASE_URL}/project/thumbnail`,
  GETCONTRACTMETAINFO: `${BASE_URL}/contract/wallet/contract`,
  CHARGEPNPTOKEN: `${BASE_URL}/contract/wallet/mint/`,
  NFTREGISTRY: `${BASE_URL}/project/nft/registration`,
  GETPROJECT: `${BASE_URL}/contract/project/meta`,
};
