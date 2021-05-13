

$(document).keypress(function (e) {
    // console.log(e.which);
    if (e.which == 97) {
        board.move_render(directions.LEFT);
    }  // a
    if (e.which == 100) {
        board.move_render(directions.RIGHT);
    }   // d
    if (e.which == 119) {
        board.move_render(directions.UP);
    }  // w
    if (e.which == 115) {
        board.move_render(directions.DOWN);
    }   // s
    if (e.which == 111) {
        if (board.width / board.block_size >= 15) board.zoom(2);
    }  // o
    if (e.which == 108) {
        if (board.total_x_blocks <= 500) board.zoom(0.5);
    }   // l
    if (e.which == 114) {
        if (parseInt(game.speed * 0.75) >= 1) game.run_inteval(parseInt(game.speed * 0.75));
    }  // r
    if (e.which == 102) {
        if (parseInt(game.speed * 1.25) <= 10000) game.run_inteval(parseInt((game.speed * 1.25)) + 1);
    }   // f
    if (e.which == 113) {
        if (game.pause) {
            for (var x = 0; x < ants.length; x++) {
                ants[x].move_ant(true);
            }
        }
    }   // l

    if (e.which == 32) {
        e.preventDefault();
        game.pause_resume_game();
        console.log((!game.pause) ? "en loop" : "stoped");
    }  // espace

});

class KeyBoardController {
    constructor() {

        this.allow_draw = true;

        this.map_movement_speed = parseInt(board.total_x_blocks / 30) + 1;

        this.DRAW_BLOCK = 0;
        this.DRAW_ANT = 1;
        this.draw_mode = null;


    }

    change_draw_mode() {
        if (this.draw_mode === null) {
            this.draw_mode = this.DRAW_BLOCK;
            draw.html("<p>Block drawing</p>");
        } else if (kb_controller.draw_mode == this.DRAW_BLOCK) {
            this.draw_mode = this.DRAW_ANT;
            draw.html("<p>Ant drawing</p>");
        } else if (this.draw_mode === this.DRAW_ANT) {
            this.draw_mode = null;
            draw.html("<p>No drawing</p>");
        }

    }

    // cambiar de color el bloque que haga click
    change_clicked_block_state(event, draw) {

        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        var x_clicked_block_coor = parseInt(x / board.block_size);
        var y_clicked_block_coor = parseInt(y / board.block_size);
        x_clicked_block_coor += board.x_start_render;
        y_clicked_block_coor += board.y_start_render;

        console.log(x_clicked_block_coor, y_clicked_block_coor);
        

        // if (x_clicked_block_coor <= 999 && y_clicked_block_coor <= 999 && x_clicked_block_coor >= 0 && y_clicked_block_coor >= 0) {
            if (draw) {
                if (kb_controller.draw_mode == kb_controller.DRAW_BLOCK) {

                    var index = -1;
                    for(var z = 0; z < board.matrix.length; z++){
                        if(board.matrix[z].x == x_clicked_block_coor && board.matrix[z].y == y_clicked_block_coor){
                            if (board.matrix[z].type == board.WHITE_STATE) {
                                board.matrix[z].type = board.OLD_BLACK_STATE;
                            } else if (board.matrix[z].type == board.OLD_BLACK_STATE) {
                                board.matrix[z].type = board.NEW_BLACK_STATE;
                            } else {
                                board.matrix[z].type = board.WHITE_STATE;
                            }
                            index = z;
                        }
                    }
                    if(index == -1){
                        board.matrix.push({
                            "x": x_clicked_block_coor,
                            "y": y_clicked_block_coor,
                            "type": board.WHITE_STATE
                        });
                        index = board.matrix.length-1;
                    }

                    board.draw_block(index);
                } else {
                    game.new_ant(x_clicked_block_coor, y_clicked_block_coor);
                }

                game.draw_ants();
            }
        // }
    }
}


up_btn = $("#up");
down_btn = $("#down");
right_btn = $("#right");
left_btn = $("#left");
center_btn = $("#center");
zoom_in = $("#zoom_in");
zoom_out = $("#zoom_out");
draw = $("#draw");
next = $("#next");
// speedup_btn = $("#speedup");
// speeddown_btn = $("#speeddown");
real_ant_btn = $("#real_ant");
open_instructions = $("#open_instructions");
close_instructions = $("#close_instructions");
speed_btn = $("#speed-slider");


// BOTONES DE MOVIMIENTO POR EL MAPA
up_btn.click(function () {
    board.move_render(directions.UP);
});
down_btn.click(function () {
    board.move_render(directions.DOWN);
});
right_btn.click(function () {
    board.move_render(directions.RIGHT);
});
left_btn.click(function () {
    board.move_render(directions.LEFT);
});

// PAUSE
center_btn.click(function () {
    game.pause_resume_game();
});

// ZOOM
zoom_in.click(function () {
    if (board.width / board.block_size >= 15) board.zoom(2);
});
zoom_out.click(function () {
    if (board.total_x_blocks <= 500) board.zoom(0.5);
});

// DRAW MODE
draw.click(function () {
    kb_controller.change_draw_mode();
});

// NEXT STEP
next.click(function () {
    if (game.pause) {
        for (var x = 0; x < ants.length; x++) {
            ants[x].move_ant(true);
        }
    }
});

// SPEED

// change ant skin
real_ant_btn.click(function () {
    game.real_ant = !game.real_ant;
    if (game.real_ant) {
        real_ant_btn.html('<img src="media/ant.png" alt="">');
        board.generate_board();
    } else {
        real_ant_btn.html('<img src="media/red_square.png" alt="">');
    }
    game.draw_ants();
});

open_instructions.click(function () {
    $("section").css("display", "block")
});
close_instructions.click(function () {
    $("section").css("display", "none")
});

// CLICK PARA DRAW
canvas.addEventListener('mousedown', function (event) {
    var draw = (kb_controller.draw_mode != null)
    kb_controller.change_clicked_block_state(event, draw);
})
$(document).on('click', '.ant', function () {
    if (kb_controller.draw_mode == kb_controller.DRAW_ANT) {

        var ant_ID = parseInt($(this).attr("id").substring(4)) - 1;

        delete ants[ant_ID];
        ants[ant_ID] = null;
        $(this).remove();
    }
});

speed_btn.on("change", function () {
    var speed = $(this).val();
    speed = 200 - speed;

    if (speed > 100) {
        game.run_inteval(parseInt(speed * 3))
    } else {
        game.run_inteval(parseInt(speed))
    }

});
