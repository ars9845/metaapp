import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

 
import Connectors from './views/connectors/Connectors'


const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
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
