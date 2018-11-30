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
    var dataobj= JSON.parse(data);

    i=0;
    var elementarray= [];
    var backgroundurl= "https://i.pinimg.com/originals/fe/78/bb/fe78bbb25f35d56b502327fb6d43b309.png"; //dataobj.backgroundImage";
        for (i=0; i<dataobj.objects.length; i++){
            var temp= dataobj.objects[i];
            if (temp.type =="Element"){
                var pos = new Vector(temp.left, temp.top);
                var sz = new Vector(50,50);
                var url= temp.url;
                var hitbox = new Vector(50,50);
                var element;
                if (temp.name == "Environment"){
                    var eff = new Effect(dataobj.objects[i].effect, 1); // new Effect("damage", 1);
                    var status = dataobj.objects[i].status;
                    console.log("status", status);
                    element = new Environment(status,pos,url,sz,hitbox,eff);
                }
                else if (temp.name == "Item"){
                    var col = false;
                    var eff = new Effect("damage", 1);
                    var hov =true;
                    element = new Item(pos, url, sz, hitbox, col, eff, pos, hov);
                    console.log('from parsing');
                }
                else if (temp.name == "Player"){
                    var max = dataobj.objects[i].maxhealth;
                    var stat = true;
                    var itm= null;
                    var inv= [];
                    var hitbox = new Vector(50,50);
                    if(url === defaultUrl)
                        hitbox = new Vector(19,50);
                    var spd = new Vector(0,0);
                    var mvspd =  dataobj.objects[i].speed;
                    var grav =  dataobj.objects[i].gravity;
                    var dir = "right";
                    element = new Player(pos, max, max, stat, itm, inv, hitbox, url, sz, spd, mvspd, grav, dir);
                }
                else if (temp.name == "NPC"){
                    var max = 10;
                    var hea = 7;
                    var stat = true; 
                    var msg =  dataobj.objects[i].msg;
                    var spd = new Vector(0,0);
                    var mvspd = 30;
                    var grav = 50;
                    element = new NPC(pos, max, hea, stat, msg, hitbox, url, sz, spd, mvspd, grav);
                }
                else if (temp.name == "Enemy"){
                    var max = 10;
                    var hea= 10;
                    var stat = true;
                    var dmg =  dataobj.objects[i].damage;
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
                "backgroundUrl": backgroundurl };
    }
module.exports = JSONtoElements;
