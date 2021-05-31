function isSafe(parentObj,selfCellObjectName){
    return cycle(parentObj,selfCellObjectName);
}
function cycle(parentObj,selfCellObjectName){
    console.log("cycle ko call lag ");
    console.log("parent "+parentObj+" "+" self "+ selfCellObjectName);
    if(parentObj==selfCellObjectName){
        return false;
    }
    let {rowId,colId}=getRowIdColIdFromAddress(parentObj);
    // console.log(rowId,colId);
    let cellObj=db[rowId][colId];
    let p=cellObj.parents;
    
   
    for(let i=0;i<p.length;i++){
      if(cycle(p[i],selfCellObjectName)==false)return false;
    }
    return true;
}
function solveFormula(formula,selfCellObject){
 //"A1+A2"=>(10+20)
 let formulaComps=formula.split(" ");
 let farray=[];
 
 //["(","A1","+","A2",")"]
 for(let i=0;i<formulaComps.length;i++){
     
     let fComp=formulaComps[i];
    //  console.log(fComp);
     if(fComp[0]>="A" && fComp[0]<="Z"){
     let {rowId,colId}=getRowIdColIdFromAddress(fComp);//got A1 rowid and colid ,similary for next iteration  A2 rowid,colid
     let cellObject=db[rowId][colId];     
     if(selfCellObject){
        let res=isSafe(fComp,selfCellObject.name);
             if(res){
                cellObject.children.push(selfCellObject.name);
                selfCellObject.parents.push(fComp);
             }else{
                 alert("Invalid token! Cycle Detected!");
                 return null;
             }
            
     }    
        farray.push(cellObject.value);
     }
     else{
         farray.push(fComp);
     }
    //  console.log(farray);
 }

 let value=infixEvaluation(farray);
//  console.log("value = "+value );
 return value;
}
function getRowIdColIdFromAddress(address){
    //C1
    //C =>colId => 2
    //1 => rowId => 0
    
    let colId=address.charCodeAt(0)-65;
    let rowId=Number(address.substring(1))-1;
    console.log(rowId,colId);
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
        if(newValue){
           //B1 => DB update
        childrenCellObject.value=newValue;
        //B1  =>UI update
        document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).textContent=newValue;
        updateChildren(childrenCellObject);//for children of children //recursive  
        }
       
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
