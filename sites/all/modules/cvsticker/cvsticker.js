$(document).ready(function(){
    prepareSetCover();
    prepareSticker();
});

function prepareSetCover(){
	$(".cvsticker-set-cover-wrapper").click(clickSetCoverWrapper);
}

function prepareSticker(){
    $(".cvsticker-sticker-wrapper").click(clickStickerWrapper);
}

function clickStickerWrapper(){
    $(".cvsticker-sticker-wrapper").css("border","1px solid transparent");
    $(this).css("border","1px solid #018ada");
    var stkId = $(this).attr("stk_id");
    var stkSrc = $(this).children("img.cvsticker-sticker").attr("src");
    var customId = $(this).parents(".cvsticker-browser").attr("custom_id");
    $("#cvsticker-"+customId+"-selected-src").val(stkSrc);
}

function clickSetCoverWrapper(){
    $(".cvsticker-set-cover-wrapper").css("border","1px solid transparent");
    $(this).css("border","1px solid #018ada");
    var customId = $(this).parents(".cvsticker-browser").attr("custom_id");
	var setId = $(this).attr("set_id");
	var url = "?q=cvsticker/ajax/set";
	var params = "set_id="+setId+"&custom_id="+customId;
    $("#cvsticker-browser-right-"+customId).html(cvstickerAddSpinnerSmall());
	cvstickerAjaxPost(url,params,null,"afterClickSetCoverWrapper");
}

function afterClickSetCoverWrapper(response){
    var tokens = response.split(":::");
    var customId = tokens[1];
    $("#cvsticker-browser-right-"+customId).hide();
    $("#cvsticker-browser-right-"+customId).html(tokens[2]);
    $("#cvsticker-browser-right-"+customId).show("slow");
    prepareSticker();
}

function cvstickerAjaxPost(url,params,target,finisher){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&xhr.status==200){
            var response = JSON.parse(xhr.responseText);
            if(target!=null){
                $("#"+target).html(response);
            }
            if(finisher!=null){
                window[finisher](response);   
            }
        }
    };
    xhr.open("POST",url,true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-length", params.length);
    xhr.setRequestHeader("Connection", "close");
    xhr.send(params);
}

function cvstickerAddSpinnerSmall(){
    var src = $("#cvsticker-constant").attr('spinner_url');
    return "<img src='"+src+"'/>";
}