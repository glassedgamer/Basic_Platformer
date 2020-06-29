// https://www.youtube.com/watch?v=8uIt9a2XBrw time stamp: 9:34
var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 180;
context.canvas.width = 320;

rectangle = {
    height:32,
    jumping:true,
    width:32,
    x:144,
    x_velocity:0,
    y:0,
    y_velocity:0
};

controller = {
    left:false;
    right:false;
    up:false;
    
    keyListener:function(event) {
        var key_state = (event.type == "keydown")?true:false;
        
        switch(event.keyCode) {
            case 37:
                controller.left = key_state;
            break;
            case 38:
                controller.up = key_state;
            break;
            case 39:
                controller.right = key_state;
            break;
        }
    }
};


loop = function () {
    if (contoller.up && rectangle.jumping == false) {
        rectangle.y_velocity -= 20;
        rectangle.jumping = 20;
    }
    if (controller.left) {
        rectangle.x_velocity -= 0.5;
    }
    if (controller.right) {
        rectangle.x_velocity += 0.5;
    }
    
    rectangle.y_velocity += 1.5; //gravity
    rectangle.x += rectangle.x_velocity;
    rectangle.y += rectangle.y_velocity;
    rectangle.x_velocity *= 0.9; //friction
    rectangle.y_velocity *= 0.9; //friction
    
    if (rectangle.y > 180 - 16 - 32) {
      rectangle.jumping = false;
      rectangle.y = 180 -16 - 32;
      rectangle.y_velcoity = 0;
    } 
    if (rectangle.x < -32) {
        rectangle.x = 320;
    } else if (rectangle.x > 320) {
        rectangle.x = -32;
    }
    
    context.fillStyle = "#202020";
    context.fillRect(0, 0, 320, 180);
    context.fillStyle = "#ff0000";
    context.beginPath();
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.length);
    context.fill();
    context.strokeStyle = "#202830";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, 164);
    context.lineTo(320, 164);
    context.stroke();
    
    //call update when browser is ready to draw again
    window.requestAnimationFrame(loop);
};
