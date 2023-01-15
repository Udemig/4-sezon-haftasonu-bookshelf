import React from "react";

import Header from "../components/Header";

import { useSelector } from "react-redux";

const HomePage=()=>{
    const {booksState,categoriesState}=useSelector(state=>state)
    console.log("books",booksState);
    console.log("cats",categoriesState);
    return(
        <div>
            <Header />
            <h1>HomePage</h1>
        </div>
    )

}
export default HomePage