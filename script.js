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



