/*
|------------------------------------------------------------------------------
| Parser
|------------------------------------------------------------------------------
|
| This file contains the Parser, the JSONtoElements function, which
| creates a new element based on data from a given JSON.
|
|------------------------------------------------------------------------------
*/

const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Effect = require('./effect.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js');

var defaultUrl = "https://66.media.tumblr.com/f115b5010bccc9364bfcd0ee79af7132/tumblr_pi5tmjHk2r1u9vozfo1_400.png";
function JSONtoElements(data){
    if(data == '{}'){
        return {"elements": [],
                "backgroundUrl": '' }; 
    }
    console.log("data in paring", data);
    var dataobj= JSON.parse(data);
    console.log(dataobj);
   dataobj.canvas;
    
    i=0;
    var elementarray= [];
    var backgroundurl= dataobj.background; //dataobj.backgroundImage";
        for (i=0; i<dataobj.canvas.length; i++){
            var temp= dataobj.canvas[i];
            if (temp.type =="Element"){
                var pos = new Vector(temp.left, temp.top);
                var sz = new Vector(50,50);
                var url= temp.url;
                var hitbox = new Vector(50,50);
                var element;
                if (temp.name == "Environment"){
                    
                    var eff = new Effect(dataobj.canvas[i].effect, 1); // new Effect("damage", 1);
                    var solid = dataobj.canvas[i].solid;
                    element = new Environment(solid,pos,url,sz,hitbox,eff);
                    console.log(element);
                }
                else if (temp.name == "Item"){
                    console.log("item", dataobj.canvas[i]);
                    var col = false;
                    var eff = new Effect("damage", 1);
                    var hov =true;
                    var targets = dataobj.canvas[i].targets;
                    element = new Item(pos, url, sz, hitbox, col, eff, pos, hov, targets);
                    console.log('from parsing');
                }
                else if (temp.name == "Player"){
                    console.log("player",dataobj.canvas[i]);
                    var max = 10;//dataobj.canvas[i].maxhealth;
                    var stat = true;
                    var itm= null;
                    var inv= [];
                    var hitbox = new Vector(50,50);
                    if(url === defaultUrl)
                        hitbox = new Vector(19,50);
                    var spd = new Vector(0,0);
                    var mvspd = 30;//dataobj.canvas[i].speed;
                    var grav =  50;//dataobj.canvas[i].gravity;
                    var dir = "right";
                    element = new Player(pos, max, max, stat, itm, inv, hitbox, url, sz, spd, mvspd, grav, dir);
                }
                else if (temp.name == "NPC"){
                    var max = 10;
                    var hea = 7;
                    var stat = true; 
                    var msg =  dataobj.canvas[i].msg;
                    var spd = new Vector(0,0);
                    var mvspd = 30;
                    var grav = 50;
                    element = new NPC(pos, max, hea, stat, msg, hitbox, url, sz, spd, mvspd, grav);
                }
                else if (temp.name == "Enemy"){
                    var max = 10;
                    var hea= 10;
                    var stat = true;
                    var dmg =  1;//dataobj.canvas[i].damage;
                    var spd = new Vector(0,0);
                    var mvspd = 15;
                    var grav = 60;
                    var dir = "left";
                    var range = 35;
                    var startLoc = pos;
                    element = new Enemy(pos, max, hea, stat, dmg, hitbox, url, sz, spd, mvspd, grav, dir, range, startLoc);
                }
                elementarray.push(element);
            }
        }
        
        return {"elements": elementarray,
                "backgroundUrl": backgroundurl,
                "winconds": winconds };
    }
module.exports = JSONtoElements;
