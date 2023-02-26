import React from "react";

import { upperFirstLetters } from "../utils/functions";

const Text = ({text,style})=>{
    return(
        <p style={style}>{upperFirstLetters(text)}</p>
    )
}

export default Text