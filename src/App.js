
import './App.css';
import contractABI from "./erc20ABI.json";
import {ethers,} from  "ethers"; // Libraray for interecting with the smart contract from frontend
import { useEffect,useState,useRef } from 'react';

const contractAddress = "0x3643be4F0B58408C3Cd71045305Ebe0eC801BF40";



function App() {
  //connecting
const [accounts,setAccounts]= useState([])
async function connectAccunts (){
      if(window.ethereum){
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        setAccounts(accounts);
      }
}

useEffect(()=>{
connectAccunts();
},[]);
 
// Reading data from smart  contract

const [tokenName, settokenName] = useState("")
const [tokenSymbol, settokenSymbol] = useState("")
const [totalsupply, settotalsupply] = useState("")

const getInfo = async () =>{

const provider = new ethers.providers.Web3Provider(window.ethereum);

const erc20contract = new ethers.Contract(contractAddress,contractABI,provider);

const tokenName = await erc20contract.name();
const tokenSymbol = await erc20contract.symbol();
const totalsupply= await erc20contract.totalSupply();

settokenName(tokenName);
settokenSymbol(tokenSymbol);
settotalsupply(totalsupply)

}
//Getting balance of an address
const [owner, setowner]= useState("")
const inputRef = useRef(null);

const fetchBalance = async () => {
  
const provider = new ethers.providers.Web3Provider(window.ethereum);


const erc20contract = new ethers.Contract(contractAddress,contractABI,provider);

const balance = await erc20contract.getBalance(inputRef.current.value);
setowner(balance)

}

// Writing to smart contract(transfering token)

const[address,setAddress] = useState("");
const[amount,setAmount] = useState("");

const send = async ()=>{

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()

  const erc20contract = new ethers.Contract(contractAddress,contractABI,signer);
   
  const data = await erc20contract.transfer(address,amount)
  await data.wait()
}
   
  return (
    <div>
      <h1>Web3 Decentralized Application</h1>
      <div className='main'>
        <div className='Top'>
        <h2>Read Data From Smart Contract</h2>
         <div>
         <button onClick={getInfo} className='info'>Get Info</button>
         </div>
            
        <div id='results'>
        <h4>Token Name:{tokenName}</h4>
        <h4>Token Symbol:{tokenSymbol}</h4>
        <h4>Total Supply:{totalsupply.toString()}</h4>
        <h4>Balance:{owner.toString()}</h4>
        <input ref={inputRef} type="text" placeholder="enter address here"></input>
        <div>
         <button onClick={fetchBalance} id='send'>Get address balance</button>
         </div>
        
        </div>
        </div>
      
      
      <div className='bottom'>
        <h2>Write To Smart Contract</h2>
         <div>
         <input onChange={e=>setAddress(e.target.value)} type="text" placeholder="enter address here"></input>
         </div>
         <div>
        <input onChange={e=>setAmount(e.target.value)} type="text" placeholder="enter amount"></input>
         </div>
        <div>
         <button onClick={send} id='send'>Send</button>
         </div>
      </div>

      </div>
    </div>
  );
}

export default App;
