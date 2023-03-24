// necessary set
import { WagmiConfig } from 'wagmi'

// need style
import '@style/style.scss';
import '@/app.scss';

// need content
import clientProvider from '@components/clientProvider';
import Connectors from '@views/connectors/Connectors'


/**
 * @author ars9845
 * @description
 * app client
 */
function App() {
  return (
    <WagmiConfig client={clientProvider}>
      <div className="container">
        <div className="bg-gradients">
          <div className="purple"></div>
          <div className="orange"></div>
          <div className="cyan"></div>
          <div className="cyan2"></div>
        </div>        
        <div className="title-box">
         <h1>Meta Connectors</h1>
        </div>
        <Connectors />
        <div className="footer">Ethereum Connect react project</div>
      </div>
    </WagmiConfig>    
  )
}
export default App;
