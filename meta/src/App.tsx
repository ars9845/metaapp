import { WagmiConfig } from 'wagmi'

import clientProvider from '@components/clientProvider';

import Connectors from './views/connectors/Connectors'
import '@style/style.scss';
 
// app client
function App() {
  return (
    <WagmiConfig client={clientProvider}>
      <Connectors />
    </WagmiConfig>    
  )
}

export default App;
