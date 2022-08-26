// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Token{
    uint public totalSupply = 10000 *10 ** 18;
    string public name = "My Token";
    string public symbol = "MDY";
    uint public decimal = 18;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address =>uint)) public allowance;

    event Transfer (address indexed from, address indexed to, uint value);
    event Approval(address indexed owner,address indexed spender,uint value);

    constructor(){
        balanceOf[msg.sender] = totalSupply;
    }

    function getBalance(address owner) public view returns(uint){
           return balanceOf[owner];
    }
    

    function transfer(address to,uint value) external returns (bool){
        require(balanceOf[msg.sender] >= value , "not enough funds");
        balanceOf[to] += value;
        balanceOf[msg.sender] -= value;
        emit Transfer(msg.sender,to,value);
        return true;
    }
  
    function approve (address spender,uint value) public returns (bool){
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender,spender,value);
        return true;
    }

    function transferFrom(address from,address to,uint value) public returns (bool){
        require(balanceOf[from] >=value, "balance too low");
        require(allowance[from][msg.sender] >= value, "allowance too low" );
        balanceOf[to] += value;
        balanceOf[from] -= value;
        emit Transfer(from,to,value);
        return true;
    }
}