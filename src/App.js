'use client';
import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useGoogleSheets from 'use-google-sheets';
import Map from './Map';
// import Decades from './Decades';

const REACT_APP_GOOGLE_SHEETS_ID =
  '18vk3k1eaR98d9pWUl8QkGTlovoV7Y93sF0qj-LcbZCw';
const REACT_APP_GOOGLE_API_KEY = 'AIzaSyA6kU3sADO3doBDW_Fy9JMnVtPFxrn4hIo';

const GetData = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: REACT_APP_GOOGLE_API_KEY,
    sheetId: REACT_APP_GOOGLE_SHEETS_ID,
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  }
  let a = data[0];
  return a.data;
};

const Home = ({ children }) => {
  const a = GetData();
  console.log(a);

  return React.createElement('div', null, Map(), children);
};
module.export = Home;
