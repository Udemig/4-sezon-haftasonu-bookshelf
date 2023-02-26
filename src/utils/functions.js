export const upperFirstLetters=(str)=>{
    const words=str.split(" ")
    console.log(words);
    let tempArr=[]
    for(let i=0;i<words.length;i++){
        let tempWord=""
        for(let j=0;j<words[i].length;j++){
            if(j===0){
                tempWord += words[i][j].toUpperCase()
            }else{
                tempWord+=words[i][j].toLowerCase()
            }
        }
        tempArr.push(tempWord)
    }
    console.log(tempArr);
    /* let newStr=""
    for(let i=0;i<tempArr.length;i++){
        newStr += tempArr[i]+" "
    }
    console.log(newStr); */
    const newStr=tempArr.join(" ")
    return newStr
}