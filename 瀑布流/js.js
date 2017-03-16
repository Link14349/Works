/**
 * Created by Administrator on 2016/8/21.
 */
window.onload=function(){
    var json={"data":[{"src":"images/waterfall/0b6df10f7656999c8b8907cb1878ad63605405069042-ex5Mwt_fw658.jpg"},
        {"src":"images/waterfall/0d8b7229a8685278524580b976ef2c0d2ec252b6c6b94-ZBYfG0_fw658.jpg"},
        {"src":"images/waterfall/3f3f8982b9014a90d7c9cdd1ab773912b21bee8b.jpg"},
        {"src":"images/waterfall/4bcf07f711f80c7878b3c8bc49b0d918478795d635af8-5y5CaL_fw658.jpg"},
        {"src":"images/waterfall/5bd54c31fea724edc16d079b6f5c774113ecbd3f1c24c-AoDbb4_fw658.jpg"},
        {"src":"images/waterfall/9e67fee843068973d52cef46c923b427b9fe89c72ccfd-yl3w5q_fw658.jpg"},
        {"src":"images/waterfall/21e0317728b66a1afb7e79aa84c44cee8f9ac2cf20840-LCINGc_fw658.jpg"},
        {"src":"images/waterfall/55bad28131ac77810.jpg"},
        {"src":"images/waterfall/85b1e28a8352cc6441553b9037e93b9764297c636a87-41u8JW_fw658.jpg"},
        {"src":"images/waterfall/139-15030ZS914-50.jpg"},
        {"src":"images/waterfall/712c83ac9759e377c8703130ec00d26a7b8daea4dd2b2-3cacTv_fw658.jpg"},
        {"src":"images/waterfall/1169aa25836f0dffb6fb1c5c9268cff1a55566e567283-VlhF4X_fw658.jpg"},
        {"src":"images/waterfall/2891bb85249bdfa5f1ac8a57e67d83961f2592b120fb6-jRHVRw_fw658.jpg"},
        {"src":"images/waterfall/7378dd6b9c867b9c38ed8475d65e9d29ea60edc6160f54-mg3zKM_fw658.jpg"},
        {"src":"images/waterfall/7895cddb3d68656ffc8f92ae0742919960ed43acf58b-zcpKz6_fw658.jpg"},
        {"src":"images/waterfall/8794488b26f9ed41b7c28b5b6665f296955222454b04-GHH1mZ_fw658.jpg"},
        {"src":"images/waterfall/1414416260.jpg"},
        {"src":"images/waterfall/20120316005731_WUAhL.jpeg"},
        {"src":"images/waterfall/3365596296629977985.jpg"},
        {"src":"images/waterfall/a8db485633d34b940d0b4c971e191569e7fee54a35886-NZ9VSn_fw658.jpg"},
        {"src":"images/waterfall/a879d41f7c71dc3cdbecef5bbd0266185123814d10a51-KYHpIM_fw658.jpg"},
        {"src":"images/waterfall/a95352ccb89c4124fadadbc581c889a25675bb3c58706-xQDXR4_fw658.jpg"},
        {"src":"images/waterfall/ab4f9cf1f8b33d1f75e5622b0a78ea5e8f4228171dd0e-h0W5ab_fw658.jpg"},
        {"src":"images/waterfall/b8dd7990bde9d1df6b8af9b1ce96f2988ac9cc2e743be-W6jQeN_fw658.jpg"},
        {"src":"images/waterfall/b022bc4198ee530b3d2bc89886c44b583ffac91922fd9-LmS2WY_fw658.jpg"},
        {"src":"images/waterfall/b504d1e1dd0c2c74f9055cc14f8af5c3.jpg"},
        {"src":"images/waterfall/b364054ed7360c5a8aaea64092c3e201c0aca08f8564-Nr0wAk_fw658.jpg"},
        {"src":"images/waterfall/ced236396e3679fe7632ab62e6e4edf57b4170e21fa33-xmkJoJ_fw658.jpg"},
        {"src":"images/waterfall/d221ab41d32478bb66dd20274c7da6ea5b616825633c7-nKQ944_fw658.jpg"},
        {"src":"images/waterfall/e189d0f7a7222af3ade01169e266f513d6b996c731503-qdDTBu_fw658.jpg"},
        {"src":"images/waterfall/f2c44bb90137905dc3325917f038b45b554039fb22598-yz0xIY_fw658.jpg"},
        {"src":"images/waterfall/f899e325ed432b1e9b3750a5bbaf71b246fd5ea110d7b-MG5d7H_fw658.jpg"},
        {"src":"images/waterfall/fefaa7439d683ca1d4849cb2b8a1afb9c055852f372e9-U3iozD_fw658.jpg"},
        {"src":"images/waterfall/rBACE1Oa8qXCrix1AAD4B1O1Qi0526.jpg"},

    ]}
    window.onscroll=function(){
        if(flag())
        {
            var picBox=document.getElementById("picBox");
            for(var i=0;i<json.data.length;i++) {
                var box = document.createElement("div");
                box.className = "box";
                var borderBox = document.createElement("div");
                borderBox.className = "borderBox";
                box.appendChild(borderBox);
                var img = document.createElement("img");
                img.src =json.data[i].src;
                borderBox.appendChild(img);
                picBox.appendChild(box);
            }
            imagesLocation();
        }
    }
    function flag()
    {
        var boxArr=getBox("box");
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var lastImgTop=boxArr[boxArr.length-1].offsetTop;
        if(scrollTop>lastImgTop-180)
        {

            return true;
        }
    }
    function imagesLocation()
    {
        var boxArr=getBox("box");
        var picBox=document.getElementById("picBox");
        var height=new Array();
        var screenWidth=document.documentElement.clientWidth||document.body.clientWidth;
        var boxWidth=boxArr[0].offsetWidth;
        var cols=Math.floor(screenWidth/boxWidth);
        picBox.style.cssText="width:"+cols*boxWidth+"px;margin:0 auto;"
        for(var i=0;i<boxArr.length;i++)
        {
            if(i<cols)
            {
                height.push(boxArr[i].offsetHeight);
            }
            else
            {
                var minIndex=getMinHeightIndex(height);
                var minHeight=Math.min.apply(null,height);
                boxArr[i].style.position="absolute";
                boxArr[i].style.top=minHeight+"px";
                boxArr[i].style.left=boxArr[minIndex].offsetLeft+"px";
                height[minIndex]+=boxArr[i].offsetHeight;
            }
        }
    }
    imagesLocation();
    function getMinHeightIndex(height)
    {
        var minHeight=Math.min.apply(null,height);
        for(var i=0;i<height.length;i++)
        {
            if(height[i]===minHeight)
            {
                return i;
            }
        }
    }
    function getBox(box){
        var picBox=document.getElementById("picBox");
        var allChildren=picBox.getElementsByTagName("*");
        var boxArr=new Array();
        for(var i=0;i<allChildren.length;i++)
        {
            if(allChildren[i].className==="box")
            {
                boxArr.push(allChildren[i]);

            }
        }
        return boxArr;
    }

}