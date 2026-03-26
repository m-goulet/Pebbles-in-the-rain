var canvas = document.getElementById("canvas-area");
var ctx = canvas.getContext("2d");

const map = document.getElementById("map");

const player = { x: 0, y: 0, r: 12, speed_x: 3, speed_y:3, max_speed: 30, accel: 1, color: '#1a1a1a' };
const keys = {};

map.addEventListener("load", (e)=>{ctx.drawImage(map, 10, 10);});

document.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    
    //below only actually does something for space character
    if (['w','a','s','d', ' '].includes(e.key.toLowerCase())){
        e.preventDefault();
    } 
});

document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

//takes in absolute position on map 
//(origin is character starting position)
//and returns position on canvas for a given frame
function coordinator(abs_pos, character_pos, axis) {
    //input: abs_pos is the value along x XOR y axis
    //character_position: just pass in the player object
    //axis: 0 for x axis, 1 for y axis
    if (axis==0){
        return (abs_pos - character_pos.x + 320)
    }
    if (axis==1){
        return (-abs_pos + character_pos.y + 200)
    }
    else{
        console.log("Error: invalid axis (coordinator)?? how the fuck")
        return
    }
}

//inverse function of coordinator()
//takes in position on canvas for a given frame
//and returns absolute position on the map
function uncloordinator(rel_pos, character_pos, axis){
    //input: rel_pos is position on canvas
    //character_pos: absolute position of character; just pass in the character object
    //axis: 0 for x axis, 1 for y axis
    if (axis==0){
        return (-rel_pos + character_pos.x - 320)
    }
    if (axis==1){
        return (-rel_pos + character_pos.y + 200)
    }
    else{
        console.log("Error: invalid axis (uncloordinator)?? how the fuck")
        return
    }    
}

function update() {
    if (keys['w']) player.y = player.y + player.speed_y;
    if (keys['s']) player.y = player.y - player.speed_y;
    if (keys['a']) player.x = player.x - player.speed_x;
    if (keys['d']) player.x = player.x + player.speed_x;
    if (keys[' ']) {
        player.color = '#FF0000'
        //check if in collision box and click link
        if ((player.x>-320)&&(player.x<-220)&&(player.y>50)&&(player.y<150)){
            window.location.href="https://www.google.com";
        }
    }
    else{
        player.color = '#1a1a1a'
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    //map
    ctx.drawImage(map, coordinator(-400, player, 0), coordinator(700, player, 1));

    //testing zone
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "green";
    ctx.fillStyle = "blue";
    ctx.fillRect(coordinator(-320, player, 0),coordinator(150, player, 1), 100, 100);


    
    //Always draw last to have it on the very top
    //player
    ctx.beginPath();
    ctx.arc(320, 200, player.r, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();