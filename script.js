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

//6. Returns priority value of a character.  Use: priority(ch);
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

//7. postConcition: Accepts op as arg & prompts the stack to pop according to rules conditions
function converter(infix) {
    //if infix is empty, abort
    if(infix.length===0) {
        console.log("Infix is empty"); 
        return;
    } 
    //variables
    let a=0,sho=0,n=0; 
    let done=false; 
    let staq=""; 
    //option of `result only` or `how result was reached` & `the result`
//    console.log("Choose display:\n\t(1) Only display result\n\t(2) Display working & result\nOption: ");
//    cin>>sho;
//    cout<<endl;
    //loop
    for(int i=0; i<infix.length; i++) {
        let ch = infix[i], next = infix[i+1], prev=infix[i-1]; 
        //if ch is alfa 
        if(isalpha(ch)) {   
            postfix += ch; //put it in postfix
            sho==2 ? console.log(ch+" is an alphabet. Put it in postix. {" + staq + " \t " + postfix + "}\n") : console.log(""); 
        }//if ch is a number
        else if(isdigit(ch) || ch=='.') {   
            postfix += ch; //put it in postfix
            sho==2 ? consoloe.log(ch<<" is a number. Put it in postfix. {"<<staq<<" \t "<<postfix<<"}\n"<<endl : cout<<""; 
        }
        //if ch is (:
        else if(ch == '(') { 
            stak.push(ch); //put it in stack
            staq += ch;   
            a++; 
            sho==2 ? cout<<ch<<" is open-parenthesis. Put it in the stack. {"<<staq<<" \t "<<postfix<<"}\n"<<endl : cout<<""; 
        }
        //if ch is ) && a>1:
        else if(ch == ')' /*&& a>1*/) { 
            sho==2 ? cout<<ch<<" is close-parenthesis. Pop enclosed operator(s) & "<<ch : cout<<""; 
            //pop everything before ( into postfix except '('
            while(stak.top() != '(') {
                stak.top()!='(' && stak.top()!=')' ? (postfix += stak.top()) : (postfix=postfix);
                //postfix += stak.top();
                stak.pop();
                staq.erase(staq.length()-1,1); 
            }
            stak.pop(); //then pop off ( into the air or som'n
            stak.empty()? staq="" : staq.erase(staq.length()-1,1); 
            a=0;
            sho==2 ? cout<<". {"<<staq<<" \t "<<postfix<<"}\n"<<endl : cout<<""; 
        }
        //if ch is operator:
        else if(isOp(ch)) {
            //else if stak is not empty
                int k=0; string pre="";
            while(true) {
                k>0?pre="\t":pre=""; //for proper spacing after 1st iteration
                sho==2 ? cout<<pre<<ch<<" is operator. " : cout<<""; 
                //if stack is empty
                if(stak.empty()) {  
                    sho==2 ? cout<<"Stack is empty, so put "<<ch<<" in stack. ": cout<<"";
                    stak.push(ch);
                    staq += ch;       
                    a>0 ? a++ : a=a; //increment a when op is added to stak
                    sho==2 ? cout<<"{"<<staq<<"\t"<<postfix<<"}\n"<<endl : cout<<""; 
                    break;
                }
                else { //if priority(stak.top) >= priority(ch):
                    if(priority(stak.top()) >= priority(ch)) {
                        //move stak.top to postfix
                        sho==2 ? cout<<"Priority of "<<stak.top()<<" >= priority of "<<ch<<"), so move "<<stak.top()<<" into postfix. " : cout<<"";
                        //move stack.top to postfix
                        stak.top()!='(' && stak.top()!=')' ? (postfix += stak.top()) : (postfix=postfix );
                        //postfix += stak.top();
                        stak.pop();
                        stak.empty()? staq="" : staq.erase(staq.length()-1,1); 
                        sho==2 ? cout<<"{"<<staq<<"\t"<<postfix<<"}\n"<<endl : cout<<""; 
                    }	
                    //if (priority of stack.top) < (priority of ch):
                    else if(priority(stak.top()) < priority(ch)) {
                        sho==2 ? cout<<"Priority of "<<stak.top()<<" < priority of "<<ch<<", so put "<<ch<<" in stack. " : cout<<""; 		    
                        stak.push(ch); //put ch in stack
                        staq += ch;   
                        a>0 ? a++ : a=a; //increment a when op is added to stak
                        sho==2 ? cout<<"{"<<staq<<"\t"<<postfix<<"}\n"<<endl : cout<<""; 
                        break;
                    }//close last if statement
                    else {cout<<"Not Captured"<<endl; break;}
                }
                k++;
            } 
        } 
    } 
    
    //if @ this point stack isNot empty, move everything to postfix
    if(stak.size()>0) { 
        while(stak.size()>0) {
            //pop all in stack into postfix
            stak.top()!='(' && stak.top()!=')' ? (postfix += stak.top()) : (postfix=postfix );
            //postfix += stak.top();
            sho==2 ? cout<<"\tput "<<stak.top()<<" in postfix." : cout<<""; 
            stak.pop();
            staq.erase(staq.length()-1,1); 
            sho==2 ? cout<<" {"<<staq<<"\t"<<postfix<<"}"<<endl : cout<<""; 
        }
    }
}

