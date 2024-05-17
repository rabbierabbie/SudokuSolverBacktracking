//This function is just for clearing the table.
function clearTable(){
    for(let i=1;i<=9;i++){
        for(let j=1;j<=9;j++){
            let inputtype=document.getElementById(`${i}${j}`);
            console.log(`${i}${j}`);
            inputtype.value='';
    }
  }
}
//addEventListener has no return value. It attaches an event listener to the document.
document.getElementById("solve-here").addEventListener("click",(e)=>{
    e.preventDefault();//can or cannot be added. Since we are not storing things here it is not a matter of great detail.
    let arr=[]; //2d arrays don't exist. You can use nested arrays. Declare an array like this itself.

    for(let i=0;i<9;i++){
        arr[i]=[0,0,0,0,0,0,0,0,0];
    }

    //Had used JSON.parse() here. That i when we are using JSON for storing things.

    for(let i=1;i<=9;i++){
        let temp=[0,0,0,0,0,0,0,0,0];
        for(let j=1;j<=9;j++){
            let inputtype=document.getElementById(`${i}${j}`);
            //Enter string values this way only
            if(inputtype.value!=''){ //or inputtype!=null
                temp[j-1]=inputtype.value;
                //console.log(inputtype.value);
            }
        }
        arr[i-1]=temp;
    }
    //clearTable(); //this method was just for clearing the table input by the user.
   // solveSudoku(arr); // has th be elaborated further.
}
);
