/*
	author:harveyprince
*/
$(document).ready(function connectinit(){
	// window.ws = new WebSocket("ws://localhost:8080/VideoLive/websocket");
	ws.onopen = function()
	{
		$(".alarm-box").html("");
		$(".alarm-box").html("connected");
		console.log("open");
		// ws.send("hello");
		var jsoncontent = {
				"type":4,
				"user":user
		};
		ws.send(JSON.stringify(jsoncontent));
	};
	ws.onmessage = function(evt)
	{
		console.log(evt.data);
		var content = evt.data;
		var jsoncontent = JSON.parse(content);
		if(jsoncontent.type==0){
			// danmaku
			var jsonuser = jsoncontent.user;
			jsoncontent.text = jsonuser.name+":"+jsoncontent.text;
			CM.send(jsoncontent);
			// comment panel
			var cb = new CommentBlock(jsonuser.icon,jsoncontent.text,jsonuser.id==user.id);
			$(".HP-Comment-List").trigger("insert",cb);
		}else if(jsoncontent.type==1){
			var someDanmakuAObj = {
			    "mode":5,
			    "text":"["+jsoncontent.user.name+" changes the video state"+"]",
			    "size":Number($(".font-size").attr('value')),
			    "color":0xFFFC00,
			    "type":1
			};
			CM.send(someDanmakuAObj);
			switch(jsoncontent.opera){
			case "play":
				$("video").get(0).currentTime = jsoncontent.time;
				$("video").trigger("play");
				break;
			case "pause":
				$("video").get(0).currentTime = jsoncontent.time;
				$("video").trigger("pause");
				break;
			case "timeupdate":
				$("video").get(0).currentTime = jsoncontent.time;
				break;
			}
		}else if(jsoncontent.type==2){
			var otheruser = jsoncontent.user;
			var ub = new UserBlock(otheruser.icon,otheruser.name,otheruser.id==user.id,otheruser.id);
			$(".HP-User-List").trigger("insert",ub);
		}else if(jsoncontent.type==3){
			var otheruserid = jsoncontent.userid;
			$(".HP-User-List").trigger("removeById",otheruserid);
		}else if(jsoncontent.type==4){
			var userlist = jsoncontent.userlist;
			for(var idx in userlist){
				var otheruser = userlist[idx];
				var ub = new UserBlock(otheruser.icon,otheruser.name,otheruser.id==user.id,otheruser.id);
				$(".HP-User-List").trigger("insert",ub);
			}
		}else if(jsoncontent.type==5){
			var time = jsoncontent.time;
			if(time){
				$("video").get(0).currentTime = time;
				var state = jsoncontent.state;
				$("video").trigger(state);
			}
		}
	};
	ws.onclose = function(evt)
	{
		wstime++;
		console.log("WebSocketClosed!");
		$(".alarm-box").html("");
		$(".alarm-box").html("WebSocketClosed!");
		if(wstime<10){
			window.ws = new WebSocket(wsurl);
			connectinit();	
		}
		
	};
	ws.onerror = function(evt)
	{
		console.log("WebSocketError!");
		$(".alarm-box").html("");
		$(".alarm-box").html("WebSocketError!");
	};

	setTimeout(function(){
		var message = {
			"type":5
		}
		ws.send(JSON.stringify(message));
	},500);
});

$(".name-set").click(function(){
		var name = prompt("your name:","");
		if(name==null||name==""){
			alert("empty is invalid!");
		}else{
			user.name = name;
			$(".text-block input").removeAttr("disabled");
			var jsoncontent = {
				"type":2,
				"user":user
			};
			ws.send(JSON.stringify(jsoncontent));
			}
	});
/*
	panel lockin and lockout
*/
$(".panel-key").click(function(){
	$(this).parent().trigger("lock");
	var content = $(this).html();
	if(content.indexOf('left')>=0){
		$(this).html(content.replace('left','right'));
	}else{
		$(this).html(content.replace('right','left'));
	}
});
$(".HP-User-List").bind("lock",function(e){
	var $target = $(e.target);
	$target.find(".user-panel").animate({width: 'toggle'});	
});
$(".HP-Comment-List").bind("lock",function(e){
	var $target = $(e.target);
	$target.find(".comment-panel").animate({width: 'toggle'});	
});
/*
	font and setting panel
*/
$(".text-style .font").click(function(){
	$(".panel-box").hide();
	$(".font-panel").animate({width:'toggle'});
});
$(".text-style .setting").click(function(){
	$(".panel-box").hide();
	$(".setting-panel").animate({width:'toggle'});
});
$(".panel-title i").click(function(){
	$(this).parent().parent().animate({width:'toggle'});
});
$(".option").click(function(){
	$(this).parent().attr('value',$(this).attr('value'));
	$(this).siblings(".option.active").removeClass("active");
	$(this).addClass("active");
});
$(document).ready(function(){
	window.colorbox = new ColorBox($(".font-color"));
	colorbox.initBox();
});
// insert user in userlist
/*
	icon:image url
	name:string
	isSelf:boolean(keep)
*/
var UserBlock = function(icon,nicname,isSelf,userid){
	this.icon = icon;
	this.nicname = nicname;
	this.isSelf = isSelf;
	this.userid = userid;
}
UserBlock.prototype.constructDOM = function(){
	var $block = $('<div class="user-block" userid="'+this.userid+'">');
	$block.append($('<div class="head-icon">').append($('<img>').attr("src",this.icon)));
	$block.append($('<div class="detail-info">').append($('<div class="name">').html(this.nicname)));
	return $block;
}
$(".HP-User-List").bind("insert",function(e,ub){
	var $target = $(e.target);
	var list = $target.find(".user-list");
	list.append(ub.constructDOM());
	list.get(0).scrollTop = list.get(0).scrollHeight; 
});
$(".HP-User-List").bind("removeById",function(e,id){
	var $target = $(e.target);
	var ub = $target.find(".user-list .user-block[userid='"+id+"']");
	ub.remove();
});
// insert comment in commentlist
/*
	icon:image url
	comment:string
	isSelf:boolean
*/
var CommentBlock = function(icon,comment,isSelf){
	this.icon = icon;
	this.comment = comment;
	this.isSelf = isSelf;
};
CommentBlock.prototype.constructDOM = function(){
	var $block = $('<div class="comment-block">');
	if(this.isSelf){
		$block.addClass("fr");
	}
	$block.append($('<div class="head-icon">').append($('<img>').attr("src",this.icon)));
	$block.append($('<div class="bubble">').append($('<span class="triangle">')).append($('<div class="article">').html(this.comment)));
	return $block;
}
$(".HP-Comment-List").bind("insert",function(e,cb){
	var $target = $(e.target);
	var list = $target.find(".comment-list");
	list.append(cb.constructDOM());
	list.get(0).scrollTop = list.get(0).scrollHeight; 
});

/*
	extra function
*/
Number.prototype.timeformat = function(){
	var val = this;
	var minite = Math.floor(val/60);
	var sec = Math.floor(val - minite*60);
	minite = minite<10?'0'+minite.toString():minite;
	sec = sec<10?'0'+sec.toString():sec;
	return minite+":"+sec;
}
//video action
$(document).ready(function(){
	$("video").bind("canplay",function(){
		$(".time-label").html("00:00/"+this.duration.timeformat());
	});
	$("video").bind("pause",function(){
		$(".button-play-pause i").attr("class","fa fa-play");
	});
	$("video").bind("play",function(){
		$(".button-play-pause i").attr("class","fa fa-pause");
	});
	$("video").bind("timeupdate",function(){
		if(!dragging){
			$(".progress-bar .bar .dark").css("width",((this.currentTime / this.duration) * 100) + "%");
			$(".time-label").html(this.currentTime.timeformat()+"/"+this.duration.timeformat());
		}
	});
	$("video").bind("ended",function(){
		$(".progress-bar .bar .dark").css("width","0%");
	});
	$("video").bind("loadedmetadata",function(){
		if(this.buffered!=null){
			try{
				var load_end = this.buffered.end(0);
			}catch(e){return;}
			var dur = this.duration;
			$(".progress-bar .bar .load").css("width",((load_end / dur) * 100) + "%");
		}
	});
	var dragging = false;
	$(".progress-bar .bar").bind("mousedown",function(e){
		dragging = true;
	});
	$(".progress-bar .bar").bind("mouseup",function(e){
		dragging = false;
		var newTime = ((e.offsetX) / this.offsetWidth) * $("video").get(0).duration;
		var jsoncontent = {
				"opera":"timeupdate",
				"time":newTime,
				"type":1,
				"user":user
		};
		ws.send(JSON.stringify(jsoncontent));
//		$("video").get(0).currentTime = newTime;
	});
	$(".volume-bar .bar").bind("mouseup",function(e){
		var newVolume = ((e.offsetX) / this.offsetWidth);
		if(newVolume<0.1){
			$(".video-button.volume").html('<i class="fa fa-volume-off"></i>');
		}else if(newVolume<0.6){
			$(".video-button.volume").html('<i class="fa fa-volume-down"></i>');
		}else{
			$(".video-button.volume").html('<i class="fa fa-volume-up"></i>');
		}
		$("video").get(0).volume = newVolume;
		$(".volume-bar .bar .load").css("width",newVolume * 100 + "%");
	});
});
// danmaku
$(document).ready(function(){
	window.CM = new CommentManager($("#danmaku-stage").get(0));
	CM.init();
	CM.start();
});
// danmaku send
$(".comment-send-button").click(function(){
	if(user.name!=""){
		var text = $(this).siblings("input").val();
		if(text&&text.length>0){
		var someDanmakuAObj = {
		    "mode":Number($(".danmaku-mode").attr('value')),
		    "text":text,
		    "size":Number($(".font-size").attr('value')),
		    "color":window.colorbox.value,
		    "user":user,
		    "type":0
		};
		ws.send(JSON.stringify(someDanmakuAObj));
		}
		$(this).siblings("input").val("");
	}
});
$(".text-block input").keydown(function(e){
	if(e.keyCode==13){
		$(".comment-send-button").click();
	}
});
// play and pause
$(".button-play-pause").click(function(){
	if($("video").get(0).paused){
		var jsoncontent = {
				"opera":"play",
				"time":$("video").get(0).currentTime,
				"type":1,
				"user":user
		};
		ws.send(JSON.stringify(jsoncontent));
//		$("video").trigger("play");
	}else{
		var jsoncontent = {
				"opera":"pause",
				"time":$("video").get(0).currentTime,
				"type":1,
				"user":user
		};
		ws.send(JSON.stringify(jsoncontent));
//		$("video").trigger("pause");
	}
});

//fullscreen
$(".arrows").click(function(){
	if(!window.onfullscreen()){
		launchFullScreen($(".H5Player").get(0)); // any individual element
	}else{
		cancelFullscreen();
	}
});
function launchFullScreen(element) {
	if(element.requestFullScreen) {
		element.requestFullScreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	}
}
function cancelFullscreen() {
	if(document.cancelFullScreen) {
		document.cancelFullScreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
}
window.onfullscreen = function (){
	if(window.outerHeigth==screen.heigth && window.outerWidth==screen.width){
		return true;
	}else{
		return false;
	}
}
$(document).bind("fullscreenchange",function(){
	CM.setBounds();
});
$(document).bind("mozfullscreenchange",function(){
	CM.setBounds();
});
$(document).bind("webkitfullscreenchange",function(){
	CM.setBounds();
});