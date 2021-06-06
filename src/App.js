import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Rootrouter from './router/Rootrouter';

export default function App() {
  return (
    <>
      <Rootrouter />
      <ToastContainer />
    </>
  );
}
