
        var pid, score = 0, time, spaceWasPressed = false, pidtime, firedMissiles = false, numUFOs, time_copy,
            themissile, theufo, ufoSteps = [];
        
        function UFOlaunch(ufoElement,index) {
            // Get a random speed for every UFO
            const UfoSpeeds = [-14, -11, -8, -5, 5, 8, 11, 14];
            const randomIndex = Math.floor(Math.random() * UfoSpeeds.length);
            ufoSteps[index] = UfoSpeeds[randomIndex];

            // Make the UFO move
            setInterval(function() {
                MoveUFO(ufoElement, index);
            }, 25);
        }
            
        function MoveUFO(ufoElement, index) {

            var Rlimit = window.innerWidth;
            var hpos_ufo = parseInt(ufoElement.style.left),
                width_ufo = parseInt(ufoElement.style.width);

            // Move the UFO with its speed stored in ufoSteps[index]
            hpos_ufo = hpos_ufo + ufoSteps[index];

            if (hpos_ufo + width_ufo + 8 >= Rlimit) {
                ufoSteps[index] = -ufoSteps[index];
                hpos_ufo = Rlimit - width_ufo - 8; 
            }


            if (hpos_ufo <= 0) {
                ufoSteps[index] = -ufoSteps[index];
                hpos_ufo = 0; 
            }

            ufoElement.style.left = hpos_ufo + 'px';
            
        } 
    
        function countTime() {
            
            // Get the time from the HTML and decrease it
            time = document.getElementById('time').innerHTML;
            time = parseInt(time) - 1;
            document.getElementById('time').innerHTML = time;
    
            // If the time is 0, clear the intervals and calculate the final score
            if (time == 0) {
                
                clearInterval(pidtime);
                clearInterval(pid);
                firedMissiles = true;
                spaceWasPressed = true;

                if (time_copy == 60) {
                    score = score - (numUFOs * 50);
                    localStorage.setItem("finalScore", score);
                    document.getElementById('score-value').innerHTML = score;
                    document.getElementById('scoreFinal').style.display = 'flex';
                }

                if (time_copy == 120) {
                    score = score / 2;
                    score = score - (numUFOs * 50);
                    localStorage.setItem("finalScore", score);
                    document.getElementById('score-value').innerHTML = score;
                    document.getElementById('scoreFinal').style.display = 'flex';
                }

                if (time_copy == 180) {
                    score = score / 3;
                    score = score - (numUFOs * 50);
                    localStorage.setItem("finalScore", score);
                    document.getElementById('score-value').innerHTML = score;
                    document.getElementById('scoreFinal').style.display = 'flex';
                }
            }
        }


        function pullTrigger(){
            
            if (!firedMissiles) {
                pid = setInterval(launch, 10);
                firedMissiles = true;
            }
            
            if (!spaceWasPressed) {
                pidtime = setInterval(countTime, 1000);
                spaceWasPressed = true;
            }
        
            
        }
            
        function checkforaHit(){

            var vpos_m = parseInt(themissile.style.bottom),
                hpos_m = parseInt(themissile.style.left),
                width_m = parseInt(themissile.style.width),
                height_m = parseInt(themissile.style.height),
                hitUfo = null; 
    
            const ufos = document.querySelectorAll('#ufoContainer img');

            for (let ufo of ufos) {
                var hpos_ufo = parseInt(ufo.style.left),
                    vpos_ufo = parseInt(ufo.style.bottom),
                    width_ufo = parseInt(ufo.style.width);
        
                    if (
                        (vpos_m <= vpos_ufo + width_ufo) && 
                        (vpos_m + height_m >= vpos_ufo) && 
                        (hpos_m + width_m / 2 > hpos_ufo) && 
                        (hpos_m + width_m / 2 < hpos_ufo + width_ufo) 
                    ) {
                        hitUfo = ufo;
                        break;
                    }
            }
    
            return hitUfo;
        }
        
        function launch(){
            var uLimit = window.innerHeight, vpos_m, vstep = 5;

            let hitUfo = checkforaHit();

            if (hitUfo) {

                themissile.style.bottom = '0px';
                clearInterval(pid);

                firedMissiles = false;

                score += 100;
                document.getElementById('points').innerHTML = score;
                hitUfo.src = "../imgs/explosion.gif";

                setTimeout(function() {
                    hitUfo.src = "../imgs/ufo.png";
                }, 1000);
            } 

            vpos_m = parseInt(themissile.style.bottom);

            if (vpos_m < uLimit) {
                var newpos = vpos_m + vstep;
                themissile.style.bottom = newpos + 'px';

            } 

            if (vpos_m > uLimit) {
                themissile.style.bottom = 0 + 'px';
                clearInterval(pid);
                firedMissiles = false;

                if (checkforaHit() == null) {
                    score -= 25;
                    document.getElementById('points').innerHTML = score;
                }
            }
            
        }  
    
        function moveMissileRight(){
            
            var rLimit = window.innerWidth, 
                hpos_m, misWidth, hstep = 5;
            var actualpos = parseInt(themissile.style.left);
            var newpos = actualpos + hstep;
        
            if (!firedMissiles) {
                themissile.style.left = newpos + 'px';
                maxwidth = rLimit - parseInt(themissile.style.width);
            
                if (newpos > maxwidth) {
                    themissile.style.left = 0 + 'px';
                } 
            }
        }
    
        function moveMissileLeft() {  
            var hstep = 5, hpos_m; 
            var actualpos = parseInt(themissile.style.left);
            var newpos = actualpos - hstep;
        
            if (!firedMissiles) {

                themissile.style.left = newpos + 'px';
                maxwidth = 0;
            
                if (newpos < maxwidth) {
                    themissile.style.left = 0 + 'px';
                }
            }
        }  
        
        function keyboardController (theEvent) {
            let interval = 15;    
            let code = theEvent.key;
            console.log(code);
            switch (code){
            case 'ArrowRight':  moveMissileRight();      
                                break;
            case 'ArrowLeft':   moveMissileLeft();      
                                break;
            case ' '         : pullTrigger();
                                break;
            }
        }
        
        window.onload = function() {
    
            themissile = document.getElementById('missile');

            // Get the number of UFOs from local storage
            const ufoContainer = document.getElementById('ufoContainer');
            numUFOs = parseInt(localStorage.getItem("numberOfUFOs") || "1");
   
            // Create the UFOs
            for (let i = 0; i < numUFOs; i++) {

                // Create the UFO element as an img 
                // Set the id, src, bottom, left, width, position
                // Append the UFO element to the ufoContainer div

                let ufoElement = document.createElement('img');
                ufoElement.id = 'ufo' + (i + 1);
                ufoElement.src = "../imgs/ufo.png";
                
                let bottomValue = 400 + i * 50;
                ufoElement.style.bottom = bottomValue + 'px';
                let leftValue = 400 + i * 100;
                ufoElement.style.left = leftValue + 'px';
   
                ufoElement.style.width = '60px';
                ufoElement.style.position = 'absolute';

                ufoSteps[i] = 5 + i;
                ufoContainer.appendChild(ufoElement);
            
                // Launch the UFO
                UFOlaunch(ufoElement,i);  
            }
           
            document.addEventListener('keydown', keyboardController);

            // Get the time from local storage
            time = localStorage.getItem("playTime");
            time_copy = time;
            document.getElementById('time').innerHTML = time;
        }
        
