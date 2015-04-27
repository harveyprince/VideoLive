package com.videolive.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.RemoteEndpoint.Basic;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONException;
import org.json.JSONObject;

import com.videolive.service.LiveService;
import com.videolive.service.impl.LiveServiceImpl;

@ServerEndpoint("/websocket")
public class SocketAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private static  List<Basic> selist = null;
	private String userid = null;
	private JSONObject user = null;
	private static Map<String,JSONObject> userlist = null;
	private static LiveService liveService = new LiveServiceImpl();
	@OnMessage
	public void onMessage(String message,Session session) throws IOException, InterruptedException{
		boolean sendable = true;
		JSONObject js;
		try {
			js = new JSONObject(message);
			String type = js.getString("type");
			switch(type){
			case "0":
				break;
			case "1":
				if(selist.indexOf(session.getBasicRemote())!=0){
					return;
				}
				switch(js.getString("opera")){
				case "play":
					liveService.setPlay(js.getLong("time"));
					break;
				case "pause":
					liveService.setPause(js.getLong("time"));
					break;
				case "timeupdate":
					liveService.setPlay(js.getLong("time"));
					break;
				}
				break;
			case "2":
				if(userlist==null){
					userlist = new HashMap<String,JSONObject>();
				}
				user = new JSONObject(js.getString("user"));
				userlist.put(userid, user);
				break;
			case "3":
				break;
			case "4":
				sendable = false;
				JSONObject userjson = new JSONObject(js.getString("user"));
				userid = userjson.getString("id");
				user = userjson;
				if(userlist!=null){
					Map map = new HashMap();
					map.put("type",4);
					map.put("userlist",userlist);
					JSONObject jsonres = new JSONObject(map);
					session.getBasicRemote().sendText(jsonres.toString());
				}
				break;
			case "5":
				sendable = false;
				if(selist!=null&&selist.size()>1){
					Map map = new HashMap();
					map.put("type",5);
					map.put("time", liveService.getLiveTime());
					map.put("state", liveService.getLiveState());
					JSONObject jsonres = new JSONObject(map);
					session.getBasicRemote().sendText(jsonres.toString());
				}
				break;
			default:
				break;
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(sendable){
			for(Basic b:selist){
				b.sendText(message);
			}
		}
	}
	 
	  @OnOpen
	  public void onOpen(Session session) throws IOException {
		  if(selist==null||selist.size()==0){
			  selist = new ArrayList<Basic>();
			  liveService.setInit();
		  }
		  if(selist.indexOf(session.getBasicRemote())==-1){
				selist.add(session.getBasicRemote());
		  }
	  }
	 
	  @OnClose
	  public void onClose(Session session) throws IOException {
		  if(selist.indexOf(session.getBasicRemote())!=-1){
				selist.remove(session.getBasicRemote());
		  }
		  if(userlist!=null){
			  if(userlist.containsKey(userid)){
				  userlist.remove(userid);
			  }
		  }
		  Map map = new HashMap();
		  map.put("type",3);
		  map.put("userid",userid);
		  JSONObject json =new  JSONObject(map);
		  String message = json.toString();
		  for(Basic b:selist){
				b.sendText(message);
		  }
	  }
	  
	  @OnError
	  public void onError(Throwable t,Session session) throws Throwable {
		  if(selist.indexOf(session.getBasicRemote())!=-1){
				selist.remove(session.getBasicRemote());
		  }
		  if(userlist!=null){
			  if(userlist.containsKey(userid)){
				  userlist.remove(userid);
			  }
		  }
	  }
}
