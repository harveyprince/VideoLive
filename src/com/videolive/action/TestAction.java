package com.videolive.action;

import org.springframework.stereotype.Repository;

@Repository
public class TestAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int userid = 0;
	
	public String welcome(){
//		return SUCCESS;
		userid++;
		return "release";
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

}
