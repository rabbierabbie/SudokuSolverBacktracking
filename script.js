//This function is just for clearing the table.
function clearTable(){
    for(let i=1;i<=9;i++){
        for(let j=1;j<=9;j++){
            let inputtype=document.getElementById(`${i}${j}`);
            //console.log(`${i}${j}`);
            inputtype.value='';
    }
  }
  document.getElementById("invalid").innerHTML="";
}

document.getElementById("clear-here").addEventListener("click",(e)=>{
    clearTable();
});

function setBoard(board){
    outer: for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            const element=document.getElementById(`${i+1}${j+1}`);
                element.value=board[i][j];
                //console.log(element.value+i+j);
        }
    }
}

const solveSudoku = function(board) {
    const isUsedInRow =[
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false]];
     //.fill() overrides the already present values in the board with the ones that have been passed in the function fill
    const isUsedInCol =[
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false]];

    const isUsedInSub =[
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false]];
    //Checking which values already exist in rows,columns,subgroups as provided by the user
    let test=true;
    outer: for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const num = board[i][j];
        if(num===0) continue;
        const subBoxIndex = Math.floor(i / 3) + Math.floor(j / 3) * 3; //used t find the index for which subgroup and in that subgroup at which place.

        //ensuring that we do not already have numbers filled as such here
        if (!isUsedInRow[i][num-1] && !isUsedInCol[j][num-1] && !isUsedInSub[subBoxIndex][num-1]){
            isUsedInRow[i][num-1] = true;
            isUsedInCol[j][num-1] = true;
            isUsedInSub[subBoxIndex][num-1] = true;
        }
        else{
            test=false;
            break outer;
        }
      }
    }
    // fill the blanks by backtracking
    function fillBoard(i, j){
      if (i === 9) return true;
      const nextI = j === 8 ? i + 1 : i//to find the next row number
      const nextJ = j < 8 ? j + 1: 0//to find the next column number
      const subBoxIndex = Math.floor(i / 3) + Math.floor(j / 3) * 3;
      if (board[i][j] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (!isUsedInRow[i][num-1] && !isUsedInCol[j][num-1] && !isUsedInSub[subBoxIndex][num-1]) {
            board[i][j] = num;
            isUsedInRow[i][num-1] = true;
            isUsedInCol[j][num-1] = true;
            isUsedInSub[subBoxIndex][num-1] = true;
            //here is where we recursively call function
            if (fillBoard(nextI, nextJ)===true) {
              return true;
            }
            
            // if no number is valid here then only the control will reach here.
            board[i][j] = 0;
            isUsedInRow[i][num-1] = false;
            isUsedInCol[j][num-1] = false;
            isUsedInSub[subBoxIndex][num-1] = false;
          }
        }

        return false;
      }
        else {
        return fillBoard(nextI, nextJ);
      }
    }
    if(test===true){
        const temp=fillBoard(0, 0);
        console.log(test);
        console.log(temp);
        if(temp===true){
            setBoard(board);
        }
        else{
            clearTable();
            document.getElementById("invalid").innerHTML="Invalid Input";
        }
    }
    else{
        clearTable();
        document.getElementById("invalid").innerHTML="Invalid Input";
    }
};

//addEventListener has no return value. It attaches an event listener to the document.
document.getElementById("solve-here").addEventListener("click",(e)=>{
    e.preventDefault();//can or cannot be added. Since we are not storing things here it is not a matter of great detail.
    let arr=[]; //2d arrays don't exist. You can use nested arrays. Declare an array like this itself.
    document.getElementById("invalid").innerHTML="";
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
    solveSudoku(arr);
}
);
