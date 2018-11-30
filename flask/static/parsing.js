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
    
    i=0;
    var elementarray= [];
    var backgroundurl= dataobj.background; //dataobj.backgroundImage";
        for (i=0; i<dataobj.objects.length; i++){
            var temp= dataobj.objects[i];
            if (temp.type =="Element"){
                var pos = new Vector(temp.left, temp.top);
                var sz = new Vector(50,50);
                var url= temp.url;
                var hitbox = new Vector(50,50);
                var element;
                if (temp.name == "Environment"){
                    console.log(temp);
                    var eff = new Effect(temp.effect, 1); // new Effect("damage", 1);
                    console.log("did effect work", eff);
                    var solid = temp.solid;
                    console.log("solid!", solid);
                    element = new Environment(solid,pos,url,sz,hitbox,eff);
                    console.log(element);
                }
                else if (temp.name == "Item"){
                    console.log("item", dataobj.objects[i]);
                    var col = false;
                    console.log("amount",temp.amount);
                    var eff = new Effect(temp.effect, temp.amount);
                    var hov =true;
                    var targets = dataobj.objects[i].targets;
                    element = new Item(pos, url, sz, hitbox, col, eff, pos, hov, targets);
                    console.log('from parsing');
                }
                else if (temp.name == "Player"){
                    console.log("player",dataobj.objects[i]);
                    var max = temp.maxhealth;
                    var stat = true;
                    var itm= null;
                    var inv= [];
                    var hitbox = new Vector(50,50);
                    if(url === defaultUrl)
                        hitbox = new Vector(19,50);
                    var spd = new Vector(0,0);
                    console.log("spd", spd);
                    console.log("speed", temp.speed);
                    console.log("gravity", temp.gravity);
                    var mvspd = temp.speed;
                    var grav =  temp.gravity;
                    var dir = "right";
                    element = new Player(pos, max, max, stat, itm, inv, hitbox, url, sz, spd, mvspd, grav, dir);
                }
                else if (temp.name == "NPC"){
                    var max = temp.maxhealth;
                    var hea = temp.maxhealth;
                    var stat = true; 
                    console.log("msg", temp.msg);
                    var msg =  temp.msg;
                    var spd = new Vector(0,0);
                    var mvspd = 30;
                    var grav = temp.gravity;
                    element = new NPC(pos, max, hea, stat, msg, hitbox, url, sz, spd, mvspd, grav);
                }
                else if (temp.name == "Enemy"){
                    var max = temp.maxhealth;
                    var hea= temp.maxhealth;
                    var stat = true;
                    var dmg =  temp.damage;
                    console.log("damage",temp.damage);
                    var spd = new Vector(0,0);
                    var mvspd = temp.speed;
                    var grav = temp.gravity;
                    var dir = "left";
                    var range = 35;
                    var startLoc = pos;
                    element = new Enemy(pos, max, hea, stat, dmg, hitbox, url, sz, spd, mvspd, grav, dir, range, startLoc);
                }
                elementarray.push(element);
            }
        }
        
        return {"elements": elementarray,
                "backgroundUrl": "https://i.pinimg.com/originals/fe/78/bb/fe78bbb25f35d56b502327fb6d43b309.png"
             }
    }
module.exports = JSONtoElements;
