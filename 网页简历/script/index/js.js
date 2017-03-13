/**
 * Created by Administrator on 2016/8/18.
 */
$(function(){

    var mySkillTop=document.getElementById("mySkill").offsetTop;
    var introduce=document.getElementById("introduce").offsetTop;
    var works=document.getElementById("works").offsetTop;
    var contact=document.getElementById("contact").offsetTop;
    $(window).scroll(function(){
        if((document.body.scrollTop||document.documentElement.scrollTop)>=mySkillTop-100)
        {
            $("#topInfo").css("top","0");
        }
        else{
            $("#topInfo").css("top","-55px");
        }
        if((document.body.scrollTop||document.documentElement.scrollTop)>=mySkillTop-100&&(document.body.scrollTop||document.documentElement.scrollTop)<= works-100)
        {
            $("#infoUl").find(".active").removeClass("active").parent().children("#infoUl li:nth-child(3)").addClass("active");
        }
        else if((document.body.scrollTop||document.documentElement.scrollTop)>=works-100&&(document.body.scrollTop||document.documentElement.scrollTop)<=contact-250)
        {
            $("#infoUl").find(".active").removeClass("active").parent().children("#infoUl li:nth-child(2)").addClass("active");
        }
        else{
            $("#infoUl").find(".active").removeClass("active").parent().children("#infoUl li:nth-child(1)").addClass("active");
        }
    });
    $("#tel").click(function(){
        $("body").animate({"scrollTop":"2200px"},1000);
    });
    $("#myWork").click(function(){
        $("body").animate({"scrollTop":"1200px"},1000);
    });
    $("#skill").click(function(){
        $("body").animate({"scrollTop":"450px"},1000);
    });
    $("#aboutMe").click(function(){
        $("body").animate({"scrollTop":"0"},1000);
    });
});