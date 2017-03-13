/**
 * Created by Administrator on 2016/8/23.
 */
window.onload=function(){
    var imgBox=document.getElementById("imgBox");
    var buttons=document.getElementById("bt1").getElementsByTagName("li");
    var pre=document.getElementById("pre");
    var next=document.getElementById("next");
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
    var bt=document.getElementById("dl");
    pre.onclick=function()
    {
        if(index==0)
        {
            index=5;
        }
        else
        {
            index-=1;
        }
        if(!flag) {
            imgBoxMove(600);
            addColor();
        }

    }
    next.onclick=function()
    {

        if(index==5)
        {
            index=0;
        }
        else
        {
            index+=1;
        }
        if(!flag)
        {
            addColor();
            imgBoxMove(-600);
        }

    }
    imgBox.onmouseover=function(){
        clearInterval(timer);
    }
    imgBox.onmouseout=function(){
        autoMove();
    }
    function autoMove()
    {
        timer=setInterval("next.onclick()",2000);
    }
    autoMove();
    function clickBt()
    {
        for(var i=0;i<buttons.length;i++)
        {
            buttons[i].onclick=function(){
                myIndex=parseInt(this.getAttribute("index"));
                moveDistance=(myIndex-index)*-600;
                index=myIndex;
                if(!flag) {
                    imgBoxMove(moveDistance);
                    addColor();
                }
                //console.log(myIndex)
                console.log(index)
            }
        }
    }
    clickBt();
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
        time=2000;
        inteval=100;
        speed=offset/(time/inteval);
        if ( (speed > 0 && parseInt(imgBox.style.left) < newLeft ) || (speed < 0 && parseInt(imgBox.style.left) >newLeft))
        {
            imgBox.style.left = parseInt(imgBox.style.left) + speed + 'px';
            setTimeout(transition, inteval);
        }

        else
        {
            flag=false;
            imgBox.style.left= newLeft+"px";
            if(newLeft<-3600)
            {
                imgBox.style.left=-600+"px";
            }
            if(newLeft>-600)
            {
                imgBox.style.left=-3600+"px";
            }
        }
    }
    function imgBoxMove(offset)
    {
        flag=true;
        newLeft=parseInt(imgBox.style.left)+offset;
        transition(offset);

    }
    bt.onclick=function(){
        show();
        return false;
    }
    function show()
    {
         mask=document.createElement("div");
        mask.className="mask";
        mask.style.width=width+"px";
        mask.style.height=height+"px";
        document.body.appendChild(mask);
        loginBox=document.createElement("div");
        loginBox.className="login";
        loginBox.innerHTML= "<div class='loginContent'><div id='loginTop'><span>µÇÂ¼</span></div><div id='loginBottom'><form><input type='text' placeholder='ÇëÊäÈëÕËºÅ'><br/><input type='password' placeholder='ÇëÊäÈëÃÜÂë'><br/><input type='checkbox'>×Ô¶¯µÇÂ¼<a href='#?'>Íü¼ÇÃÜÂë£¿</a><br/> <input type='button' value='Á¢¼´×¢²á'><input type='submit' value='µÇÂ¼'> </form><div id='loginBottomRight'><span>É¨¶þÎ¬Âë¿ìËÙµÇÂ¼</span><img src='images/¶þÎ¬Âë2.jpg'/> </div>  </div> <div id='close'></div></div>";
        document.body.appendChild(loginBox);
        var  close=document.getElementById("close");
        close.onclick=function(){
            document.body.removeChild(mask);
            document.body.removeChild(loginBox);
        }
    }




}