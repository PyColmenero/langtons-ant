
var jq_canvas = $("canvas");
var canvas = document.getElementsByClassName('canvas')[0];
var context = canvas.getContext('2d');

//medidadas de la pantalla
var w = window.innerWidth;
var h = window.innerHeight;

var PHONE = 0;
var COMPUTER = 1;
var DEVICE;

var board;
var kb_controller;
var directions;
var game;



window.onload = function() {

    // para calcular steps/segundos
    game = new Game();
    game.start_time = Date.now();

    DEVICE = (window.screen.width>window.screen.height) ? COMPUTER : PHONE
    
    board = new Board();
    board.calculate(true);

    kb_controller = new KeyBoardController();
    directions = new Direcction();

    //arrancar
    run();

};

var less = 1;

var resizeTimeOut;
window.addEventListener("resize", function(){
    
    clearTimeout(resizeTimeOut);
    resizeTimeOut = setTimeout(resize, 500);

});

var last_w = w;
function resize(){
    w = window.innerWidth;
    h = window.innerHeight;

    board.calculate(false);
    board.generate_board();

    console.log("ya");
    last_w = w;

}

// arrancar el juego
function run(){
    
    // crear array de arrays
    // board.generate_matrix();
    // dibujar board
    board.generate_board();
    board.draw_view();
    
    // una ant
    game.new_ant(0, 0);
    
    // game.run_inteval(this.speed);

}

