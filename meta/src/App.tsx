import { 
  WagmiConfig, createClient, configureChains, 
  mainnet, goerli  
} from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask' 
import Connectors from './views/connectors/Connectors'

import "./app.scss"

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [infuraProvider({ apiKey: '0002457bd5404ab3a48c9f35b76a4eb6' }), publicProvider()],
)
 
// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })    
  ],
  provider,
  webSocketProvider,
})
 
// Pass client to React Context Provider
function App() {
  return (
    <WagmiConfig client={client}>
      <Connectors />
    </WagmiConfig>
  )
}

export default App;
