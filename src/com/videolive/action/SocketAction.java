package com.videolive.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.RemoteEndpoint.Basic;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.stereotype.Repository;

@ServerEndpoint("/websocket")
@Repository
public class SocketAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private static  List<Basic> selist = null;
	
	@OnMessage
	public void onMessage(String message,Session session) throws IOException, InterruptedException{
		
		for(Basic b:selist){
			b.sendText(message);
		}
	   
	}
	 
	  @OnOpen
	  public void onOpen(Session session) throws IOException {
		  if(selist==null){
			  selist = new ArrayList<Basic>();
		  }
		  if(selist.indexOf(session.getBasicRemote())==-1){
				selist.add(session.getBasicRemote());
		  }
	  }
	 
	  @OnClose
	  public void onClose(Session session) {
		  if(selist.indexOf(session.getBasicRemote())!=-1){
				selist.remove(session.getBasicRemote());
		  }
	  }
	  
	  @OnError
	  public void onError(Throwable t) throws Throwable {
	  }
}