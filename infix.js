function infixEvaluation(arr){
    
   let opr=[];//operator '+',-
   let opd=[];//operand , 12,
   for(let i=0;i<arr.length;i++){
       let ch=arr[i];
       console.log(ch);
       if(ch=='('){
          opr.push(ch);
        //   console.log("pushed to  opt =  "+opr);
       }
       else if(ch==')'){

         while(opr.length>0 && opr[opr.length-1]!='('){
        
             let sign=opr.pop();
            //  console.log("popped from opr = "+sign);
             let ist=opd.pop();
            //  console.log("popped from opd = "+ist);
             let sec=opd.pop();
            //  console.log("popped from opd = "+sec);
             let ans=solve(sign,ist,sec);
             opd.push(ans);
            //  console.log("pushed to opd = "+ans);
         }
         let p=opr.pop();
        //  console.log("popped from opr ="+ p);
       }
       else if(ch=='+' || ch=='-' || ch=='*' || ch=='/'){
          while(opr.length>0 && priority(ch)<priority(opr[opr.length-1])){
           
            let sign=opr.pop();
            let ist=opd.pop();
            let sec=opd.pop();
            let ans=solve(sign,ist,sec);
            opd.push(ans);
          }
          opr.push(ch);
       }
       else{
           opd.push(ch);
       }
       
   }
   while(opr.length>0){
    
    let sign=opr.pop();
    let ist=opd.pop();
    let sec=opd.pop();
    let ans=solve(sign,ist,sec);
    opd.push(ans);
   }
   return opd[opd.length-1];
}
function priority(opr){
    if(opr=='/'){
          return 4;
    }
    else if(opr=='*'){
        return 3;  //high priority -->high number set
    }
    else if(opr=='+'){
        return 2;
    }
    else{
        return  1;
    }
}
function solve(sign,ist,sec){
    if(!isNaN(ist)){
        ist=Number(ist);
    }
    if(!isNaN(sec)){
        sec=Number(sec);
    }
    if(sign=='+'){
        if(isNaN(ist)){
            return `${ist}${sec}`;
        }
        return ist+sec;
    }else if(sign=='-'){
         return sec-ist;
    }else if(sign=='*'){
         return ist*sec;
    }else{
        return sec/ist;
    }
}