<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<title>player proto</title>
	<link rel="stylesheet" type="text/css" href="./dist/css/doc.css">
	<link rel="stylesheet" type="text/css" href="./dist/css/style.css">
	<link rel="stylesheet" type="text/css" href="./dist/css/color_box.css">
	<link rel="stylesheet" type="text/css" href="./dist/extra/font-awesome-4.2.0/css/font-awesome.min.css">
	<!--[if IE]>
	<script src="./dist/js/html5.js"></script>
	<![endif]-->
</head>
<body>
	<div class="H5Player">
		<div class="HP-Unit">
			<div class="HP-Video">
				<video autobuffer="true" id="video">
					<source src="./dist/video/video.mp4" type="video/mp4">
				</video>
				<div class="danmaku-container abp">
					<div id="danmaku-stage" class="container"></div>
				</div>
			</div>
			<div class="HP-Mask">
				<div class="HP-User-List">
					<div class="user-panel" style="display:none;">
						<div class="head">user</div>
						<div class="user-list">
							<div class="user-block">
								<div class="head-icon">
									<img src="./dist/img/1_head_1411982899118.jpeg" />
								</div>
								<div class="detail-info">
									<div class="name">harvey</div>
								</div>
							</div>
						</div>
					</div>
					<div class="panel-key"><i class="fa fa-chevron-right"></i></div>
				</div>
				<div class="HP-Comment-List">
					<div class="comment-panel" style="display:none;">
						<div class="head">comment</div>
						<div class="comment-list">
							<div class="comment-block">
								<div class="head-icon">
									<img src="./dist/img/1_head_1411982899118.jpeg" />
								</div>
								<div class="bubble">
						          <span class="triangle"></span>
						          <div class="article">what did you talk about</div>
								</div>
							</div>
							<div class="comment-block fr">
								<div class="head-icon">
									<img src="./dist/img/1_head_1411982899118.jpeg" />
								</div>
								<div class="bubble">
						          <span class="triangle"></span>
						          <div class="article">what did you talk about?I don't care at all</div>
								</div>
							</div>
						</div>
					</div>
					<div class="panel-key"><i class="fa fa-chevron-left"></i></div>
				</div>
			</div>
			<div class="HP-Control">
				<div class="button-play-pause"><i class="fa fa-play"></i></div>
				<div class="progress-bar">
					<div class="bar">
						<div class="load" style="width:0%;"></div>
						<div class="dark" style="width:0%;"></div>
					</div>
				</div>
				<div class="time-label">00:00/24:00</div>
				<div class="video-button volume"><i class="fa fa-volume-up"></i></div>
				<div class="volume-bar">
					<div class="bar">
						<div class="load" style="width:100%;"></div>
					</div>
				</div>
				<div class="video-button comment-group"><i class="fa fa-eye"></i></div>
				<div class="video-button arrows"><i class="fa fa-arrows-alt"></i></div>
			</div>
			<div class="HP-Text">
				<div class="text-style">
					<div class="font"><i class="fa fa-font"></i></div>
					<div class="font-panel panel-box" style="display:none;">
						<div class="panel-title">
							<span>font</span>
							<i class="fa fa-times"></i>
						</div>
						<div class="panel-body">
							<div class="label-line">font-size</div>
							<div class="font-size" value="30">
								<div class="option active" value="30" >
									<i class="fa fa-font" style="position:absolute;font-size:30px;padding-left: 20px;"></i>
								</div>
								<div class="option" value="20" >
									<i class="fa fa-font" style="position:absolute;font-size:20px;padding-left: 20px;"></i>
								</div>
							</div>
							<div class="label-line">danmaku-mode</div>
							<div class="danmaku-mode" value="1">
								<div class="option active" value="1" style="text-align:center;">
									<div style="padding-top:0;">←←←</div>
								</div>
								<div class="option" value="2" style="text-align:center;vertical-align: bottom;">
									<div style="padding-top:25px;">←←←</div>
								</div>
								<div class="option" value="4" style="text-align:center;vertical-align: bottom;">
									<div style="padding-top:25px;">===</div>
								</div>
								<div class="option" value="5" style="text-align:center;">
									<div style="padding-top:0;">===</div>
								</div>
							</div>
						</div>
					</div>
					<div class="setting"><i class="fa fa-cog"></i></div>
					<div class="setting-panel panel-box" style="display:none;">
						<div class="panel-title">
							<span>setting</span>
							<i class="fa fa-times"></i>
						</div>
						<div class="panel-body">
							<div class="font-color">
							</div>
						</div>
					</div>
				</div>
				<div class="text-block">
					<input type="text"/>
					<div class="comment-send-button">send</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="./dist/extra/jquery/jquery.min.js"></script>
<script src="./dist/js/CommentCoreLibrary.js"></script>
<script src="./dist/js/color_box.js"></script>
<script type="text/javascript">
	window.ws = new WebSocket("ws://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/websocket");
	var user = {
		"icon":"./dist/img/1_head_1411982899118.jpeg",
		"name":"harveyprince"
	};
</script>
<script src="./dist/js/doc.js"></script>
</html>
