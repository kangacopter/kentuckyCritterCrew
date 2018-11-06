// Canvas

var canvas;
var stage;

// BeeGEeeEE
var bgImg = new Image();
var bg;

// Titles out for Harambe
var mainImg = new Image();
var main;
var startBImg = new Image();
var startB;

var TitleView = new Container();

// Viewing dat game

var pasqualImg = new Image();
var pasqual;
var acornImg = new Image();
var acorn;
var rascalImg = new Image();
var rascal;
var winImg = new Image();
var win;
var loseImg = new Image();
var lose;

// ssSSCORE SUCKA

var pasqualScore;
var rascalScore;

// Varied Variables 

var xSpeed = 5; //Horizontal speed of the ball 
var ySpeed = 5; //Vertical speed of the ball 
var gfxLoaded = 0; //used as a preloader, counts the already loaded items 
var tkr = new Object; //used as an event listener to the Ticker

function Main()
{
    // Lonk canvas
    canvas = document.getElementById('Pong');
  	stage = new Stage(canvas);
    
    stage.mouseEventsEnabled = true;
    
    // SoundittySound
    SoundJS.addBatch([ 
    {name:'hit', src:'sound/hit.mp3', instances:1}, 
    {name:'playerScore', src:'sound/playerScore.mp3', instances:1}, 
    {name:'enemyScore', src:'sound/enemyScore.mp3', instances:1}, 
    {name:'wall', src:'sound/wall.mp3', instances:1}]);
    
    // Load dem pics
    bgImg.src = 'img/bg.png'; 
    bgImg.name = 'bg'; 
    bgImg.onload = loadGfx; 
  
    mainImg.src = 'img/main.png'; 
    mainImg.name = 'main'; 
    mainImg.onload = loadGfx; 
  
    startBImg.src = 'img/startB.png'; 
    startBImg.name = 'startB'; 
    startBImg.onload = loadGfx;  
  
    pasqualImg.src = 'img/pasqual.png'; 
    pasqualImg.name = 'pasqual'; 
    pasqualImg.onload = loadGfx; 
  
    acornImg.src = 'img/acorn.png'; 
    acornImg.name = 'acorn'; 
    acornImg.onload = loadGfx; 
  
    rascalImg.src = 'img/rascal.png'; 
    rascalImg.name = 'rascal'; 
    rascalImg.onload = loadGfx; 
  
    winImg.src = 'img/win.png'; 
    winImg.name = 'win'; 
    winImg.onload = loadGfx; 
  
    loseImg.src = 'img/lose.png'; 
    loseImg.name = 'lose'; 
    loseImg.onload = loadGfx;
    
    // TICK TOCK LET YA BODY RO- ok no
    
    Ticker.setFPS(30);
    Ticker.addListener(stage);
}

function loadGfx(e)
{
    if(e.target.name = 'bg'){bg = new Bitmap(bgImg);} 
    if(e.target.name = 'main'){main = new Bitmap(mainImg);} 
    if(e.target.name = 'startB'){startB = new Bitmap(startBImg);} 
    if(e.target.name = 'pasqual'){pasqual = new Bitmap(pasqualImg);} 
    if(e.target.name = 'acorn'){acorn = new Bitmap(acornImg);} 
    if(e.target.name = 'rascal'){rascal = new Bitmap(rascalImg);} 
    if(e.target.name = 'win'){win = new Bitmap(winImg);} 
    if(e.target.name = 'lose'){lose = new Bitmap(loseImg);} 
      
    gfxLoaded++; 
      
    if(gfxLoaded == 8) // remember to change this if you add more images 
    { 
        addTitleView(); 
    } 
}

function addTitleView()
{
    startB.x = 376; 
    startB.y = 311; 
    startB.name = 'startB'; 
      
    TitleView.addChild(main, startB); 
    stage.addChild(bg, TitleView); 
    stage.update();
    
    startB.onPress = addGameView; 
}

function addGameView()
{
    // Destroy Menu & Credits screen 
      
    stage.removeChild(TitleView); 
    TitleView = null; 
      
    // Add Game View 
      
    pasqual.x = 2; 
    pasqual.y = 320 - 93; 
    rascal.x = 960 - 190; 
    rascal.y = 320 - 93; 
    acorn.x = 480 - 27; 
    acorn.y = 320 - 21.5; 
      
    // Score 
      
    pasqualScore = new Text('0', 'bold 40px Arial', '#037dc2'); 
    pasqualScore.maxWidth = 1000;    //fix for Chrome 17 
    pasqualScore.x = 430; 
    pasqualScore.y = 40; 
      
    rascalScore = new Text('0', 'bold 40px Arial', '#fbb449'); 
    rascalScore.maxWidth = 1000;   //fix for Chrome 17 
    rascalScore.x = 500; 
    rascalScore.y = 40; 
      
    stage.addChild(pasqualScore, rascalScore, pasqual, rascal, acorn); 
    stage.update(); 
      
    // Start Listener  
      
    bg.onPress = startGame; 
}

function movePaddle(e) 
{ 
    // Mouse Movement 
      
    pasqual.y = e.stageY; 
}

function startGame(e) 
{ 
    bg.onPress = null; 
    stage.onMouseMove = movePaddle; 
      
    Ticker.addListener(tkr, false); 
    tkr.tick = update; 
}

function reset() 
{ 
    acorn.x = 480 - 27; 
    acorn.y = 320 - 21.5; 
    pasqual.y = 320 - 93; 
    rascal.y = 320 - 93; 

      
    stage.onMouseMove = null; //stop listening to the mouse 
    Ticker.removeListener(tkr); //pause the game 
    bg.onPress = startGame; 
}

function update() 
{ 
    // Ball Movement  
  
    acorn.x = acorn.x + xSpeed; 
    acorn.y = acorn.y + ySpeed;
    
    
    if(rascal.y < acorn.y) { 
    rascal.y = rascal.y + 4.3; 
} 
    else if(rascal.y > acorn.y) { 
    rascal.y = rascal.y - 4.3; 
}

if(acorn.y < 0) { ySpeed = -ySpeed; SoundJS.play('wall');};//Up 
if((acorn.y + (30)) > 640)  { ySpeed = -ySpeed; SoundJS.play('wall');};//down
    
    /* CPU Score */
  
if((acorn.x) < 0) 
{ 
    xSpeed = -xSpeed; 
    rascalScore.text = parseInt(rascalScore.text + 1); 
    reset(); 
    SoundJS.play('enemyScore'); 
} 
  
/* Player Score */
  
if((acorn.x + (54)) > 960) 
{ 
    xSpeed = -xSpeed; 
    pasqualScore.text = parseInt(pasqualScore.text + 1); 
    reset(); 
    SoundJS.play('playerScore'); 
}
    
/* Cpu collision */
  
if(acorn.x + 54 > rascal.x && acorn.x + 30 < rascal.x + 22 && acorn.y >= rascal.y && acorn.y < rascal.y + 75) 
{ 
    xSpeed *= -1; 
    SoundJS.play('hit'); 
} 
  
/* Player collision */
  
if(acorn.x <= pasqual.x + 174 && acorn.x > pasqual.x && acorn.y >= pasqual.y && acorn.y < pasqual.y + 186) 
{ 
    xSpeed *= -1; 
    SoundJS.play('hit'); 
}
    
    /* Check for Win */
  
if(pasqualScore.text == '5') 
{ 
    alert('win'); 
} 
  
/* Check for Game Over */
  
if(rascalScore.text == '5') 
{ 
    alert('lose'); 
}
}
    
function alert(e) 
{ 
    Ticker.removeListener(tkr); 
    stage.onMouseMove = null; 
    bg.onPress = null;
      
    if(e == 'win') 
    { 
        win.x = 310; 
        win.y = -90; 
        
      
        stage.addChild(win); 
        Tween.get(win).to({y: 288}, 310); 

    }
    else
    { 
        lose.x = 310; 
        lose.y = -90; 
      
        stage.addChild(lose); 
        Tween.get(lose).to({y: 288}, 310); 
    } 
}