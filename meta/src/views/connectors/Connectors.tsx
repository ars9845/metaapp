// import React from 'react'
import React,{ useState }  from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'

import Transaction from '../transaction/Transaction'

import "./connectors.scss"

export function Connectors() {  
  const { address, connector, isConnected } = useAccount()  
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  console.log(address)
  console.log(ensAvatar)
  console.log(ensName)
  console.log(isConnected)

  const [btnLoad, setBtnLoad] = useState(0);
  const onClickConnect = (idx:number, connector: any) =>{
    connect(connector)
    setBtnLoad(idx)    
  }  

  

  if (isConnected) {
    return (
      <Transaction />
    )
  }
 
  return (
    <div className="connect-content">      
      {connectors.map((connector, idx) => (                
        
        <button        
          className={isLoading ? btnLoad === idx ? "btn-connect isload" : "btn-connect" : "btn-connect"}
          style={{"--clr": "#1149ff"} as React.CSSProperties}          
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => onClickConnect(idx, { connector })}
        >          
          <span>{connector.name}</span>
          <span className="ing-txt">
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}             
          </span>
          <i></i>                          
        </button>
        
      ))}
 
      {error && <div className="err-txt">{error.message}</div>}
    </div>              
  )
}
export default Connectors;