window.onload = function a()
{
    //setup
	var canvas = new fabric.Canvas('c', { selection: false});
    canvas.backgroundColor="Purple";
    
    var json_data = JSON.stringify(canvas.toDatalessJSON()); //initializing to be used later
    

//drawing the lines of the grid 
    var grid = 50; 
    for( var i=0; i< (1000/grid);i++){
    var line= new fabric.Line([i*grid,0, i*grid, 500], {stroke:'#a3c0f5', selectable: false, originX: 'center',
      originY: 'center'});
      canvas.add(line);
      line.toObject = function() {
            return { };
        };
    var line2= new fabric.Line([0, i*grid, 1000, i*grid], {stroke:'#a3c0f5', selectable: false, originX: 'center',
      originY: 'center'});
      canvas.add(line2);
      line2.toObject = function() {
            return { };
        };
}


//gray rectangle for buttons to go in
var menubox = new fabric.Rect({
        left: 0,
        top: 0,
        fill:  "#eee",
        width: window.innerWidth,
        height: 200,    
        lockRotation: true,
        selectable: false,
    });
canvas.add(menubox);
menubox.toObject = function() {
  return { };
};

//urls for all the buttons
var groundsrc = 'https://www.mariowiki.com/images/thumb/5/5d/GoldbrickblockNSMB2.png/400px-GoldbrickblockNSMB2.png';
var mariosrc = "http://icons.iconarchive.com/icons/ph03nyx/super-mario/128/Retro-Mario-icon.png"
var coinsrc= "https://steemitimages.com/DQmYxhs85sAdtgfSjLaLx6e4ajKZYWUf1CZFsQ53qcarpyi/Bitcoin.png";
var enemysrc= "https://orig00.deviantart.net/83a1/f/2011/230/2/8/wildebeest_transparent_sprite_by_milfeyu-d472yim.png";
var npcsrc = "https://ubisafe.org/images/luigi-transparent-sprites.png";

// function make a button, visually: calls draggable() to make it actually work. 
function button(url, pos,pic, elementname){
 fabric.Image.fromURL(url, function(img) {
       var btn =img.set({ top: 25,
        left: pos,
        width: 50,
        height: 50,
        hasControls: false,
        hasBorders: false,
        originX: 'left', 
        originY: 'top',
        hasRotatingPoint: false,
    });
    canvas.add(img);
    draggable(btn,pic,pos,elementname,url);
    btn.toObject = function() {
        return {}; //dont want buttons to show up in JSON sent to makelevel
    };
});
}

button(groundsrc,0,ground, "Environment");
button(mariosrc,50,mario, "Player");
button(coinsrc,100, coin, "Item");
button(enemysrc,150,enemy, "Enemy");
button(npcsrc,200,npc, "NPC");

//ignore these comments for now but dont delete
//console.log(JSON.stringify(canvas));
/*
var json_data = JSON.stringify(canvas.toDatalessJSON()); 
//console.log(json_data);
canvas.loadFromJSON(JSON.parse(json_data), function(obj) {
  canvas.renderAll();
  console.log(' this is a callback. invoked when canvas is loaded!xxx ');
});*/


//function that make the buttons actually...buttons.
function draggable(object, pic, pos, name, url) {
        object.on('mousedown', function() {
            var temp = new fabric.Image(pic,{
                left: pos,
                top: 25,
                hasControls: false,
                hasBorders: false,
                height: 50,
                width: 50,
                originX: 'left',
                originY: 'top'
            });
            canvas.add(temp);
            draggable(temp, pic,pos,name,url);
            //the following determines the json attributes of each thing when added to grid
            //its generic right now, but should be different for the element types
            // for ecxample, NPC needs "message"
            temp.toObject = function() {
            return {type: "Element", 
            name: name,
            top:temp.top,
            left: temp.left,
            url: url,
            scale: 1
            };
};
        if (name == "NPC"){
        var msg = prompt("Please enter a message for the npc:", "You are under attack!");
            //actually save the input here
            
        }
        if (name == "Item"){
        var effect = prompt("Please enter an effect for this item:", "Heal");
            //actually save the input here
            //ask molly about effects
        }
        /*
        if (name == "Environment"){
            var bool = prompt("Is this block solid? enter yes or no:", "yes");
        }*/
        });
        
        object.on('mouseup', function() {
            // Remove an event handler
            this.off('mousedown');
            if(this.top <100) {
               canvas.remove(this);
            }
        });
    }


 //snap to grid
canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});


//take everything on the current canvas and print to console and alert in custom json format
document.getElementById("save").onclick = function(){
     json_data = JSON.stringify(canvas.toJSON());
               console.log(json_data);
               alert(json_data);

 }

//how to make an object called hello move around with keys: not using for now
/*
document.body.onkeyup = function(e){
   // canvas_.clear();
    canvas_.add(hello);
    canvas_.renderAll();
    }

document.body.onkeydown = function(e){
    if (e.key == 'g') {
       hello.set({left: hello.left + 5,});
       canvas_.add(hello);
       canvas_.renderAll();
    }
    
    if (e.key == 'f') {
       hello.set({left: hello.left - 5,});
       canvas_.add(hello);
       canvas_.renderAll();
    }
}
*/
}





