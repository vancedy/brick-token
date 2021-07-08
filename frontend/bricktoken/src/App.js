import React, {useState} from 'react';
import './App.css';
import { useStoreApi } from './scripts/storeAPI';
import { Grid, TextField } from '@material-ui/core';
import { useWeb3 } from './scripts/getWeb3';
import { Image, Box, Flex, Text, Link, Button , Card, Heading} from 'rebass';
import brick from './assets/brick.png'
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
} from '@rebass/forms'


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
      

      <Flex
      px={2}
      color="white"
      bg="#23272a"
      alignItems='center'>
        <Image 
        src={brick}
        ml='5vh'
        width={1/10}
        sx={{
          width: '8%'
        }}  />      
        <Text 
        width={1/2}
        fontFamily='monospace'
        fontWeight='bold'
        lineHeight='body'
        textAlign='center'
        ml={0}
        >
          
          Brick Token Yuh</Text>
        <Box width={1}/>
        <Button
        bg='#5E2BFF'
        color="white"
        mr= '5vw'
        my={3}
        width={1/4}
        onClick={loginHandler}
        >
          <Text
        fontFamily='monospace'
        fontWeight='bold'
        textAlign='center'

 >
          Login
        </Text>
        </Button>
      
      </Flex>
      <Flex
      alignItems='center'
      justifyItems='center'
      >

    <Card
        fontSize={3}
        bg="#5E2BFF"
        my={3}
        mx={10}
        
      >



      <Grid container spacing={3}>
       
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
      <Box
        as='form'
        noValidate
        onSubmit={(e)=>sendHandler(e)}>
          <Box width={1/2} px={2}>
            <Label htmlFor='address'>
              address
            </Label>
            <Input
            id='address'
            name='address'
            defaultValue='0x0'/>

            <Label htmlFor='amount'>
              amount to send
            </Label>
            <Input
            id='amount'
            name='amount'
            defaultValue='420'/>

          </Box>
          <Box px={2} ml='auto'>
            <Button
            
            type="submit"
            >
              Senddit
            </Button>
          </Box>

 


      </Box>



      <Heading>Welcome to the matrix, 
        
        <Text
          fontStyle='italic'
          color="white"
        >
            {address ? address : initialmessage}
        </Text>

            
            </Heading>

      </Card>



      </Flex>
      </header>
    </div>
  );
}

export default App;
