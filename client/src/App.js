import Body from './Components/Body'
import appStore from "./utils/appStore";
import { Provider } from 'react-redux';

function App() {
    return (
        <div className="App font-poppins">
            <Provider store={appStore}>
              <Body/>
            </Provider>
        </div>
    );
}

export default App;
