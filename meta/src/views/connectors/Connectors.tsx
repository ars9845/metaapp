// necessary set
import React,{ useState }  from 'react'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName} from 'wagmi'

// need style
import "@views/connectors/connectors.scss"

// need content
import Transaction from '@views/transaction/Transaction'

/**
 * @author ars9845
 * @description
 * Connectors list
 */
export function Connectors() {  

  // Connectors 관련 hook
  const { address, connector, isConnected } = useAccount()    
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  // Connect 클릭시 관련  
  const [btnLoad, setBtnLoad] = useState(0);
  const onClickConnect = (idx:number, connector: any) =>{
    connect(connector)
    setBtnLoad(idx)    
  }  

  // Connectors 연결후 
  if (isConnected) {
    return (
      <Transaction />
    )
  }
 
  return (
    <div className="connect-content">      
      {connectors.map((connector, idx) => (                        
        <div className="btn-box"  key={connector.id}>
          {connector.ready && (
            <button        
              className={isLoading ? btnLoad === idx ? "btn-connect "+connector.name+" isload" : "btn-connect "+connector.name : "btn-connect "+connector.name}                   
              disabled={!connector.ready}           
              onClick={() => onClickConnect(idx, { connector })}
            >          
              <span>{connector.name}</span>
              <span className="ing-txt">                
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  ' (connecting)'}             
              </span>
              <i></i>                          
            </button>
          )}
                  
        </div>
      ))}       
      {error && <div className="err-txt">{error.message}</div>}
    </div>              
  )
}
export default Connectors;