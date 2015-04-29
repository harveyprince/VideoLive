<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>How to get there from here</title>
</head>
<body>
<h1>Get text, start and end time, from a track</h1>
   <video controls>
   <source src="./dist/video/video.mp4" type="video/mp4" />
   <!-- <track src="./dist/video/test.vtt" kind="captions" 
         label="English Subtitles" type="text/vtt" srclang="en" default/> -->
         <track kind="captions" src="./dist/video/track.vtt" type="text/vtt" srclang="en" label="WebVTT Acid Test" default/>
</video>
   <br />
   
   <div id="display">   
   </div>
</body>
<script src="./dist/extra/caption/captionator-min.js" type="text/javascript"></script>
<script type="text/javascript">
window.addEventListener("load",function() {
	captionator.captionify(null,null,{
		debugMode: !!window.location.search.match(/debug/i),
		sizeCuesByTextBoundingBox: !!window.location.search.match(/boundingBox/i),
		enableHighResolution: !!window.location.search.match(/highres/i),
	});
},false);
</script>
</html>