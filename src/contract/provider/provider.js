import { ethers } from "ethers";

// .env 파일에서 설정한 환경 변수를 가져옵니다.
const rpcUrl = import.meta.env.VITE_APP_POLYGON_AMOY_RPC_URL;

export const provider = new ethers.JsonRpcProvider(rpcUrl);
