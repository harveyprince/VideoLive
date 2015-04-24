package com.videolive.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.RemoteEndpoint.Basic;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/websocket")
public class SocketAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private static  List<Basic> selist = null;
	
	@OnMessage
	public void onMessage(String message,Session session) throws IOException, InterruptedException{
		
		if(selist.indexOf(session.getBasicRemote())==-1){
			selist.add(session.getBasicRemote());
		}
		
		for(Basic b:selist){
			b.sendText(message);
		}
		System.out.println(selist.size());
	   
	    // Send a final message to the client
	}
	 
	  @OnOpen
	  public void onOpen() {
		  if(selist==null){
			  selist = new ArrayList<Basic>();
		  }
	    System.out.println("Client connected");
	  }
	 
	  @OnClose
	  public void onClose() {
	    System.out.println("Connection closed");
	  }
}
