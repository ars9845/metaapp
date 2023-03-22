// import React from 'react'
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

  if (isConnected) {
    return (
      <Transaction />
    )
  }
 
  return (
    <div className="connect-content">
      {connectors.map((connector, idx) => (                
        
        <button        
          className={isLoading ? "btn-connect isload" : "btn-connect"}
          style={{"--clr": "#1149ff"} as React.CSSProperties}          
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
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