var player;
var background;
var lompat = true;
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
        this.image.src = color // memberikan gambar kepada objek
    }
    this.width = width
    this.height = height
    this.color =color
    this.x = x
    this.y = y
    this.speedX = 0
    this.speedY = 0

    // menambahkan gravitasi
    this.gravity = 0.5
    this.speedGravity = 0

    this.update = function(){
        konteks = arena.context
        
        if(this.type == "text"){

        }

        if(type == "image" || type == "background"){

            // mencetak gambar
            konteks.drawImage(this.image, this.x, this.y,this.width, this.height)

        }else{

            // mencetak tanpa image
            konteks.fillStyle = color
            konteks.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    // mengubah posisi komponen
    this.newPosition = function(){
        this.speedGravity += this.gravity
        this.x += this.speedX
        this.y += this.speedY + this.speedGravity

        if(this.y >= arena.canvas.height - this.height){
            this.y = arena.canvas.height - this.height
        }

        if(this.y <= 0){
            this.speedY = 0
            lompat = false
        }else if(this.y >= this.height + 10){
            this.speedY = 0
            lompat = true
        }


    }
}

function startGame(){
    arena.start()

    // membuat player
    player = new komponen(50, 50, "assets/img/birdfall.png", 50, arena.canvas.height / 2 - 30, "image")

    // menambahkan background
    background = new komponen(window.innerWidth, window.innerHeight, "assets/img/background.jpg", 0, 0, "background")

}

function updateGame(){
    arena.clear()

    player.speedX = 0 
    player.speedY = 0

    if(arena.keys && arena.keys[32]){
        if(lompat){
            player.speedY = -10
            player.speedGravity = 0
        }
    }

    background.update() 
    player.newPosition()
    player.update()
}