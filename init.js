let cellsContent=document.querySelector(".cells-content");
(function(){
    
    let cells="";

//top left cell
let cellsContentHtml=`<div class="top-left-cell"></div>`;

//top row
cellsContentHtml+=`<div class="top-row">`;
for(let i=0;i<26;i++){
  cellsContentHtml+=`<div class="top-row-cell">${String.fromCharCode(65+i)}</div>`;
}
cellsContentHtml+=`</div>`;

//left col
cellsContentHtml+=`<div class="left-col">`;
for(let i=0;i<100;i++){
    cellsContentHtml+=`<div class="left-col-cell" cell-id = "${i}">${i+1}</div>`;
}
cellsContentHtml+=`</div>`;

//All cells
cellsContentHtml+=`<div class="cells">`;
for(let i=0;i<100;i++){
    cellsContentHtml+=`<div class="row">`;
    for(let j=0;j<26;j++){
        cellsContentHtml+=`<div class="cell" rowid="${i}" colid="${j}" contentEditable="true"></div>`;
    }
    cellsContentHtml+=`</div>`
}
cellsContentHtml+=`</div>`
cellsContent.innerHTML=cellsContentHtml;
})();

let sheetsDB=[];
let db;//point to  database of current sheet //that's why kept global
function initDB(){
    let newDB=[];
    for(let i=0;i<100;i++){
        let row=[];
        for(let j=0;j<26;j++){
            let address=String.fromCharCode(65+j)+(i+1)+"";
            let cellObject={
                name:address,
                value:"",
                formula:"",
                children:[],
                parents:[],
                fontStyle:{bold:false,italic:false,underline:false},
                testAlign:"left", //default
                fontcolor:"black",
                cellcolor:"white"
            }
            row.push(cellObject);
        }
        newDB.push(row);
        console.log(db);
    }
    db=newDB;
    sheetsDB.push(newDB);
    
}
initDB();