import { provider } from "./provider/provider";
import { ethers } from "ethers";
import { API } from "../config";
import axios from "axios";

const contract_id = import.meta.env.VITE_APP_CONTRACT_ID;
const admin_token = import.meta.env.VITE_APP_ADMIN_TOKEN;

class ERC20Contract {
  static instance = null;
  contract = null;
  ready = null;

  constructor() {
    this.ready = this.getContractInfo().then((contract) => {
      console.log(contract.abi);
      this.contract = new ethers.Contract(
        contract.address,
        contract.abi,
        provider
      );
    });
  }

  async getContractInfo() {
    const response = await axios.post(
      `${API.GETCONTRACTMETAINFO}`,
      { contract_id },
      {
        headers: {
          Authorization: `Bearer ${admin_token}`,
        },
      }
    );
    console.log(response);
    return {
      address: response.data.contractMetaInfo[0].address,
      abi: response.data.contractMetaInfo[0].abi,
    };
  }

  static async getInstance() {
    if (!ERC20Contract.instance) {
      ERC20Contract.instance = new ERC20Contract();
    }

    await ERC20Contract.instance.ready;
    return ERC20Contract.instance;
  }

  // Contract ABI's
  async initialSupply() {
    await this.ready;
    const result = await this.contract.totalSupply();
    console.log(`ERC20 PPT initial supply amount is: ${result}`);
    return result.toString();
  }

  async balanceOf(owner) {
    await this.ready;
    const result = await this.contract.balanceOf(owner);
    console.log(`Address ${owner} balance is: ${result}`);
    return result.toString();
  }
}

export default ERC20Contract;
