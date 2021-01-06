// Last modified by ASC on 20121101

$(document).ready(function(){
	$(".thumbpick-launch").click(tpClickLaunch);
	prepareIcon();
});

function prepareIcon(){
	$(".thumbpick-icon-img").click(tpClickIconImg);
}

function tpClickIconImg(){
    var mode = $(this).attr("mode");
    if(mode=="icon"){
	   var src = $(this).attr("src");
	   var targetId = $(this).parents(".thumbpick-browser-root-pane").attr("tp_target");
	   $("#"+targetId).val(src);
       var previewId = $(this).parents(".thumbpick-browser-root-pane").attr("tp_preview_img");
       $("#"+previewId).attr("src",src);
    }else if(mode=="folder"){
       var folder =  $(this).attr("folder");
       var url = $(this).parents(".thumbpick-browser-root-pane").attr("tp_url")+"/folder/"+folder;
       var uid = $(this).parents(".thumbpick-browser-root-pane").attr("tp_uid");
       tpAjaxPost(url,"","thumbpick-browser-main-column-"+uid,"tpFinishLoadFolder",null);
    }
}

function tpClickLaunch(){
	var paneId = $(this).attr("tp_pane");
	var targetId = $(this).attr("tp_target");
	var url = $(this).attr("tp_url");
    var uid = $(this).attr("tp_uid");
    var previewId = $(this).attr("tp_preview_img");
	tpSummonBrowser(paneId,targetId,previewId,url,uid);
}

function tpSummonBrowser(paneId,targetId,previewId,url,uid){
	$("#"+paneId).hide();
	$("#"+paneId).addClass("thumbpick-browser-pane");
	postParam = "target="+targetId+"&preview="+previewId+"&uid="+uid+"&tp_url="+encodeURIComponent(url);
	tpAjaxPost(url,postParam,paneId,"tpFinishLoad",paneId);
}

function tpFinishLoad(response,paneId){
	$("#"+paneId).show("slow");
	prepareIcon();
}

function tpFinishLoadFolder(response){
    prepareIcon();
}

function tpAjaxPost(url,params,target,finisher,extra){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200){
            var response = JSON.parse(xhr.responseText);
            if(target!=null){
                $("#"+target).html(response);
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