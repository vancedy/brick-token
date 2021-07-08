// "SPDX-License-Identifier: MIT"
pragma solidity ^0.7.3;

/**
@dev a basic implementation of ERC20 without approve and allowance functions.
*/
contract brickToken {
  string TOKEN_NAME;
  string TOKEN_SYMBOL;
  uint supply;
  address admin;

  constructor(){
    TOKEN_NAME = "Brick Token";
    TOKEN_SYMBOL = "BRCK";
    supply = 0;
    //deployer of this contract? the same person who deployed the contract should be able to mint new tokens.
    admin = msg.sender;
    _mint(admin, 10000000000);
  }

  mapping(address => uint) userBalance;
  event Transfer(address indexed _from, address indexed _to, uint256 _value);


  //returns the name of the token
  function name() public view returns (string memory){
    return TOKEN_NAME;
  }
  function symbol() public view returns (string memory){
    return TOKEN_SYMBOL;
  }
  function totalSupply() public view returns (uint256){
    return supply;
  }
  function balanceOf(address _owner) public view returns (uint256 balance){
    return userBalance[_owner];
  }
  function transfer(address _to, uint256 _value) public{
    require(userBalance[msg.sender]>_value, 'Not enough BRCK to spend.');
    userBalance[msg.sender]-=_value;
    userBalance[_to]+=_value;
    emit Transfer(msg.sender, _to, _value);
  }

  // Minting function, restricted to contract deployment
  function _mint(address _to, uint256 _value) private {
    require(msg.sender==admin, "must be admin to mint");
    userBalance[_to]+=_value;
    supply = supply + _value;
  }
}
