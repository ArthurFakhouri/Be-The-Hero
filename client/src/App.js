import './global.css'
import Routes from "./routes";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Routes />
      <ToastContainer autoClose={4000} />
    </div>
  );
}

export default App;
