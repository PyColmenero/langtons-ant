class Board {
    constructor() {

        this.block_size;

        this.total_x_blocks = 50;
        this.total_y_blocks;
        this.middle_x_blocks;
        this.middle_y_blocks;
        this.width;
        this.height;

        this.x_start_render;
        this.y_start_render;

        // this.MATRIZ_SIZE = 1000;
        this.matrix = [];

        this.OLD_BLACK_STATE = 0;
        this.WHITE_STATE = 1;
        this.NEW_BLACK_STATE = 2;


    }

    calculate(re) {

        this.total_x_blocks = parseInt((last_w * this.total_x_blocks) / w)+1;
        var total_y_blocks;

        if (DEVICE == COMPUTER) {
            if(!re) this.total_x_blocks = parseInt((w*0.8)/this.block_size)+1;

            total_y_blocks = parseInt(((h * 0.6) * this.total_x_blocks) / (w * 0.8))+1;
            if(re) this.block_size = parseInt((w * 0.8) / this.total_x_blocks);
        } else {
            if(!re) this.total_x_blocks = parseInt((w)/this.block_size)+1;

            total_y_blocks = parseInt((h * this.total_x_blocks) / w)+1;
            if(re) this.block_size = parseInt(w / this.total_x_blocks);
        }

        // 800 100
        // 700 x

        this.total_y_blocks = total_y_blocks;
        this.middle_x_blocks = parseInt(this.total_x_blocks / 2);
        this.middle_y_blocks = parseInt(this.total_y_blocks / 2);
        this.width = this.total_x_blocks * this.block_size;
        this.height = this.total_y_blocks * this.block_size;


        if (DEVICE == COMPUTER) {
            jq_canvas.attr("width", w*0.8);
            jq_canvas.attr("height", h*0.6);
        } else {
            jq_canvas.attr("width", w);
            jq_canvas.attr("height", h);
        }


        if (re) {
            this.x_start_render = 0 - this.middle_x_blocks;
            this.y_start_render = 0 - this.middle_y_blocks;
        }
    }

    /**
     * Dibujar un bloque
     * 
     * @param {coordenada x en la matriz del board} x 
     * @param {coordenada y en la matriz del board} y 
     */
    draw_block(index) {

        var x = this.matrix[index].x;
        var y = this.matrix[index].y;
        var type = this.matrix[index].type;

        if (type == this.WHITE_STATE) context.fillStyle = "white";
        if (type == this.OLD_BLACK_STATE) context.fillStyle = "#242020";
        if (type == this.NEW_BLACK_STATE) context.fillStyle = "#000000";

        var x_init_block = (x - this.x_start_render) * this.block_size;
        var y_init_block = (y - this.y_start_render) * this.block_size;
        

        if (type == this.WHITE_STATE) {
            // context.fillStyle = "grey"; 
            // context.fillRect(x_init_block, y_init_block, this.block_size, this.block_size);

            context.fillStyle = "#c9c9c9"; 
            context.fillRect(x_init_block, y_init_block, this.block_size, this.block_size);

            context.fillStyle = "white"; 
            context.fillRect(x_init_block, y_init_block, this.block_size-1, this.block_size-1);
        } else {
            context.fillRect(x_init_block, y_init_block, this.block_size, this.block_size);
        }
         
    }

    // dibujar el tablero segun la matriz
    generate_board() {

        context.fillStyle = "#000000";
        context.fillRect(0, 0, w, h);
        var aa = 0;
        for (var x = 0; x < this.matrix.length; x++) {
            if(this.matrix[x].x >= this.x_start_render && this.matrix[x].x < this.x_start_render+this.total_x_blocks){
                if(this.matrix[x].y >= this.y_start_render && this.matrix[x].y < this.y_start_render+this.total_y_blocks){
                    aa++;

                    var x_init = (this.matrix[x].x-this.x_start_render) * this.block_size;
                    var y_init = (this.matrix[x].y-this.y_start_render) * this.block_size;
        
                    if(this.matrix[x].type == this.WHITE_STATE){
                        context.fillStyle = "#c9c9c9"; 
                        context.fillRect(x_init, y_init, this.block_size, this.block_size);  
        
                        context.fillStyle = "white"; 
                        context.fillRect(x_init, y_init, this.block_size-1, this.block_size-1);  
                    }
                    if(this.matrix[x].type == this.OLD_BLACK_STATE){
                        context.fillStyle = "#242020";
                        context.fillRect(x_init, y_init, this.block_size, this.block_size);
                    }
                }
            }
        }

        console.log(aa);

        var debug_str = "";

        debug_str += "</br> <b>" + "blockW </b>" + this.block_size;
        debug_str += "</br> <b>" + "totalX </b>" + this.total_x_blocks;
        debug_str += "</br> <b>" + "totalY </b>" + this.total_y_blocks;
        debug_str += "</br> <b>" + "middleX </b>" + this.middle_x_blocks;
        debug_str += "</br> <b>" + "middleY </b>" + this.middle_y_blocks;
        debug_str += "</br> <b>" + "w </b>" + w;
        debug_str += "</br> <b>" + "h </b>" + h;
        debug_str += "</br> <b>" + "wB </b>" + this.width;
        debug_str += "</br> <b>" + "hB </b>" + this.height;
        debug_str += "</br> <b>" + "xStarRender </b>" + this.x_start_render;
        debug_str += "</br> <b>" + "yStarRender </b>" + this.y_start_render;

        // $("#debug").html(debug_str);

        game.draw_ants();

    }

    /**
     * hacer zoom en la renderización del tablero
     * @param {divisor para dividar y multiplicar el with de cada bloque} divisor 
     */
    zoom(divisor) {


        this.block_size *= divisor;

        var first_x_board_center = this.x_start_render + this.middle_x_blocks;
        var first_y_board_center = this.y_start_render + this.middle_y_blocks;

        this.total_x_blocks = parseInt(board.width / this.block_size) + 1;
        this.total_y_blocks = parseInt(board.height / this.block_size + 1);
        this.middle_x_blocks = parseInt(this.total_x_blocks / 2);
        this.middle_y_blocks = parseInt(this.total_y_blocks / 2);

        // this.x_start_render = 0 - this.middle_x_blocks;
        // this.y_start_render = 0 - this.middle_y_blocks;

        var last_x_board_center = this.x_start_render + this.middle_x_blocks;
        var last_y_board_center = this.y_start_render + this.middle_y_blocks;

        this.x_start_render = this.x_start_render - (last_x_board_center - first_x_board_center);
        this.y_start_render = this.y_start_render - (last_y_board_center - first_y_board_center);

        kb_controller.map_movement_speed = parseInt(board.total_x_blocks / 30) + 1;

        this.generate_board();
        this.draw_view();

    }


    draw_view(){
        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo( (jq_canvas.outerWidth()/2)-4, jq_canvas.outerHeight()/2 );
        context.lineTo( (jq_canvas.outerWidth()/2)+4, jq_canvas.outerHeight()/2 );
        context.stroke();
        context.beginPath();
        context.moveTo( (jq_canvas.outerWidth()/2), (jq_canvas.outerHeight()/2)-4 );
        context.lineTo( (jq_canvas.outerWidth()/2), (jq_canvas.outerHeight()/2)+4 );
        context.stroke();
    }


    move_render(dir) {

        switch (dir) {
            case directions.UP: board.y_start_render -= kb_controller.map_movement_speed;
                board.generate_board();
                break;
            case directions.DOWN: board.y_start_render += kb_controller.map_movement_speed;
                board.generate_board();
                break;
            case directions.RIGHT: board.x_start_render += kb_controller.map_movement_speed;
                board.generate_board();
                break;
            case directions.LEFT: board.x_start_render -= kb_controller.map_movement_speed;
                board.generate_board();
                break;
        }

        this.draw_view();
    }


}
