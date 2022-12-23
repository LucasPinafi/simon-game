var choices = ['blue', 'green', 'red', 'yellow']
var game_choices = []
var index = 0; 
var started = false; 
var canPlay = false; 
var gameOver = false; 

document.addEventListener("keydown", function (key_info) {
    if(key_info.key === "a" && !started) {
        addNewMoviment(300); 
        started = true; 
    }
    if(gameOver) {
        gameOver = false; 
        started = false; 
        canPlay = false; 
        game_choices.length = 0; 
        document.getElementsByClassName("title")[0].innerText = "Pressione A para começar"; 
    }
})


buttons = document.getElementsByClassName("btn");
for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        if(canPlay && !gameOver) {
            let color = this.classList[1]; 
            if(color == game_choices[index]) {
                index++; 
                animate(color, "pressed"); 
            } else {
                animate(color, "pressed", false); 
                gameOver = true;
                document.getElementsByClassName("title")[0].innerText = "Você perdeu! Pressione qualquer tecla!";
            }

            if(index == game_choices.length) {
                canPlay = false; 
                addNewMoviment(1000); 
            }
        }
    })
}

function addNewMoviment(time) {
    setTimeout(() => {
        let color = choices[Math.floor(Math.random() * choices.length)]; 
        game_choices.push(color); 
        animate(color, "new"); 
        canPlay = true; 
        index = 0; 
        document.getElementsByClassName("title")[0].innerText = "Nível " + (game_choices.length);

    }, time)
}


function animate(color, css_name, right=true) {
    canPlay = false;
    let btn = document.getElementsByClassName(color)[0]; 
    console.log(btn);
    if(right) {
        let audio = new Audio("sounds/" + color + ".mp3"); 
        audio.play(); 
    } else {
        let audio = new Audio("sounds/wrong.mp3"); 
        audio.play(); 
    }
    
    btn.classList.add(css_name); 
    setTimeout(() => {
        btn.classList.remove(css_name); 
        canPlay = true; 
    }, 350); 
    
}

