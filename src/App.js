import React,{useEffect} from "react";

import {BrowserRouter,Routes,Route} from "react-router-dom"

import HomePage from "./pages/HomePage";

import { useDispatch } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";
import api from "./api/api"
import urls from "./api/urls";

function App() {
  const dispatch=useDispatch()

  useEffect(()=>{
    /* fetch books */
    dispatch({type:actionTypes.bookActions.GET_BOOKS_START})
    api.get(urls.books)
    .then((res)=>{
      dispatch({type:actionTypes.bookActions.GET_BOOKS_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
      dispatch({type:actionTypes.bookActions.GET_BOOKS_FAIL,payload:"Serverda bir hata oluştu"})
    })
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
