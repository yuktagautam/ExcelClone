let bold=document.querySelector(".bold");
let left = document.querySelector(".left");
let center = document.querySelector(".center");
let right = document.querySelector(".right");
let underline=document.querySelector(".underline");
let italic=document.querySelector(".italic");
let cellcolor=document.querySelector(".bgcolorDiv");
let textcolor=document.querySelector(".textcolorDiv");
//adding event Listner to bold,underline,italic,left,center,right

//bold
bold.addEventListener("click",function(e){
   let cellObject=db[rowId][colId];
   if(cellObject.fontStyle.bold){
       bold.classList.remove("active-menu");//icon background change
       lastSelectedCell.style.fontWeight="normal";//cell content Ui change
   }else{
       bold.classList.add("active-menu");
       lastSelectedCell.style.fontWeight="bold";
   }
   cellObject.fontStyle.bold=!cellObject.fontStyle.bold;//data base change //inverted of orignal one
})
//underline
underline.addEventListener("click",function(e){
    let cellObject=db[rowId][colId];
   if(cellObject.fontStyle.underline){
       underline.classList.remove("active-menu");//icon background change
       lastSelectedCell.style.textDecoration="none";//cell content Ui change
   }else{
       underline.classList.add("active-menu");
       lastSelectedCell.style.textDecoration="underline";
   }
   cellObject.fontStyle.underline=!cellObject.fontStyle.underline;//data base change //inverted of orignal one
})
//italic
italic.addEventListener("click",function(e){
    let cellObject=db[rowId][colId];
   if(cellObject.fontStyle.italic){
       italic.classList.remove("active-menu");//icon background change
       lastSelectedCell.style.fontStyle="normal";//cell content Ui change
   }else{
       italic.classList.add("active-menu");
       lastSelectedCell.style.fontStyle="italic";
   }
   cellObject.fontStyle.italic=!cellObject.fontStyle.italic;//data base change //inverted of orignal one
})

//left
left.addEventListener("click",function(e){
    let cellObject=db[rowId][colId];
    if(cellObject.textAlign=="left"){
        return;
    }
    //ui
    lastSelectedCell.style.textAlign="left";
    //db
    cellObject.textAlign="left";
    setMenu(cellObject);
})

//center
center.addEventListener("click",function(e){
    let cellObject=db[rowId][colId];
    if(cellObject.textAlign=="center"){
        return;
    }
    //ui
    lastSelectedCell.style.textAlign="center";
    //db
    cellObject.textAlign="center";
    setMenu(cellObject);
})

//right
right.addEventListener("click",function(e){
    let cellObject=db[rowId][colId];
    if(cellObject.textAlign=="right"){
        return;
    }
    //ui
    lastSelectedCell.style.textAlign="right";
    //db
    cellObject.textAlign="right";
    setMenu(cellObject);
})
//cell bg color
cellcolor.addEventListener("click",function(e){
    let cellObject=db[rowId][colId];

    let color=e.target.value;
    //update ui
    console.log(color);
    lastSelectedCell.style.backgroundColor=color;
    //set db
    cellObject.cellcolor=color;



});
//text color
textcolor.addEventListener("click",function(e){
    let cellObject=db[rowId][colId];
    let color=e.target.value;
    console.log(color);
    //update ui
    lastSelectedCell.style.color=color;

    //set db
    cellObject.fontcolor=color;

})

function initMenu(){
    bold.classList.remove("active-menu");
     italic.classList.remove("active-menu");
    left.classList.remove("active-menu");
    center.classList.remove("active-menu");
    right.classList.remove("active-menu");
}

//shows the current cell (clicked cell) details by highlighting background of icons
function setMenu(cellObject){
    //bold ,underline,italic all can be selected at once for a cell
  cellObject.fontStyle.bold==true ? bold.classList.add("active-menu"):bold.classList.remove("active-menu");
  cellObject.fontStyle.underline==true ? underline.classList.add("active-menu"):underline.classList.remove("active-menu");
  cellObject.fontStyle.italic==true ? italic.classList.add("active-menu"):italic.classList.remove("active-menu");
  //in alignment only one can be selected either left or center or right for a cell
  //displaying the textAlign background 
  let alignment=cellObject.textAlign;
  if(document.querySelector(".font-alignment .active-menu")){
    document.querySelector(".font-alignment .active-menu").classList.remove("active-menu");
  }
  if(alignment=="right"){
    right.classList.add("active-menu");
  }else if(alignment=="center"){
     center.classList.add("active-menu");
  }else{
    left.classList.add("active-menu"); //specially written in else -> Control Case:is clicked on any new cell default will be left
  }
}
