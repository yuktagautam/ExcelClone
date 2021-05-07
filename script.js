//shifting left-col,top-row,topLeftCell such that view remain as it is
let topRow=document.querySelector(".top-row");
let leftCol=document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let cells=document.querySelector(".cells");
let addressInput=document.querySelector("#address");
let formulaInput=document.querySelector("#formula");
let allCells=document.querySelectorAll(".cell");
cellsContent.addEventListener("scroll",function(e){
    let top=e.target.scrollTop;
    let left=e.target.scrollLeft;
    topRow.style.top=top+"px";
    leftCol.style.left=left+"px";
    topLeftCell.style.top = top+"px";
    topLeftCell.style.left = left+"px";
})
let rowId;
let colId;
let lastSelectedCell;//cell in which the formula applied


//Update the name of clicked cell in topleftCell
cells.addEventListener("click",function(e){
    let currentCell=e.target;
    rowId=Number(currentCell.getAttribute("rowid"));
    colId=Number(currentCell.getAttribute("colid"));
    let address=String.fromCharCode(65+colId)+(rowId+1)+"";
    let cellObject=db[rowId][colId];//finding object
    addressInput.value=address;//D8 //name of cell clicked
    formulaInput.value=cellObject.formula;//if any cell have relation on it than formulainput will display that formula
})
//updating lastSelectedCell and assigned value to clicked cell
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("blur",function(e){
        let currentElement=e.target;
        lastSelectedCell=currentElement;
        let value=currentElement.textContent;
        let cellObject=db[rowId][colId];
        if(value!=cellObject.value){//is user change the prev cell value or write first time in that cell
            cellObject.value=value;
            
        }
    })
}

//setting formula solvedValue and formulas in UI AND DB
formulaInput.addEventListener("blur",function(e){
    let formula=formulaInput.value;
    if(formula && lastSelectedCell){//check if formula is not null and if no cell is selected
        console.log(formula);          
        let solvedValue=solveFormula(formula);
                  //set UI
                  lastSelectedCell.textContent=solvedValue;
                  //set DB
                  let cellObject=db[rowId][colId];
                  cellObject.value=solvedValue;
                  cellObject.formula=formula;
    }
})


