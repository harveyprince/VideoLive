package com.videolive.service;

public interface LiveService {

	public double getLiveTime();
	
	public void setPause(double time);
	
	public void setPlay(double time);
	
	public void setInit();
}
