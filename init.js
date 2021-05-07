let cellsContent=document.querySelector(".cells-content");
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
    cellsContentHtml+=`<div class="left-col-cell">${i+1}</div>`;
}
cellsContentHtml+=`</div>`;
//All cells
cellsContentHtml+=`<div class="cells">`;
for(let i=0;i<100;i++){
    cellsContentHtml+=`<div class="row">`;
    for(let j=0;j<26;j++){
        cellsContentHtml+=`<div class="cell" contentEditable="true"></div>`;
    }
    cellsContentHtml+=`</div>`
}
cellsContent.innerHTML=cellsContentHtml;