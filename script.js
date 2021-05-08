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
//A1->10 ,A2->20 ,B1->30 ,B1.formula="( A1 + A2 )"  orginally
for(let i=0;i<allCells.length;i++){

    allCells[i].addEventListener("blur",function(e){
        let currentElement=e.target;
        lastSelectedCell=currentElement;
        let value=currentElement.textContent;
        let cellObject=db[rowId][colId];
        //true if A1->A1 value has been Changed
        if(value!=cellObject.value){//is user change the prev cell value or write first time in that cell
            cellObject.value=value;
            updateChildren(cellObject);//if change cell value ,and other cell depend on this cell,then that other cell value must be updated   
        }
    })
}

//setting formula solvedValue and formulas in UI AND DB
formulaInput.addEventListener("blur",function(e){
    let formula=formulaInput.value;
    if(formula && lastSelectedCell){//check if formula is not null and if no cell is selected
        console.log(formula);    
        let cellObject=db[rowId][colId];//it will help to setchildren ,As B1 depend upon A1,A2.
        //A1 will hae B1 as children simlarly A2 too have B1 as children      
        let solvedValue=solveFormula(formula,cellObject);
                  //set UI
                  lastSelectedCell.textContent=solvedValue;
                  //set DB
                  
                  cellObject.value=solvedValue;
                  cellObject.formula=formula;
                   //value to formula----
                  //Suppose C1 is dependent on A1 + A2 +B1
                  //now we change B1 formula to A1* A2 
                  //as B1 value will change will further change C1 value 
                  updateChildren(cellObject);
    }
})


