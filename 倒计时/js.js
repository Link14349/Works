(function(){
        var canvas=document.getElementById("canvas");
        var pen=canvas.getContext("2d");
        if(pen)
        {
            var cWidth=document.body.clientWidth||document.documentElement.clientWidth;
            var cHeight=500;
            var radius=5;
            var marginTop=30;
            var marginLeft=30;
            var balls=[];
            var imgStyle;
            var colors=["red","pink","yellow","black","blue","green","gray","purple","#33b5e5","#aa66cc"];
            canvas.width=cWidth;
            canvas.height=cHeight;
            var endTime=new Date();
            endTime.setTime(endTime.getTime()+36000*1000);
            var leftSeconds=getLeftSeconds();
            var imgBack=new Image();
            imgBack.src="timg (2).jpg";
            imgBack.onload=function(){

                imgStyle=pen.createPattern(imgBack,"repeat");

            }
            setInterval(function(){
                update();
                render(pen);

            },20);
            function update(){
                var nextLeftSeconds=getLeftSeconds();
                var nextHour=parseInt(leftSeconds/3600);
                var nextMinute=parseInt((nextLeftSeconds-nextHour*3600)/60);
                var nextSecond=nextLeftSeconds%60;
                var curHour=parseInt(leftSeconds/3600);
                var curMinute=parseInt((leftSeconds-curHour*3600)/60);
                var curSecond=leftSeconds%60;//confused！

                if(curSecond!==nextSecond)
                {
                    if(parseInt(nextHour/10)!=parseInt(curHour/10)){
                        addBalls(marginLeft,marginTop,parseInt(curHour/10));
                    }
                    if(parseInt(nextHour%10)!=parseInt(curHour%10)){
                        addBalls(marginLeft+15*(radius+1),marginTop,parseInt(curHour%10));
                    }
                    if(parseInt(nextMinute/10)!=parseInt(curMinute/10)){
                        addBalls(marginLeft+39*(radius+1),marginTop,parseInt(curMinute/10));
                    }
                    if(parseInt(nextMinute%10)!=parseInt(curMinute%10)){
                        addBalls(marginLeft+54*(radius+1),marginTop,parseInt(curMinute%10));
                    }
                    if(parseInt(nextSecond/10)!=parseInt(curSecond/10)){
                        addBalls(marginLeft+78*(radius+1),marginTop,parseInt(curSecond/10));
                    }
                    if(parseInt(nextSecond%10)!=parseInt(curSecond%10)){
                        addBalls(marginLeft+93*(radius+1),marginTop,parseInt(curSecond%10));
                    }
                    leftSeconds= nextLeftSeconds;
                }
                updateBalls();
            }
            function updateBalls(){
                for(var i=0;i<balls.length;i++){
                    balls[i].x+=balls[i].vx;
                    balls[i].y+=balls[i].vy;
                    balls[i].vy+=balls[i].g;
                    if(balls[i].y>=cHeight-radius){
                        balls[i].vy=-balls[i].vy*0.6;
                        if(Math.abs(balls[i].vy)>3.7){
                            balls[i].y=cHeight-radius;
                        }
                        else{
                            balls[i].vy=0;
                            balls[i].vy=0;

                        }
                    }
                    if(balls[i].x-radius<0||balls[i].x+radius>cWidth){
                        balls.splice(i,1);
                    }

                }
            }
            function addBalls(x,y,num){
                for(var i=0;i<digit[num].length;i++){
                    for(var j=0;j<digit[num][i].length;j++)
                    {
                        if(digit[num][i][j]===1)
                        {
                            var ball={
                                x:x+j*2*(radius+1)+(radius+1),
                                y:y+i*2*(radius+1)+(radius+1),
                                g:1.5,
                                vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                                vy:-5,
                                color:colors[Math.floor(Math.random()*colors.length)]
                            }
                            balls.push(ball);
                        }


                    }
                }
            }
            function getLeftSeconds(){
                var startTime=new Date();
                var leftSeconds=parseInt((endTime.getTime()-startTime.getTime())/1000);
                return leftSeconds>0?leftSeconds:0;
            }
            function render(pen)
            {
                var hour=parseInt(leftSeconds/3600);
                var minute=parseInt((leftSeconds-hour*3600)/60);
                var second=leftSeconds%60;//confused！
                pen.clearRect(0,0,cWidth,cHeight);
                pen.fillStyle=imgStyle;
                pen.fillRect(0,0,cWidth,cHeight);
                renderDigit(pen,marginLeft,marginTop,parseInt(hour/10));
                renderDigit(pen,marginLeft+15*(radius+1),marginTop,parseInt(hour%10));
                renderDigit(pen,marginLeft+30*(radius+1),marginTop,10);
                renderDigit(pen,marginLeft+39*(radius+1),marginTop,parseInt(minute/10));
                renderDigit(pen,marginLeft+54*(radius+1),marginTop,parseInt(minute%10));
                renderDigit(pen,marginLeft+69*(radius+1),marginTop,10);
                renderDigit(pen,marginLeft+78*(radius+1),marginTop,parseInt(second/10));
                renderDigit(pen,marginLeft+93*(radius+1),marginTop,parseInt(second%10));
                for(var i=0;i<balls.length;i++){
                    pen.fillStyle=balls[i].color;
                    pen.beginPath();
                    pen.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI);
                    pen.closePath();
                    pen.fill();
                }


            }
            function renderDigit(pen,left,top,num){
                pen.fillStyle="rgb(0,102,153)";
                for(var i=0;i<digit[num].length;i++){
                    for(var j=0;j<digit[num][i].length;j++){
                        if(digit[num][i][j]===1)
                        {
                            pen.beginPath();
                            pen.arc(left+j*2*(radius+1)+(radius+1),top+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
                            pen.closePath();
                            pen.fill();

                        }

                    }
                }
            }
        }
        else
        {
            alert("您的浏览器不支持canvas!")
        }
})();

