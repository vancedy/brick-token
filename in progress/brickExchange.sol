pragma solidity ^0.7.3;

/**
@dev a centralized order book 
 */
contract brickExchange{
    address czar;
    uint16 exchangeRate;

    constructor(uint _exchangeRate){
        czar = msg.sender;
        exchangeRate = _exchangeRate;
    }

    function buy(uint amount){
        require(msg.sender.balance>amount*exchangeRate, "you don't have enough ETH.")
        



    }


}