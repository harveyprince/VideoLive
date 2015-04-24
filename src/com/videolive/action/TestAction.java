package com.videolive.action;

import org.springframework.stereotype.Repository;

@Repository
public class TestAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public String welcome(){
		return SUCCESS;
	}

}
