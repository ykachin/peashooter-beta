window.onload=function()
{
 
    //var imgs=["images/page_1/69.jpg","images/page_1/70.jpg","images/page_1/71.jpg","images/page_1/72.jpg"];
    index=0;
      var oIpt=document.getElementById("u482");
      var allColor1=document.getElementsByClassName("outside");
      var all_buttom1=document.getElementsByClassName("roll_content");
      oIpt.onclick=function()
      {
        for(var m=0;m< 4;m++){
            if(all_buttom1[m].getAttribute("src")=="static/resources/images/page_1/u478.svg")
            {
                all_buttom1[(m+1)%4].setAttribute("src","static/resources/images/page_1/u478.svg");
                all_buttom1[m].setAttribute("src","static/resources/images/page_1/u409.svg");
                break;
            }
        }
        for(var m=0;m<4;m++){
            allColor1[m].style.left=parseFloat(allColor1[m].style.left)-1000+"px";
            allColor1[m].style.transition=1+"s";
                    if(allColor1[m].style.left==-3000+"px"){
                        allColor1[m].style.left=1000+"px";
                        allColor1[m].style.transition=0+"s";
                    }
        }
      }
      setInterval(oIpt.onclick,3000);

      var oIpt2=document.getElementById("u407");
      var allColor=document.getElementsByClassName("roll_image");
      var all_buttom=document.getElementsByClassName("buttom_image");
      oIpt2.onclick=function()
      {
        for(var i=0;i< 4;i++){
            if(all_buttom[i].getAttribute("src")=="static/resources/images/page_1/u408.svg")
            {
                all_buttom[(i+1)%4].setAttribute("src","static/resources/images/page_1/u408.svg");
                all_buttom[i].setAttribute("src","static/resources/images/page_1/u409.svg");
                break;
            }
        }
        for(var i=0;i<allColor.length;i++){
            allColor[i].style.left=parseFloat(allColor[i].style.left)-1020+"px";
            allColor[i].style.transition=1+"s";
                    if(allColor[i].style.left==-3060+"px"){
                        allColor[i].style.left=1020+"px";
                        allColor[i].style.transition=0+"s";
                    }
        }
      }
      setInterval(oIpt2.onclick,3000);
  

      
     


     

}