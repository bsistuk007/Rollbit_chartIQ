import './App.css';
import "./styles/style.css"
import AppRouter from './appRouter';
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const getData = async()=>{
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log('asdfasfdasdfasdf');
    notify("Due to licensing restrictions, we're unable to serve players from your country. If you're using a VPN, please deactivate it and try again.")
  } 


  const notify = (message) => toast.success(message, {
    position: "bottom-left",
    autoClose: 5000,
    theme: "dark",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  useEffect(()=> {
    console.log('asdfasfd')
    getData()
  }, [])
  return (
    <>
      <ToastContainer/>
      <AppRouter/>
    </>
  );
}

export default App;
