import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/fonts.css'
import { Web3ReactProvider } from '@web3-react/core'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Web3Provider } from '@ethersproject/providers'
import HeaderComponent from '../components/Header/HeaderComponent';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcN4LwJ0sbDPL0WhJ9YkWf2G9WuWTGPDk",
  authDomain: "anime-50037.firebaseapp.com",
  projectId: "anime-50037",
  storageBucket: "anime-50037.appspot.com",
  messagingSenderId: "822619001858",
  appId: "1:822619001858:web:e1686ecba706d339d2031b",
  measurementId: "G-CS3QMBEXPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (typeof window !== 'undefined') {
  const analytics = getAnalytics(app);
}

function MyApp({ Component, pageProps }: AppProps) {
 // useEffect(() => {
 //   const provider = window.localStorage.getItem("provider");
  //  if (provider) activate(connectors as any[typeof provider]);
 // }, []);
  return(
  <Web3ReactProvider getLibrary={getLibrary}>
    <HeaderComponent></HeaderComponent>
   <Component {...pageProps} />
   </Web3ReactProvider>
  )
}

export default MyApp
