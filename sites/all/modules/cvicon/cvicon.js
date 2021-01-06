$(document).ready(function(){
	prepareCvicon();
});

function prepareCvicon(){
    $("#cvicon-main-spinner").hide();
    $(".cvicon-template-pict-img").mouseover(mouseoverTemplatePict);
    $(".cvicon-template-pict-img").mouseout(mouseoutTemplatePict);
    $(".cvicon-template-pict-img").click(clickTemplatePict);
    $(".cvicon-component-tab-button").click(clickComponentTabButton);
    $(".cvicon-custom-icon-component").click(clickComponent);
}

function clickComponent(){
    var src = $(this).attr("src");
    var component = $(this).attr("component");
    $(".cvicon-component[component='"+component+"']").attr("src",src);
}

function clickComponentTabButton(){
    var component = $(this).attr("component");
    $(".cvicon-custom-icon-component-div[component!='"+component+"']").hide("slow");
    $(".cvicon-custom-icon-component-div[component='"+component+"']").show("slow");
}

function clickTemplatePict(){
    var dtId = $(this).attr("dt_id");
    var url = "?q=cvicon/ajax/icon_compose";
    var param = "dt_id="+dtId;
    $("#cvicon-root").hide("slow");
    $("#cvicon-main-spinner").show();
    cviconAjaxPost(url,param,"cvicon-root","prepareCvicon",null);
}  

function mouseoverTemplatePict(){
    var baseSrc = $(this).attr("src");
    var activeSrc = baseSrc.replace("_base.","_active.");
    $(this).attr("src",activeSrc);
}

function mouseoutTemplatePict(){
    var activeSrc = $(this).attr("src");
    var baseSrc = activeSrc.replace("_active.","_base.");
    $(this).attr("src",baseSrc);
}

function cviconAjaxPost(url,params,target,finisher,extra){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200){
            var response = JSON.parse(xhr.responseText);
            if(target!=null){
                $("#"+target).html(response);
                $("#"+target).show("slow");
            }
            if(finisher!=null){
                window[finisher](response,extra);   
            }
        }
    };
    xhr.open("POST",url,true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-length", params.length);
    xhr.setRequestHeader("Connection", "close");
    xhr.send(params);
}