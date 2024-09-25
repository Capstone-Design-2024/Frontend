import { provider, adminSign } from "./provider/provider";
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

  async projects(projectId) {
    await this.ready;
    const result = await this.contract.projects(projectId);

    return result.toString();
  }

  async buyProject(clientPrKey, projectId, payment) {
    await this.ready;
    const clientWallet = new ethers.Wallet(clientPrKey, provider);
    const clientSign = clientWallet.connect(provider);

    const params = [projectId, payment];

    const data = this.contract.interface.encodeFunctionData(
      "buyProject",
      params
    );

    const tx = {
      to: this.contract.target,
      data,
    };

    const gasAmount = await clientSign.estimateGas(tx);

    const gasEstimate = await provider.getFeeData();
    const maxPriorityFeePerGas = gasEstimate.maxPriorityFeePerGas;

    const extraDonate = (maxPriorityFeePerGas * gasAmount) / 10n;

    console.log(
      `donation amount : ${maxPriorityFeePerGas * gasAmount + extraDonate}`
    );
    const donateTx = {
      to: clientSign.address,
      value: maxPriorityFeePerGas * gasAmount + extraDonate,
    };
    const receipt = await adminSign.sendTransaction(donateTx);
    console.log(`수수료 사용자 전달 완료`);

    console.log(`========구매 서명 시작========`);
    const signedTx = await clientSign.sendTransaction(tx);

    const clientReceipt = await signedTx.wait();
    console.log(`========구매 완료========`);

    return clientReceipt;
  }

  async estimateGasForClient(clientSign, data) {
    const tx = {
      to: this.contract.target,
      data,
    };

    const gasAmount = await clientSign.estimateGas(tx);

    const gasEstimate = await provider.getFeeData();
    const maxPriorityFeePerGas = gasEstimate.maxPriorityFeePerGas;

    const extraDonate = (maxPriorityFeePerGas * gasAmount) / 10n;

    console.log(
      `donation amount : ${maxPriorityFeePerGas * gasAmount + extraDonate}`
    );

    const donateTx = {
      to: clientSign.address,
      value: maxPriorityFeePerGas * gasAmount + extraDonate,
    };
    const receipt = await adminSign.sendTransaction(donateTx);
    console.log(`수수료 사용자 전달 완료`);

    return receipt;
  }
}

export default ERC20Contract;
