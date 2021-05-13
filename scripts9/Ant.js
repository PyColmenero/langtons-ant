class Ant {
    constructor(x, y, id) {

        this.id = id;
        this.direction = directions.UP;
        this.position = {
            "x": x,
            "y": y
        };
        this.speed = 1000;
        this.img;

    }

    draw_ant() {

        // get img element
        this.img = $("#ant_" + (this.id));

        // start coordinates of antblock
        var x_init_block = (this.position.x - board.x_start_render) * board.block_size;
        var y_init_block = (this.position.y - board.y_start_render) * board.block_size;

        // draw antblock

        if (!game.real_ant) {
            var pc = board.block_size * 0.1;
            context.fillStyle = "red";
            context.fillRect(x_init_block + pc, y_init_block + pc, board.block_size - (2 * pc), board.block_size - (2 * pc));
            this.draw_ant_dir(x_init_block, y_init_block);
            this.img.css("display", "none");
        } else {
            this.img.css("display", "block");

            y_init_block = (y_init_block - (board.block_size / 2));
            x_init_block = (x_init_block - (board.block_size / 2));

            this.img.css("width", (board.block_size * 2) + "px");
            this.img.css("top", y_init_block + "px");
            this.img.css("left", x_init_block + "px");

            switch (this.direction) {
                case directions.UP: this.img.attr("class", "ant up");
                    break;
                case directions.RIGHT: this.img.attr("class", "ant right");
                    break;
                case directions.DOWN: this.img.attr("class", "ant down");
                    break;
                case directions.LEFT: this.img.attr("class", "ant left");
                    break;
            }
        }



    }

    draw_ant_dir(x_init_block, y_init_block) {

        context.strokeStyle = 'black';
        context.beginPath();
        context.moveTo(x_init_block + board.block_size / 2, y_init_block + board.block_size / 2);

        switch (this.direction) {
            case directions.UP: context.lineTo(x_init_block + board.block_size / 2, y_init_block);
                break;
            case directions.RIGHT: context.lineTo(x_init_block + board.block_size, y_init_block + board.block_size / 2);
                break;
            case directions.DOWN: context.lineTo(x_init_block + board.block_size / 2, y_init_block + board.block_size);
                break;
            case directions.LEFT: context.lineTo(x_init_block, y_init_block + board.block_size / 2);
                break;
        }

        context.stroke();
    }

    move_ant(steps) {

        if (!game.pause || steps == true) {

            // if (this.position.x >= 1000 || this.position.y >= 1000 || this.position.x <= -1 || this.position.y <= -1) {
            //     ants[this.id - 1] = null;
            //     $("#ant_" + this.id).remove();
            // } else {

                var empty = true;
                var index;

                for (var x = 0; x < board.matrix.length; x++) {
                    if(board.matrix[x].x == this.position.x && board.matrix[x].y == this.position.y){
                        empty = false;
                        index = x;
                        if(board.matrix[x].type == board.WHITE_STATE){
                            board.matrix[x].type = board.OLD_BLACK_STATE;
                            this.change_ant_dir(true, this);
                        } else {
                            board.matrix[x].type = board.WHITE_STATE;
                            this.change_ant_dir(false, this);
                        }
                    }
                }

                if(empty){
                    board.matrix.push({
                        "x": this.position.x,
                        "y": this.position.y,
                        "type": board.WHITE_STATE
                    })
                    index = board.matrix.length-1;
                    // board.matrix[x].type = board.WHITE_STATE;
                    this.change_ant_dir(false, this);
                }

                // if (board.matrix[this.position.x][this.position.y] == board.WHITE_STATE) {
                    
                // } else if (board.matrix[this.position.x][this.position.y] == board.OLD_BLACK_STATE || board.matrix[this.position.x][this.position.y] == board.NEW_BLACK_STATE) {
                //     board.matrix[this.position.x][this.position.y] = board.WHITE_STATE;
                //     change_ant_dir(false, this);
                // }


                board.draw_block(index);


                switch (this.direction) {
                    case directions.RIGHT: this.position.x += 1;
                        break;
                    case directions.DOWN: this.position.y += 1;
                        break;
                    case directions.LEFT: this.position.x -= 1;
                        break;
                    case directions.UP: this.position.y -= 1;
                        break;
                }

                this.draw_ant();

                game.draw_totalsteps();
            // }


        }
    }

    // según la direccion de la ANT, y a la direccion que se mueva, 
// asignar una nueva dirección
    change_ant_dir(dir, ant){

        // directions.RIGHT ==> true
        if(ant.direction == directions.UP){
            if(dir == true){
                ant.direction = directions.RIGHT;
            } else {
                ant.direction = directions.LEFT;
            }
            return true;
        }
    
        if(ant.direction == directions.RIGHT){
            if(dir == true){
                ant.direction = directions.DOWN;
            } else {
                ant.direction = directions.UP;
            }
            return true;
        }
    
        if(ant.direction == directions.DOWN){
            if(dir == true){
                ant.direction = directions.LEFT;
            } else {
                ant.direction = directions.RIGHT;
            }
            return true;
        }
    
        if(ant.direction == directions.LEFT){
            if(dir == true){
                ant.direction = directions.UP;
            } else {
                ant.direction = directions.DOWN;
            }
            return true;
        }
    
    }



}

var ants = [];