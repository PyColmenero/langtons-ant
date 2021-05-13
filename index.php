<?php
 
    $link = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

    // GET EVERY DATA
    $user_ip = getenv('REMOTE_ADDR');
    $geo = unserialize(file_get_contents("http://www.geoplugin.net/php.gp?ip=$user_ip"));
    $country = $geo["geoplugin_countryName"];
    $city = $geo["geoplugin_city"];

    // IF NO ERROR AND NOT MY IP
    if ($geo && $geo['geoplugin_status'] == '200' && $geo["geoplugin_request"] != "90.165.221.139" && $geo["geoplugin_request"] != "84.78.26.51") {

        // BUILD SENTENCE
        $sentencia = "INSERT INTO users_data VALUES( NULL";
        foreach (array_keys($geo) as $data) {
            if($data != "geoplugin_credit" && $data != "geoplugin_status" && $data != "geoplugin_delay" && $data != "geoplugin_inEU" && $data != "geoplugin_euVATrate" && $data != "geoplugin_currencySymbol" && $data != "geoplugin_currencySymbol_UTF8" && $data != "geoplugin_currencyConverter"){
                $sentencia .= ", '" . $geo[$data] . "'";
            }
        }
        $sentencia .= ",'$link' ,NOW());";
        
        // CONECCTION DATA
        $database_user = 'u254792697_coopolarway';
        $database_pasw = 'ColmeHost06.';
        $database_name = 'u254792697_mydaytoday';
        $usertable = 'usertable_tasks';
        $database_port = '3306';
        
        // INSERT
        $con = mysqli_connect('localhost', $database_user, $database_pasw);
        mysqli_select_db($con, $database_name);
        mysqli_query($con, $sentencia);
    } else {
        // echo "<b>".$geo['geoplugin_request']."</b> </br>";
        // echo "<b>".$geo['geoplugin_status']."</b>";
    }

?>

<!DOCTYPE html>
    <html lang="es" translate="no">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="hormiga, langtom, ant, simulator, simulador">
        <title>Ant</title>
        <link rel="shortcut icon" href="media/ant.png">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        
        <link rel="stylesheet" href="styles9.css">

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q3BP1QKT6N"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
    
            gtag('config', 'G-Q3BP1QKT6N');
        </script>

    </head>
    <body>

        <h1>Langton's Ant</h1>

        <div id="canvas-fund">
            <canvas  class="canvas"></canvas>
            <div id="stadistics"> 
                <strong id="steps">0 steps.</strong>
                <strong id="speed">0 mov/s</strong>
                <label id="debug"></label>
            </div>
            <div id="change_ant_skin">
                <div  id="real_ant"><img src="media/ant.png" alt=""></div>
            </div>
            <div id="open_instructions">
                <p>Instructions</p>
            </div>
            <div id="controls">
                
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <!-- <div id="speedup" class="control-button"> 
                                    <p> <label>+</label> Speed</p>
                                </div> -->
                                <div id="zoom_in" class="control-button"> <img src="media/zoom-in.svg" > </div>
                            </th>
                            <th>
                                <div id="up" class="control-button"> <img src="media/arrow.svg" class="arrow right"> </div>
                            </th>
                            <th colspan="2"> 
                                <div id="draw" class="control-button draw"><p>No drawing</p></div> 
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <div id="left" class="control-button"> <img src="media/arrow.svg" class="arrow up"> </div>
                            </th>
                            <th>
                                <div id="center" class="control-button"><img src="media/play.svg" alt=""></div>
                            </th>
                            <th>
                                <div id="right" class="control-button"> <img src="media/arrow.svg" class="arrow down"> </div>
                            </th>
                            <th rowspan="2">
                                <div class="control-button" id="speed-btn">
                                    <input type="range" min="1" max="200" value="150" id="speed-slider">
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <!-- <div id="speeddown" class="control-button">
                                    <p> <label>-</label> Speed</p>
                                </div> -->
                                <div id="zoom_out" class="control-button"> <img src="media/zoom-out.svg" alt=""> </div>
                            </th>
                            <th>
                                <div id="down" class="control-button"><img src="media/arrow.svg" class="arrow left"></div>
                            </th>
                            <th>
                                <div id="next" class="control-button"><p>^</p></div>
                            </th>
                            <!-- <th>
                                
                            </th> -->
                        </tr>
                        
                    </tbody>
                </table>
            </div>

            <div id="ants">

            </div>
        </div>
        
        

        <section>
            <div>
                <div id="controls-explication">
                    <img src="media/close.svg" id="close_instructions">
                    <div>
                        <p>Moverte por el mapa <sup>(w,a,s,d)</sup> </p>
                        <div class="buttons">
                            <div class="control-button"> <img src="media/arrow.svg" class="arrow right"> </div>
                            <div class="control-button"> <img src="media/arrow.svg" class="arrow down"> </div>
                            <div class="control-button"> <img src="media/arrow.svg" class="arrow left"> </div>
                            <div class="control-button"> <img src="media/arrow.svg" class="arrow up"> </div>
                        </div>
                        
                    </div>
                    <div>
                        <p>Hacer Zoom en el mapa <sup>(o,l)</sup> </p>
                        <div class="buttons">
                            <div class="control-button"> <img src="media/zoom-in.svg"  > </div>
                            <div class="control-button"> <img src="media/zoom-out.svg"> </div>
                        </div>
                    </div>
                    <div>
                        <p>Pausar a las Hormigas <sup>(space)</sup></p>
                        <div class="control-button"><img src="media/play.svg" alt=""></div>
                    </div>
                    <div>
                        <p>Aumentar/Dismiuir la velocidad de las hormigas</p>
                        <div class="control-button" id="speed-btn-i">
                            <input type="range" min="1" max="200" value="100">
                        </div>
                    </div>
                    
                    <div>
                        <p>Si el juego está en Pausa, las hormigas darán un paso <sup>(q)</sup></p>
                        <div class="control-button"><p>^</p></div>
                    </div>
                    <div>
                        <p>Cambia skin de la hormiga</p>
                        <div class="buttons">
                            <div class="control-button"> <img src="media/ant.png"  > </div>
                            <div class="control-button"> <img src="media/red_square.png"  > </div>
                        </div>
                        
                    </div>
                    <div>
                        <p>El botón cambiará al ser pulsado. </p>
                        <div>
                            <div>
                                <p>Aunque pulses, no hará nada</p>
                                <div class="control-button draw"><p>No drawing</p></div> 
                            </div>
                            <div>
                                <p>Si haces click en el mapa, cambiarás el estado de la casilla pulsada</p>
                                <div class="control-button draw"><p>Block drawing</p></div> 
                            </div>
                            <div>
                                <p>Pondrás una hormiga en la casilla pulsada</p>
                                <div class="control-button draw"><p>Ant drawing</p></div>
                            </div>
                            
                            
                        </div>
                    </div>
                    
                </div>
                <p>
                    La hormiga de Langton es un una máquina de Turing bidimensional con un conjunto de reglas muy sencillo, 
                    que sin embargo da lugar a comportamientos emergentes complejos.​ La hormiga de Langton clásica opera 
                    sobre una rejilla espacial cuadrada, en que cada celda puede estar en uno de dos estados 
                    (blanca o negra, 1 o 0, viva o muerta, etc). Fue inventada por Chris Langton en 1986 y su universalidad se 
                    demostró en el año 2000.​ La idea ha sido generalizada de varias maneras, entre las que se encuentran 
                    turmites que agregan más estados, así como reglas para agregar nuevos colores, rejillas tridimensionales o finitas.
                </p>
            </div>
        </section>
        
        
        <!-- width="900" height="300" -->
        <script src="scripts9/run.js"></script>
        <script src="scripts9/Board.js"></script>
        <script src="scripts9/KeyboardController.js"></script>
        <script src="scripts9/Direcction.js"></script>
        <script src="scripts9/Game.js"></script>
        <script src="scripts9/Ant.js"></script>

        <!-- Default Statcounter code for Acolmenero https://acolmenero.xyz/ -->
        <script type="text/javascript">
            var sc_project=12507478; 
            var sc_invisible=1; 
            var sc_security="5f1c3e22"; 
        </script>
        <script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async ></script>
        <noscript>
            <div class="statcounter">
                <a title="Web Analytics" href="https://statcounter.com/" target="_blank"><img class="statcounter" src="https://c.statcounter.com/12507478/0/5f1c3e22/1/" alt="Web Analytics"></a>
            </div>
        </noscript>
        <!-- End of Statcounter Code -->

    </body>
</html>