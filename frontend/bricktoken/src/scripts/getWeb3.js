import Web3 from 'web3'
import { useEffect, useState } from 'react'
var Contract = require('web3-eth-contract');


export const useWeb3 = () =>{
    const [web3, setWeb3] = useState(null)
    const [contract,setContract] = useState(null)

    //NEEDS TO BE CHANGED EACH REDEPLOYMENT!!!
    const BRICKADDRESS = '0x62a5508abf5e9c570e531784dBb79d79a6D86EEe'

    const BrickTokenABI = 
    [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]


    useEffect(()=>{
        let web3Instance
        let contractInstance
        if(window.ethereum){
            try{
                web3Instance = new Web3(window.ethereum)
                Contract.setProvider(window.ethereum)
                contractInstance = new Contract(BrickTokenABI, BRICKADDRESS)
            } catch (error){
                console.error(error)
            }
        } else if(window.web3){
            web3Instance = new Web3(window.web3)
            Contract.setProvider(window.web3)
            contractInstance = new Contract(BrickTokenABI, BRICKADDRESS)
        } else {
            const provider = new Web3.provider.httpProvider('http://127.0.0.1:8545')
            web3Instance = new Web3(provider)
            contractInstance = new Contract(BrickTokenABI, BRICKADDRESS)
        }
        setWeb3(web3Instance)
        setContract(contractInstance)
    }, [])

    return {web3, contract};

}