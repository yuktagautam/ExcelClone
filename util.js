function solveFormula(formula){
 //"A1+A2"=>(10+20)
 let formulaComps=formula.split(" ");

 
 //["(","A1","+","A2",")"]
 for(let i=0;i<formulaComps.length;i++){
     
     let fComp=formulaComps[i];
     console.log(fComp);
     if(fComp[0]>="A" && fComp[0]<="Z"){
       
         let {rowId,colId}=getRowIdColIdFromAddress(fComp);
         let cellObject=db[rowId][colId];
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