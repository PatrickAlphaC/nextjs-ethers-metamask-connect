import type { NextPage } from "next";
import { ethers } from "ethers";
import { useState } from "react";

const Home: NextPage = () => {
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >(undefined);

  async function connect() {
    // await (window as any).ethereum.enable();
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    setSigner(signer);
  }

  async function executeContract() {
    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const abi = [
      {
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_favoriteNumber",
            type: "uint256",
          },
        ],
        name: "addPerson",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        name: "nameToFavoriteNumber",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "people",
        outputs: [
          {
            internalType: "uint256",
            name: "favoriteNumber",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "retrieve",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_favoriteNumber",
            type: "uint256",
          },
        ],
        name: "store",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      await contract.store(42);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button onClick={() => connect()}>Connect</button>
      <button onClick={() => executeContract()}>Execute</button>
    </>
  );
};

export default Home;
