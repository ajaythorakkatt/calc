$(document).ready(function() {
 
var  preview =[''],
     history = [''],
     totalString,
     operators = ["+", "-","/","*"],
     dot = ["."],
     nums = [0,1,2,3,4,5,6,7,8,9],
     length,
     scoreLength,
     prevLength =0,
     width,
     score,
     size;
  
 function fontSize() {
   
   width = $('#preview').width();
   size = parseInt($('#preview').css('font-size')); 
   if (width>260 && prevLength > 12) {
     size *= 0.8; 
     if (width>250 && prevLength >= 15) {
       size *= 0.8;
     }
  $('#preview').animate({'font-size':+size+'px'});
     
} 

   
  
 else if (width<260 && prevLength <= 12) {
    size = 40; 
    $('#preview').css({'font-size':+size+'px'});
  }
 }
    
// FILTER --filtr data push to arrs
function filter(input) {
 
  length = history.length;
  var type = typeof(input);
 
  // delet first zero if inoput is plus number 
  if(history[0] == 0 && history.length === 1 &&  dot.includes(input)=== false ) {
      history.push(input);
      history.shift();
    }
  // filter operator */+-  
 else if (operators.includes(input) === true && history[length-1] !== input && dot[0] !== history[length-1] ) {
    // if operators appears one after another changer operator to new one
   
    if (operators.includes(history[length-1])=== true) {   
      history.pop();
      history.push(input);   
    } else {
      history.push(input);
    }
  }
  else if (history[0] == score && length == 1 && dot.includes(input) === true ) {
    history = ['0']
    history.push(input);
  }
  // filter dots
  else if (dot.includes(input) === true && history[length-1] !== input && preview.indexOf('.') === -1) {
   // dont repeat dots     
      history.push(input);
  }
  // filter numbs
  else if (nums.includes(Number(input)) )  { 
   history.push(input);   
  }
  display();
};  
 
 // GET VALUE--
function doMath () {
  function strip(number) {
    return (parseFloat(number.toPrecision(12)));
}
  totalString = eval(history.join(''));
  score = strip(totalString).toString();
  scoreLength = score.length;
 

 if (score === 'Infinity') {
    history = ['0'];
 } 
  
  else if (scoreLength >= 15) {
  score =  (Number(score).toExponential(13)).toString();  
  history = [score];
  scoreLength = score.length;
  prevLength = scoreLength;
  fontSize(prevLength); 
  } 
   else {
     history = [score];
  }
  prevLength = scoreLength;
  $("#preview").html(score);
  fontSize(prevLength);  
  
};  
  
  
// DISPLAY-- data
function display () {
 var index = 0;
// creatt preview arr, starting at last operator from hisotry arr
operators.forEach(function(element) {
 var largest = history.lastIndexOf(element)
 if (largest >= index) {
   index = largest;
 } 
});
  preview = history.slice(index);
  prevLength = preview.join('').length; 
  var condition = operators.includes(preview[0])===true;
  function isdot(e) {
    return e === '.';
  }
  var isdots = preview.filter(isdot).length;
// hist = score
  
   if (history[0] === score && operators.includes(preview[0])===false ) {
    history.shift();
    preview = history;
    $("#history").html(history);
    $("#preview").html(preview); 
      }
  else if (prevLength > 14) { 
    history.pop();
    preview.pop();
     if (condition) {
        preview.shift(); 
     }
  }
  else if (isdots>1 ) {
    preview.pop();
    history.pop(); 
    if (condition) {  
    preview.shift(); 
    }   
  }
  else if (operators.includes(history[0])===true) {
    history=['0'];
    preview=['0'];
  }  
 else if ( prevLength === 1 && condition  ) {  
  // creat preview only for numbers 
  }  
  else if (condition) {
  preview.shift(); 
  } 
  // case when hisotry starts form numbers
  else {
    preview = history; 
    
  } 
  $("#preview").html(preview);
  $("#history").html(history);
 } 
  
  // CLICK --on click store data
$('button').on('click', function() {
  
 var $this =  $(this); 
 if (this.id !== "score") {
  $this.append('<span class="touch"></span>');
  function remove() {$('button').find('.touch').remove()};
  setTimeout(remove,300);
  }
  $("#preview").removeClass('dropIn'); 
   if (this.value ==="C") {
             if (history.length === 1) {
             history=["0"];
                
             display();
      } else {        
              history.pop()              
              display();
     }
 }  else if (this.value==="total" ) {
   $("#preview").addClass('dropIn');
     doMath();
   
 }  else {
   filter(this.value);
 }  
 fontSize(prevLength); 
  });   
}); // end