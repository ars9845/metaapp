// necessary set
import React,{ useState, useEffect }  from 'react'
import {  useAccount, useEnsAvatar, useEnsName, usePrepareSendTransaction, useSendTransaction, useWaitForTransaction, useDisconnect, useConnect} from 'wagmi'
import { useDebounce } from 'use-debounce'
import { utils } from 'ethers'

// need style
import "@views/transaction/transaction.scss"

/**
 * @author ars9845
 * @description
 * Transaction form
 */
export function Transaction() {

  // Connectors 관련 hook
  const { address, connector, isConnected } = useAccount()  
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()  

  // amount 관련 hook
  const [to, setTo] = useState('')
  const [debouncedTo] = useDebounce(to, 500) 
  const [amount, setAmount] = useState('')
  const [debouncedAmount] = useDebounce(amount.replace('$', ''), 500) 
  
  // send 관련 hook  
  const [errorCode, setErrorCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { config, error} = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
    },
    onError(error:any){    
      // console.log(error.error.message);
      // console.log(error.code);         
     if(error.code=== "INSUFFICIENT_FUNDS"){        
      setErrorCode(error.code)
      setErrorMessage(error.error.message)      
     }
    }    
  })

  const { data, sendTransaction } = useSendTransaction(config)  
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,     
  })
      

  // 지갑연결시 주소 셋팅
  useEffect(() => {
    if(address){
      setTo(address);   
    }    
  },[]);

  // amount event
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
     
  // const createQrcode = () => {
  //   console.log(to)
  //     if (!/^(0x)?[0-9a-f]{40}$/i.test(to)) {
  //       console.log("주소가 맞지 않음")
  //     }else{
  //       console.log("유효성주소")
  //       console.log(amount)       
  //       const etherAmount = amount.replace('$', '');       
  //       const etherSum = `ethereum:${to}?value=${etherAmount}`   
  //       // const etherSum2 =`ethereum:${"0xfD23aFe83871993a109A29212E9631DDA5046839"}?value=${0.0001}`
  //       console.log(etherSum);        
  //     }       
  //   // const ss = `ethereum:${to}?value=${amount}`
  //   // setEthAddress(ss);
  //   // ethAddress
  //   // `ethereum:${"0xfD23aFe83871993a109A29212E9631DDA5046839"}?value=${0.0001}`
  // }

  return (     
      <div className="trans-content">            
        <div className="trans-form">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendTransaction?.()
            }}
          >    
          <div className="btn-box">
            <button className="btn-disconnect" onClick={()=> disconnect()}>Disconnect</button>
          </div>   
          <div className="form-box">
            <span className="tit">Address</span>
            <input
              className="recipi"
              aria-label="Recipient"
              onChange={(e) => setTo(e.target.value)}
              placeholder={address}
              value={to}
            />
          </div>      
          <div className="form-box">     
            <span className="tit">Amount</span>
            <input
              className="amount"
              aria-label="Amount (ether)"
              onChange={(e) => handleChange(e)}
              placeholder="0.01"
              value={amount}                
            />
          </div>
          <div className="btn-box">          
            <button className="btn black" disabled={isLoading || !sendTransaction || !to || !amount}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div> 
          </form>               
        </div>
        {isSuccess && (
        <div className="trans-success">
          <p className="success-txt">Successfully</p>
          <p className="sent-txt">Sent  : <span>{amount}</span></p> 
          <p className="ether-txt">Ether :  <span>{to}</span></p>
        </div>
        )}

      {error && (
        <div className="error-code">
          <div className="tit">Code : {errorCode}</div>
          <div className="txt">Message : {errorMessage}</div>
        </div>
        // <div>An error occurred preparing the transaction: {error.message}</div>
      )}
    </div>    
  )
}
export default Transaction;