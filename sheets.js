let addSheet=document.querySelector(".add-sheet");
let sheetsList=document.querySelector(".sheets-list");

let sheetId=0;
addSheet.addEventListener("click",handleAddSheet);
sheetsList.addEventListener("click",handleSheetSwitch);
//add new sheet and apply active-sheet
function handleAddSheet(e){
    sheetId++;
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    let sheet=document.createElement("div");
    sheet.classList.add("sheet");
    sheet.classList.add("active-sheet");
    sheet.setAttribute("sid",sheetId);
    sheet.textContent=`Sheet ${sheetId+1}`;
    sheetsList.append(sheet);
    

    //init DB
    initDB();
    //making menu icons default for new sheet
    initMenu();
    //init UI
    initUI();
}

function handleSheetSwitch(e){
    let selectedSheet=e.target;
    //clicked on already active sheet
    if(selectedSheet.classList.contains("active-sheet")){
        return;
    }
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    selectedSheet.classList.add("active-sheet");
    //db set 
    let selectedSheetId=selectedSheet.getAttribute("sid");
    db=sheetsDB[selectedSheetId]; //db pointing to current sheet
    //ui set
    setUI();
}
function initUI(){
    for(let i=0;i<allCells.length;i++){
        allCells[i].textContent="";
        allCells[i].style.backgroundColor="white";
        allCells[i].style.color="black";
    }
}
function setUI(){
    for(let i=0;i<allCells.length;i++){
        console.log("cecll");
        console.log(allCells[i]);
          let rowId=allCells[i].getAttribute("rowid");
          let colId=allCells[i].getAttribute("colid");
          allCells[i].textContent=db[rowId][colId].value;
          allCells[i].style.backgroundColor=db[rowId][colId].cellcolor;
          allCells[i].style.fontStyle=db[rowId][colId].fontcolor;
    }
}
