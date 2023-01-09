var player;
var background;
var rintangan = [];

function cetak(text){
    return text
}

var arena = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");

        // mencetak element ke html
        document.getElementById("game").insertBefore(this.canvas, document.getElementById("game").childNodes[0]);

        this.interval = setInterval(updateGame , 20)

        window.addEventListener("keydown", function(event){
            arena.keys = arena.keys || []
            arena.keys[event.keyCode] = event.type == "keydown"
        })

        window.addEventListener("keyup", function(event){
            arena.keys[event.keyCode] = event.type == "keydown"
        })
    },
    clear: function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height)
    },
    stop: function(){
        clearInterval(this.interval)
    }

}


// konfigurasi player
function komponen(width, height, color, x, y, type){
    this.type = type
    if(type == "image" || type == "background"){
        this.image = new Image()
        this.image.src = color
    }
    this.width = width
    this.height = height
    this.color =color
    this.x = x
    this.y = y

    this.update = function(){
        konteks = arena.context
        
        if(type == "text"){
            konteks.font = this.width+ " " + this.height
            konteks.fillStyle = color
            konteks.fillText(this.text, this.x, this.y)
        }else if(type == "image" || type == "background"){
            konteks.drawImage(this.image, this.x, this.y, this.width, this.height)

            if(type == "background"){
                konteks.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
            }

        }else{
            konteks.fillStyle = color
            konteks.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    this.newPosition = function(){
        this.x += this.speedX
        this.y += this.speedY

        if(this.type == "background"){
            if(this.x == -(this.width)){
                this.x = 0
            }
        }
    }
    
}

function startGame(){
    arena.start()
    player = new komponen(30, 30, "assets/img/birdfall.png", 50, arena.canvas.height / 2 - 30)
    background = new komponen(arena.canvas.width, arena.canvas.height, "assets/img/background.jpg", 0, 0, "background")
}

function updateGame(){
    arena.clear()
    background.speedX = -3
    background.update()
    player.update()
}

