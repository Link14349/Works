var gameObjs = [];

var role = function (image,width,height,x,y,angle,name,pos) {
    // console.log("new role...");
    var obj = {};
    obj.name = name;
    obj.width = width;
    obj.height = height;
    obj.image = image;
    obj.x = x;
    obj.y = y;
    obj.angle = angle;
    obj.copyNum = 0;
    obj.textColor = "#fff";
    obj.textSize = "20px";
    obj.textWeight = "bold";
    obj.textAlign = "center";

    obj.children = [];

    // console.log("name:" + obj.name);
    // console.log("html:" + $("#" + pos).html());

    $("#" + pos).html($("#" + pos).html() + "<div id=\"" + obj.name + "\"></div>");

    obj.update = function () {
        $("#" + this.name).css({
                "background-image": "url(" + this.image + ")",
                "position": "absolute",
                "top": this.y + "px",
                "left": this.x + "px",
                "width": this.width,
                "height": this.height,
                "transform": "rotate(" + this.angle + "deg)",
                "color": this.textColor,
                "font-size": this.textSize,
                "font-weight": this.textWeight,
                "text-align": this.textAlign
            }
        );
    };
    obj.change = function (newImage,newWidth,newHeight,angle,speed){
        this.image = newImage;
        this.width = newWidth;
        this.height = newHeight;

        $("#" + this.name).css({
            "transform": "rotate(" + (0 - this.angle) + "deg)"
        });

        this.angle = angle;
        this.define("speed",speed);
        this.update();
    };
    obj.setText = function (text,color,size,weight,anlign){
        this.textColor = color;
        this.textSize = size;
        this.textWeight = weight;
        this.textAlign = anlign;
        $("#" + this.name).html(text);
        this.update();
    };
    obj.define = function (att,val){
        this[att] = val;
    };
    obj.get = function (attName){
        return this[attName];
    };
    obj.copy = function (){
        var newObj = this;
        newObj.name = this.name + this.copyNum;
        $("#" + pos).html($("#" + pos).html() + "<div id=\"" + newObj.name + "\"></div>");
        newObj.update();
        this.children.push(newObj);
        gameObjs.push(newObj);
        this.copyNum++;
        return newObj;
    };
    obj.delete = function (){
    	console.log("delete");
        this.width = null;
        this.height = null;
        this.image = null;
        this.x = null;
        this.y = null;
        this.angle = null;
        this.copyNum = null;
        this.textColor = null;
        this.textSize = null;
        this.textWeight = null;
        this.textAlign = null;

        $("#" + this.name).remove();
        this.name = null;
    };
    obj.addMove = function () {
        this.define("speed",10);
    };
    obj.setMove = function (speed) {
        this.define("speed",speed);
    };
    obj.updatePos = function () {
        $("#" + this.name).css({
            "z-index": this.get("pos-z"),
        });
    };
    obj.addPosZ = function () {
        this.define("pos-z",gameObjs.length);
    };
    obj.setPosZ = function (z) {
        this.define("pos-z",z);
        this.updatePos();
    };
    obj.run = function (angle) {
        var x = $("#" + this.name).offset().left;
        var y = $("#" + this.name).offset().top;
        x += Math.cos(angle / 180 * Math.PI) * this.get("speed");
        y += Math.sin(angle / 180 * Math.PI) * this.get("speed");
        this.move(x,y);
        this.update();
    };
    obj.move = function (x,y){
        this.x = x;
        this.y = y;
        this.update();
    };
    obj.AIrun = function (angle,rm){
    	setInterval(function () {
    		obj.run(angle);
    		if (obj.x <= 0){
    			if (rm){
    				obj.delete();
    				return;
    			}
    		}
    	},100);
    };

    gameObjs.push(obj);

    obj.update();
    return obj;
};