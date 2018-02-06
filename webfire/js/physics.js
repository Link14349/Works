const AIR_RESI = 0.8;
const GRAV = 0.7;

var physicsId;//clearInterval

function collision(obj1,obj2) {
    if (
        ((obj1.x + obj1.width) >= obj2.x) &&
        (obj1.x <= (obj2.x + obj2.width)) &&
        ((obj1.y + obj1.height) >= obj2.y) &&
        (obj1.y <= (obj2.y + obj2.height))
    )
    {
        return true;
    } else {
        return false;
    }
}

function collisionObj(obj1) {
    var collObj = [];
    for (var i = 0 ; i < gameObjs.length ; i++){
        if (gameObjs[i] !== obj1){
            if (collision(obj1,gameObjs[i])){
                collObj.push(gameObjs[i].name);
            }
        }
    }
    return collObj;
}

function rebound(obj1,obj2) {
    if (collision(obj1,obj2)){
        obj1.angle = 180 - obj1.angle;
        obj2.angle = 180 - obj2.angle;

        var tmp = obj1.speed;
        obj1.speed += obj2.speed;
        obj2.speed += tmp;
    }
}
function reboundUpdate(obj1) {
    if (!obj1.get("force")){
        return null;
    }
    var rebObj = [];
    for (var i = 0 ; i < gameObjs.length ; i++){
        if (gameObjs[i] !== obj1){
            rebound(obj1,gameObjs[i])
        }
    }
    return rebObj;
}

function addPhysics(obj){
    obj.define("air",true);
    obj.define("grav",true);
    obj.define("force",true);
}

function airUpdate(obj) {
    obj.speed *= AIR_RESI;
    if (obj.speed < 0.01){
        obj.speed = 0;
    }
}
function gravUpdate(obj) {
    obj.angle += (180 - obj.angle) * GRAV * 2;
    if ((obj.angle % 360) > 0 && (obj.angle % 360) < 180){
        obj.speed += GRAV;
    } else {
        obj.speed -= GRAV;
    }
}
function physics(obj){
    if (obj.get("air")){
        airUpdate(obj);
    }
    if (obj.get("grav")){
        gravUpdate(obj);
    }
    if (obj.get("force")){
        reboundUpdate(obj);
    }
}
function physicsUpdate(acc) {
    physicsId = setInterval(function (){
    	for (var i = 0 ; i < gameObjs.length ; i++){
            physics(gameObjs[i]);
		}
    },acc);
}


