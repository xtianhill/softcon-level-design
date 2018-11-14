const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js').vector;

function JSONtoElements(data){
    var dataobj= JSON.parse(data);
    i=0;
    var elementarray= [];
    var backgroundurl=dataobj.backgroundImage;
        for (i=0; i<dataobj.objects.length; i++){
            var temp= dataobj.objects[i];
            if (temp.type =="Element"){
                var pos = new Vector(temp.left, temp.top);
                var sz = new Vector(50,50);
                var url= temp.url;
                var hitbox = new Vector(50,50);
                var element;
                if (temp.name == "Environment"){
                    console.log(pos);
                    element = new Environment(1,pos,url,sz,hitbox);
                }
                else if (temp.name == "Item"){
                    var col=0;
                    var eff="heal";
                    element = new Item(pos, url, sz, hitbox, col, eff);
                }
                else if (temp.name == "Player"){
                    var max = 10;
                    var hea = 10;
                    var stat = 1;
                    var itm= 0;
                    var inv= 0;
                    var spd = 0;
                    element = new Player(pos, max, hea, stat, itm, inv, hitbox, url, sz, spd);
                }
                else if (temp.name == "NPC"){
                    var max = 10;
                    var hea = 10;
                    var stat= 1;
                    var msg = "hi there";
                    element = new NPC(pos, max, hea, stat, msg, hitbox, url, sz);
                }
                else if (temp.name == "Enemy"){
                    var max = 10;
                    var hea= 10;
                    var stat = 1;
                    var dmg= 1;
                    element = new Enemy(pos, max, hea, stat, dmg, hitbox, url, sz);
                }
                elementarray.push(element);
            }
        }
        return {"elements": elementarray,
                "backgroundUrl": backgroundurl };
    }
module.exports = JSONtoElements;
    
    