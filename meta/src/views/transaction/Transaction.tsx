import React,{ useState }  from 'react'
import { useDebounce } from 'use-debounce'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,  
} from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import QRCodeJs from '../qrcode/QRCodeJs';
// import {QRCodeCanvas} from 'qrcode.react';

import { utils } from 'ethers'

import "./transaction.scss"
import { create } from 'domain';

export function Transaction() {
  const [to, setTo] = useState('')
  const [debouncedTo] = useDebounce(to, 500)
 
  const [amount, setAmount] = useState('')
  const [debouncedAmount] = useDebounce(amount.replace('$', ''), 500)  

  const [qrOnOff, setQrOnOff] = useState(false);
  const [ethAddress, setEthAddress] = useState('');  
 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {    
    const inputValue = event.target.value;
    // 숫자만 남기고 $ 기호는 제거    
    const numericValue = inputValue.replace('$', '');          
    const numericLenth = numericValue.split('.').length -1;    
    if(Number(numericValue) || numericValue === "0" || numericLenth <= 1){            
      // 숫자를 다시 $ 기호와 함께 넣기                  
      const formattedValue = `$${numericValue}`;      
        if (/^[\d]*\.?[\d]{0,16}$/.test(numericValue)) {
          setAmount(formattedValue);                      
        }else{      
          setAmount(amount);  
        }                          
    }
  };
 

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
    },
  })
  const { data, sendTransaction } = useSendTransaction(config)
 
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
    

  const createQrcode = () => {
    console.log(to)
      if (!/^(0x)?[0-9a-f]{40}$/i.test(to)) {
        console.log("주소가 맞지 않음")
      }else{
        console.log("유효성주소")
        console.log(amount)       
        const etherAmount = amount.replace('$', '');       

        const etherSum = `ethereum:${to}?value=${etherAmount}`   
        // const etherSum2 =`ethereum:${"0xfD23aFe83871993a109A29212E9631DDA5046839"}?value=${0.0001}`
        console.log(etherSum);
        // console.log(etherSum2);
        setQrOnOff(true);
        setEthAddress(etherSum)
      }   
    
    // const ss = `ethereum:${to}?value=${amount}`
    // setEthAddress(ss);
    // ethAddress
    // `ethereum:${"0xfD23aFe83871993a109A29212E9631DDA5046839"}?value=${0.0001}`

  }

  return (
     
      <div className="trans-content">
        
        {qrOnOff && (
          <div className="qr-box">
            <QRCodeJs ethAddress={ethAddress} />          
          </div>
        )}        
                
        <div className="trans-form">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendTransaction?.()
            }}
          >    
          <p>
            <span className="tit">Address</span>
            <input
              className="recipi"
              aria-label="Recipient"
              onChange={(e) => setTo(e.target.value)}
              placeholder="0xA0Cf…251e"
              value={to}
            />
          </p>      
          <p>      
          <span className="tit">Amount</span>
          <input
            className="amount"
            aria-label="Amount (ether)"
            onChange={(e) => handleChange(e)}
            placeholder="0.01"
            value={amount}                
          />
          </p>
          <div className="btn-box">
            {/* <button className="btn blueline">
              create qrcode
            </button> */}
            <button className="btn blue" disabled={isLoading || !sendTransaction || !to || !amount}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div> 
          </form>
          <button className="btn blueline btn-create"
                  onClick={()=> createQrcode()}
          >
              Qrcode
          </button>       
        </div>
        {isSuccess && (
        <div className="success-content">
          Successfully 
          <p>Sent  : {amount}</p> 
          <p>Ether : {to}</p>
        </div>
        )}    
        
    </div>    
  )
}
export default Transaction;