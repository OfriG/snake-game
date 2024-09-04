        let inputDir = {x:0, y:0};
        const moveSound = new Audio("move.mp3");
        const foodSound = new Audio("food.mp3");
        const gameOverSound = new Audio("gameover.mp3");
        let speed = 4;
        let lastPaintTime = 0;
        let snakeArr = [{ x: 13, y: 15 }];
        let food = { x: 6, y: 7 };
        let score = 0;
        //game functions
        function main(ctime) {
            window.requestAnimationFrame(main);
            //    console.log(ctime);
            if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
                return;
            }
            lastPaintTime = ctime;
            gameEngine();
        }

        function collide(snake) {
            //if you bump into yourself
            for (let i = 1; i < snakeArr.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                    return true;
                }
            }
            //if you bump into the wall 
            if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
                return true;
            }
            return false;

        }
        function gameEngine() {
            //part1 updating snake & food

            if (collide(snakeArr)) {
                gameOverSound.play();
                inputDir = { x: 0, y: 0 };//reset input direction 
                Swal.fire("Game over :(Press ctrl + r to refresh the game)");
                snakeArr = [{ x: 13, y: 15 }];
                score = 0;
                scoreBox.innerHTML = "Score: " + score;
            }
            //if you have eaten the food, regenerate the food
            if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
                foodSound.play();
                score++;
                scoreBox.innerHTML = "Score: " + score;

                if (score > hiscore) {
                    hiscoreval = score;
                    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                    highScoreBox.innerHTML = "HiScore: " + hiscoreval;
                }
                snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
                let a = 2, b = 16;
                food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

            }
            //Move the snake 
            for (let i = snakeArr.length -2; i >= 0; i--) {
                snakeArr[i + 1] = { ...snakeArr[i] };
            }
            snakeArr[0].x += inputDir.x;
            snakeArr[0].y += inputDir.y;

            //part2 display/ render snake & food

            //display snake
            playArea.innerHTML = " ";
            snakeArr.forEach((e, index) => {
                snakeElement = document.createElement('div');
                snakeElement.style.gridRowStart = e.y;
                snakeElement.style.gridColumnStart = e.x;
                //first element in snake
                if (index === 0) {
                    snakeElement.classList.add('head')
                } else {
                    snakeElement.classList.add('snake');
                }
                playArea.appendChild(snakeElement);
            });
            //display food
            foodElement = document.createElement('div');
            foodElement.style.gridRowStart = food.y;
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add('food');
            playArea.appendChild(foodElement);
        }
        //main logic behind runing the game
        let hiscore = localStorage.getItem("hiscore");
        if (hiscore === null) {
            hiscoreval = 0;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
        }
        else {
            hiscoreval = JSON.parse(hiscore);
            highScoreBox.innerHTML = "Hiscore: " + hiscore;
        }
        window.requestAnimationFrame(main);
        window.addEventListener('keydown', e => {
            inputDir = { x: 0, y: 1 };
            switch (e.key) {
                case "ArrowUp":
                    console.log("ArrowUp");
                    inputDir.x = 0;
                    inputDir.y = -1;

                    break;
                case "ArrowDown":
                    console.log("ArrowDown");
                    inputDir.x = 0;
                    inputDir.y = 1;
                    break;
                case "ArrowLeft":
                    console.log("ArrowLeft");
                    inputDir.x = -1;
                    inputDir.y = 0;
                    break;
                case "ArrowRight":
                    console.log("ArrowRight");
                    inputDir.x = 1;
                    inputDir.y = 0;
                    break;
                default:
                    break;
            }
        })
