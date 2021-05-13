class Game {
    constructor(){
        this.speed = 10;
        this.pause = true;
        this.total_steps = 0;
        this.steps_lbl = $("#steps");
        this.movs_lbl = $("#speed");
        this.intervals;
        this.ants_count = 0;
        this.ants_div = $("#ants");
        this.real_ant = true;
    }


    draw_totalsteps(){

        this.steps_lbl.text(this.total_steps++ + " steps.");

        this.last_time = Date.now();
        this.fps++;
        if( (this.last_time - this.start_time) >= 200 ){
            if(!isNaN(this.fps)) this.movs_lbl.text((this.fps*5) + "mov/s.");
            this.fps = 0;
            this.start_time = this.last_time;
        }

        this.steps_lbl.text(this.total_steps++ + " steps. ");

    }

    new_ant(x,y){

        this.ants_count++;
        this.ants_div.html(this.ants_div.html()+'<img class="ant" id="ant_'+this.ants_count+'" src="media/ant.png" alt="hormiga">');

        var ant = new Ant(x,y, game.ants_count);
        ants.push(ant);
        this.draw_ants();

    }

    draw_ants(){
        for(var x = 0; x < ants.length; x++){
            if(ants[x] != null){
                ants[x].draw_ant();
            }
        }
    }

    run_inteval(speed){
        
        this.speed = speed;

        clearInterval(this.intervals);
        this.intervals = setInterval(function(){
            
            for(var x = 0; x < ants.length; x++){
                if(ants[x] != null) ants[x].move_ant(false)
                if(ants[x] != null) ants[x].draw_ant();
            }

            board.draw_view();

        }, this.speed);

    }
    stop_inteval(){
        clearInterval(this.intervals);
    }

    pause_resume_game(){
        this.pause = !this.pause;
        if(this.pause){
            center_btn.html('<img src="media/play.svg" alt=""></div>');
            this.stop_inteval();
        } else {
            center_btn.html('<img src="media/pause.svg" alt=""></div>');
            this.run_inteval(this.speed);
        }
    }
}

