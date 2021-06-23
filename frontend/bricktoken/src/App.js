import React, {useState, useEffect} from 'react';
import './App.css';
import { useStoreApi } from './scripts/storeAPI';
import { Grid, TextField ,Button, AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import { useWeb3 } from './scripts/getWeb3';
import { accessSync } from 'fs';
const { ethers, Contract } = require("ethers");


function App() {
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const {address, balance, message, BRCKbalance, setBalance, setBRCKBalance, setAddress} = useStoreApi();
  const {web3, contract} = useWeb3();

  const loginHandler = async() => {
    if(window.ethereum){
      await window.ethereum.enable();
      web3.eth.getAccounts().then(accounts=>{
        setAddress(accounts[0])
        setUserBalance(accounts[0])
        setUserBRCKBalance(accounts[0])
      })
    }
  }

  const setUserBalance = async(fromAddress) => {
    await web3.eth.getBalance(fromAddress).then((value)=>{
      const credit = web3.utils.fromWei(value, 'ether')
      setBalance(credit);
    })
  }

  const setUserBRCKBalance = async(fromAddress) => {
    await contract.methods.balanceOf(fromAddress).call({from: fromAddress}).then((value)=>{
      console.log(value + " - User's balance in brck")
      setBRCKBalance(value);
    }) 
  }

  // TODO: Add in input verification. 
  const sendHandler = async(e) => {
    e.preventDefault();
    
    console.log("Initiate sending BRCK to correct user")
    
    const amount = e.target[1].value;
    const sendAddress = e.target[0].value;
    console.log(amount)
    console.log(sendAddress)

    await contract.methods.transfer(sendAddress, amount).send({from: address}).then((receipt)=>{
      console.log(receipt)
      setUserBRCKBalance(address)
    })

  }

  const initialmessage = 'your eth addy here'
  const initialmessage2 = 'your balance in $BRCK'
  
  return (
    <div className="App">
      <header className="App-header">
      <Grid container spacing={3}>
        <Grid item xs={4}>
        <p> Brick Token Yuh</p>
        </Grid>
        <Grid item xs={4}>
        <p id="account">{address ? address : initialmessage} </p>
        </Grid>
        <Grid item xs={4}>
          <button onClick={loginHandler}>Login</button>
        </Grid>
      <Grid item xs={6}>
      <p id="balance">{BRCKbalance ? BRCKbalance : initialmessage2}</p>
      </Grid>
      <Grid item xs={6}>
        <form noValidate autoComplete="off" onSubmit={(e)=>sendHandler(e)}>
          <div>
            <TextField required id="recipient" label="Recipient" defaultValue=""/>
            <TextField required id="amount" label="Amount" defaultValue=""/>
          </div>
          <Button
          variant="outlined"
          color="default"
          type="submit">
            Send BRCK
          </Button>
        </form>
      </Grid>
      </Grid>
      </header>
    </div>
  );
}

export default App;
