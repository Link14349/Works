/**
 * Created by Administrator on 2016/8/23.
 */
window.onload=function(){
    var imgBox=document.getElementById("imgBox");
    var buttons=document.getElementById("bt1").getElementsByTagName("li");
    var pre=document.getElementById("pre");
    var next=document.getElementById("next");
    var container=document.getElementById("container");
    var index=0;
    var myIndex;
    var moveDistance;
    var newLeft;
    var time;
    var inteval;
    var speed;
    var flag=false;
    var timer;
    var height=document.documentElement.scrollHeight;
    var width=document.documentElement.scrollWidth;
    var mask;
    var loginBox;
    pre.onclick=function()
    {
        if(index==0)
        {
            index=4;
        }
        else
        {
            index-=1;
        }
        addColor()
        if(!flag) {
            imgBoxMove(600);
            addColor();
        }

    }
    next.onclick=function()
    {

        if(index==4)
        {
            index=0;

        }
        else
        {
            index+=1;

        }
        addColor()
        if(!flag)
        {
            addColor();
            imgBoxMove(-600);
        }

    }
    container.onmouseover=function(){
        clearInterval(timer);
    }
    container.onmouseout=function(){
        autoMove();
    }
    function autoMove()
    {

            timer = setInterval("next.onclick()", 3000);

    }
    autoMove();
    (function clickBt()
    {
        for(var i=0;i<buttons.length;i++)
        {
            buttons[i].onclick=function(){
                if(this.className==="select")
                {
                    return;
                }
                myIndex=parseInt(this.getAttribute("index"));
                moveDistance=(myIndex-index)*600;
                index=myIndex;
                if(!flag) {
                    imgBoxMove(moveDistance);
                    addColor();
                }
            }
        }
    })();
    function addColor()
    {
        for(var i=0;i<buttons.length;i++)
        {
            if(buttons[i].className=="select")
            {
                buttons[i].className="";
                break;
            }
        }
        buttons[index].className="select";
    }
    function transition(offset)
    {
        time=3000;
        inteval=100;
        speed=offset/(time/inteval);
        flag=true;
        if ( (speed > 0 && parseInt(imgBox.style.left) < newLeft ) || (speed < 0 && parseInt(imgBox.style.left) >newLeft))
        {
            imgBox.style.left = parseInt(imgBox.style.left) + speed + 'px';
            setTimeout(transition, inteval);
        }

        else
        {
            flag=false;
            imgBox.style.left= newLeft+"px";
            if(newLeft<-3000)
            {
                imgBox.style.left=-600+"px";
            }
            if(newLeft>-600)
            {
                imgBox.style.left=-3000+"px";
            }
        }
    }
    function imgBoxMove(offset)
    {
        flag=true;
        newLeft=parseInt(imgBox.style.left)+offset;
        transition(offset);

    }

}