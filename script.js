//1. Show the specified page and hide others
function showPage(pageId) {
    // Hide all sections
    let sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });
        
    // Show the selected page
    let activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.style.display = 'block';
    }
}
// Default to showing the first page when the page loads
window.onload = function() {
    showPage('page1');
};


//2. Reusable Dropdown Menu 
function showDrop(target) {
    document.getElementById(target).classList.toggle("open");
}

//3. Show the specified board
function showBoard(boardId) {
    // Hide all boards
    let boards = document.querySelectorAll('.board');  //Assuming boards have a class `board`
    boards.forEach(function(bod) {
        bod.style.display = 'none';
    });

    // Show the selected board
    let activeBoard = document.getElementById(boardId);
    if (activeBoard) {
        activeBoard.style.display = 'block';  
    }
}
// Default to showing the zero board when the page loads
//window.onload = function() {
//	showBoard('zer');
//};


//4. function to get the value from the input field
function computePostfix(inputId) {
  // Get the value from the input element
  var infix = document.getElementById(inputId).value;

  // Display the value in the specified p element
  document.getElementById("output1").textContent = "You entered: " + infix;
}


//------- -------- ------------- ---------
//	Infix to Postfix
//------- -------- ------------- ---------

//5. returns true if ch is an operator:      Use: isOp(ch)
function isOp(ch) {
  return (ch=='*' || ch=='/' || ch=='^' || ch=='+' || ch=='-' || ch=='=');
}

//6. postCondion: Returns true if ch is an alphabet
function isalpha(ch) {
    return /^[a-zA-Z]$/.test(ch);
}

//7. Returns true if ch is a number
function isdigit(ch) {
    return !isNaN(ch);
}

//8. Returns priority value of a character.  Use: priority(ch);
function priority(ch) {
   let val = 0;
   switch(ch) {
		//case '(': case ')': val = 5; break;
		case '^': 
			val = 4; 
			break;
		case '*': case '/' : 
			val = 3; 
			break;
		//case '/': val = 3; break;
		case '+': case '-': 
			val = 2; 
			break;
		//case '-': val = 2; break;
		case '=': 
			val = 1; 
			break;
		default: 
			val = -1; 
			break;
    }
    return val;
}

//9. postCondition: Accepts op as arg & prompts the stack to pop according to rules conditions
function converter(infix) {
    //if infix is empty, abort
    if(infix.length===0) {
        console.log("Infix is empty"); 
        return;
    } 
    //variables
    let a=0; let sho=0; let n=0; 
    let done=false; 
    let staq="";    //mimics the stack container
    let stak = []; //declare array to use as a stack 

    //get user input 
//    sho = prompt("Choose display:\n\t(1) Only display result\n\t(2) Display working & result\nOption: ");
    //input validation
//    if(sho === null) {
//        alert("Input cannot be empty"); return;
//    }else{console.log('\n');}

    //loop
    for(let i=0; i<infix.length; i++) {
        let ch = infix[i]; let next = infix[i+1]; let prev = infix[i-1]; 
        //if ch is alfa 
        if(isalpha(ch)) {   
            postfix += ch; //put it in postfix
//            sho==2 ? console.log(ch+" is an alphabet. Put it in postix. {" + staq + " \t " + postfix + "}\n") : console.log(""); 
        }//if ch is a number
        else if(isdigit(ch) || ch=='.') {   
            postfix += ch; //put it in postfix
//            sho==2 ? console.log(ch<<" is a number. Put it in postfix. {" + staq + " \t " + postfix + "}\n"): console.log(""); 
        }
        //if ch is (:
        else if(ch === '(') { 
            stak.push(ch); //put it in stack
//            staq += ch;   
            a++; 
//            sho==2 ? console.log(ch + " is open-parenthesis. Put it in the stack. {" + staq + " \t " + postfix + "}\n") : console.log(""); 
        }
        //if ch is ) && a>1:
        else if(ch === ')') { 
//            sho===2 ? console.log(ch + " is close-parenthesis. Pop enclosed operator(s) & " + ch) : console.log(""); 
            //pop everything before ( into postfix except '('
            while(stak[stak.length-1] !== '(') {
                (stak[stak.length-1] != '(' && stak[stak.length-1]!=')') ? (postfix += stak[stak.length-1]) : (postfix=postfix);
                //postfix += stak.top();
                stak.pop();
//                staq.slice(0, staq.length - 1);  //mimic stak removal of last char
            }
            stak.pop(); //then pop off ( into the air or som'n
//            stak.length===0? staq="" : staq.slice(0, staq.length - 1); 
            a=0;
//            sho===2 ? console.log(". {" + staq + " \t " + postfix + "}\n") : console.log(""); 
        }
        //if ch is operator:
        else if(isOp(ch)) {
            //else if stak is not empty
                let k=0; let pre="";
            while(true) {
//                k>0 ? pre="\t" : pre=""; //for proper spacing after 1st iteration
//                sho===2 ? console.log(pre + ch + " is operator. ") : console.log(""); 
                //if stack is empty
                if(stak.length===0) {  
//                    sho===2 ? console.log("Stack is empty, so put " + ch + " in stack. ") : console.log("");
                    stak.push(ch);
//                    staq += ch;       
                    a>0 ? a++ : a=a; //increment a when op is added to stak
//                    sho===2 ? console.log("{" + staq + "\t" + postfix + "}\n") : console.log(""); 
                    break;
                }
                else { //if priority(stak.top) >= priority(ch):
                    if(priority(stak[stak.length-1]) >= priority(ch)) {
                        //move stak.top to postfix
//                        sho===2 ? console.log("Priority of " + stak[stak.length-1] + " >= priority of " + ch + "), so move " + stak[stak.length-1] + " into postfix. ") : console.log("");
                        //move stack.top to postfix
                        stak[stak.length-1]!='(' && stak.top()!=')' ? (postfix += stak[stak.length-1]) : (postfix=postfix);
                        //postfix += stak.top();
                        stak.pop();
                        stak.length===0 ? staq="" : staq.slice(0, staq.length - 1);  
//                        sho===2 ? console.log("{" + staq + "\t" + postfix + "}\n") : console.log(""); 
                    }	
                    //if (priority of stack.top) < (priority of ch):
                    else if(priority(stak[stak.length-1]) < priority(ch)) {
//                        sho===2 ? console.log("Priority of " + stak.top() + " < priority of " + ch + ", so put " + ch + " in stack. ") : console.log(""); 		    
                        stak.push(ch); //put ch in stack
//                        staq += ch;   
                        a>0 ? a++ : a=a; //increment a when op is added to stak
//                        sho===2 ? console.log("{" + staq + "\t" + postfix + "}\n") : console.log(""); 
                        break;
                    }//close last if statement
//                    else {console.log("Not Captured"); break;}
                }
                k++;
            } 
        } 
    } 
    
    //if @ this point stack isNot empty, move everything to postfix
    if(stak.length>0) { 
        while(stak.length>0) {
            //pop all in stack into postfix
            stak[stak.length-1]!=='(' && stak[stak.length-1]!==')' ? (postfix += stak[stak.length-1]) : (postfix=postfix);
            //postfix += stak.top();
//            sho===2 ? console.log("\tput " + stak[stak.length-1] + " in postfix.") : console.log(""); 
            stak.pop();
//            staq.slice(0, staq.length - 1); //removes last char of staq 
//            sho===2 ? console.log(" {" + staq + "\t" + postfix + "}") : console.log(""); 
        }
    }
    return postfix;
}

//10. postCondition: test-runs the converter function
function runConverter() {
    //prompt user for infix input
    let infix = prompt('Enter infix');
    converter(infix);
}
