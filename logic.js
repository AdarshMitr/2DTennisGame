var canvas;
    var canvasContext;
    var ballX=50;
    var ballY=50;
    var ballSpeedX = 10;
    var ballSpeedY= 4;

    var player1Score=0;
    var player2Score=0;
    const winningScore=3;
var showingWinScreen=false;

    var paddle1Y=250;
    var paddle2Y=250;
    const paddlethickness= 10;
    const paddleHeight= 100;


    function calculateMousePos(evt){
      var rect=canvas.getBoundingClientRect();
      var root= document.documentElement;
      var mouseX= evt.clientX-rect.left-root.scrollLeft;
      var mouseY= evt.clientY-rect.top - root.scrollTop;
      return{
        x: mouseX,
        y: mouseY
      };
    }

    function handleMouseClick(){
      if(showingWinScreen){
        player1Score=0;
        player2Score=0;
        showingWinScreen=false;
      }
    }

    window.onload= function(){
      
      canvas= document.getElementById('gameCanvas');
      canvasContext= canvas.getContext('2d');
      var framePerSecond=30;
      setInterval(function(){
        moveEverything();
        drawEverything();
      }, 1000/framePerSecond);

      canvas.addEventListener('mousedown',handleMouseClick)
      canvas.addEventListener('mousemove',function(evt){
        var mousePos= calculateMousePos(evt);
        paddle1Y=mousePos.y-(paddleHeight/2);
      })
      
    }

    function ballReset(){
if(player1Score>=winningScore|| player2Score>=winningScore){
  
  showingWinScreen=true;
}

       ballSpeedX=-ballSpeedX;
      ballX=canvas.width/2;
      ballY=canvas.height/2;
    }
function computerMovement(){
  var paddle2YCenter=paddle2Y+(paddleHeight/2);
  if(paddle2YCenter<ballY-35){
    paddle2Y+=6;
  }else{
    paddle2Y-=6;
  }
}

    function moveEverything(){
      if(showingWinScreen){
        return;
      }
      computerMovement();

      ballX +=  ballSpeedX;
      ballY += ballSpeedY;

      if(ballX<0){
       if((ballY>paddle1Y)&&(ballY<paddle1Y+paddleHeight)){
        ballSpeedX=-ballSpeedX;

        var deltaY= ballY-(paddle1Y+paddleHeight/2);
        ballSpeedY=deltaY *0.35;
       }else{
        player2Score++; // must be before ballreset()
        ballReset();
       }}
      if(ballX>canvas.width) {
        if((ballY>paddle2Y)&&(ballY<paddle2Y+paddleHeight)){
        ballSpeedX=-ballSpeedX;
        var deltaY= ballY-(paddle2Y+paddleHeight/2);
        ballSpeedY=deltaY *0.35;
       }else{
        player1Score++;    // must be before ballreset()
        ballReset();
       }
        
      } 
      if(ballY<0){
        ballSpeedY=-ballSpeedY;
      }
      if(ballY>canvas.height){
        ballSpeedY=-ballSpeedY;
      }
    }

function drawNet(){
  for(var i=0; i<canvas.height; i+=40){
    colorRect(canvas.width/2-1,i,2,20,'white');
  }
}

    function drawEverything(){
      //next line blanks out the screen with black
      colorRect(0,0,canvas.width,canvas.height,'black');
      canvasContext.font='60px san-serif';
      if(showingWinScreen){
       
        
        if(player1Score>=winningScore){
            canvasContext.font='60px san-serif';
            canvasContext.textAlign='center';
            canvasContext.fillStyle='#6BFF33';
          canvasContext.fillText('You Won!',350,200);
          

        }else if(player2Score>=winningScore){
            canvasContext.fillStyle='red';
            canvasContext.textAlign='center';
          canvasContext.fillText('You lose! Try Again.',350,200);
          
        }

        canvasContext.fillStyle='white';
        canvasContext.fillText('click to continue..',350,500);
        return;
      }
      

      drawNet();
      //this is left player paddle
      colorRect(0,paddle1Y,paddlethickness,paddleHeight,'white');

      //this is right computer paddle
      colorRect(canvas.width-paddlethickness,paddle2Y,paddlethickness,paddleHeight,'white');

      //next line draws the ball
      colorCircle(ballX,ballY,10,'white');

      canvasContext.fillText(player1Score,100,100);
      canvasContext.fillText(player2Score,canvas.width-100,100);
    }

    function colorCircle(centerX,centerY,radius,drawColor){
     
      canvasContext.fillStyle=drawColor;
      canvasContext.beginPath();
      canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
      canvasContext.fill();
    }
    function colorRect(leftX,topY,width,height,drawColor){
      canvasContext.fillStyle=drawColor;
      canvasContext.fillRect(leftX,topY,width,height);
    }