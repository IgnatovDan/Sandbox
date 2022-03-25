import logo from './logo.svg';
import './App.css';
import './index.css';
import store from './lib/store';
import InboxScreen from './components/inboxScreen';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={ store }>
      <InboxScreen />
    </Provider>
  );
}

export default App;
