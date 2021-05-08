function solveFormula(formula,selfCellObject){
 //"A1+A2"=>(10+20)
 let formulaComps=formula.split(" ");

 
 //["(","A1","+","A2",")"]
 for(let i=0;i<formulaComps.length;i++){
     
     let fComp=formulaComps[i];
     console.log(fComp);
     if(fComp[0]>="A" && fComp[0]<="Z"){
    let {rowId,colId}=getRowIdColIdFromAddress(fComp);//got A1 rowid and colid ,similary for next iteration  A2 rowid,colid
    let cellObject=db[rowId][colId];     
    if(selfCellObject){
             cellObject.children.push(selfCellObject.name);
             selfCellObject.parents.push(fComp);
     }
         
         let value=cellObject.value;
         console.log(". "+value);
         //A1+A2-->10+A2 -->10+20
         formula=formula.replace(fComp,value);
     }
 }

 let value=eval(formula);//10+20-->30
 return value;
}
function getRowIdColIdFromAddress(address){
    //C1
    //C =>colId => 2
    //1 => rowId => 0
    let colId=address.charCodeAt(0)-65;
    let rowId=Number(address.substring(1))-1;
    return {rowId,colId};
}
function updateChildren(cellObject){
    // {
    //     name:"A1".
    //     value:100,
    //     children:["B1"]
    // }
    for(let i=0;i<cellObject.children.length;i++){
        let childName=cellObject.children[i];
        let {rowId,colId}=getRowIdColIdFromAddress(childName);
        let childrenCellObject=db[rowId][colId];
        let newValue=solveFormula(childrenCellObject.formula);
        //B1 => DB update
        childrenCellObject.value=newValue;
        //B1  =>UI update
        document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).textContent=newValue;
        updateChildren(childrenCellObject);//for children of children //recursive  
    }
}
function deleteFormula(cellObject){
   //before
    // {
    //     name:"B1",
    //      value:30,
    //     formula:"A1+A2",
    //     children:["C1"],
    //     parents:["A1","A2"]
    // }
    //after user update of valu:30 -->to let say -->value:1000

    cellObject.formula=""; //empty the formula whose value has been changed
    for(let i=0;i<cellObject.parents.length;i++){
          let parentName=cellObject.parents[i];   //formula:""
          let {rowId,colId}=getRowIdColIdFromAddress(parentName);
          let parentCellObject=db[rowId][colId];
          let filteredChildren=parentCellObject.children.filter(child=>{   //deleting "B1" in A1 children,similarly for A2
            return child!=cellObject.name;
          });
          parentCellObject.children=filteredChildren;
    }
    cellObject.parents=[];//empty parents
    //after
    // {
    //     name:"B1",
    //      value:1000,
    //     formula:"",
    //     children:["C1"],
    //     parents:[]
    // }
}