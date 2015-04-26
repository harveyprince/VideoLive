package com.videolive.service.impl;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.videolive.service.LiveService;

@Service
public class LiveServiceImpl implements LiveService {

	private static double videoTime = 0.0;
	private static String videoState = "pause";
	private static Date timestamp = null;
	
	@Override
	public double getLiveTime() {
		// TODO Auto-generated method stub
		double result = 0.0;
		switch(videoState){
		case "play":
			Date nowstamp = new Date();
			double blank = (nowstamp.getTime()-timestamp.getTime()+0.0)/1000.0;
			result = videoTime + blank;
			break;
		case "pause":
			result = videoTime;
			break;
		default:
			break;
		}
		return result;
	}

	@Override
	public void setPause(double time) {
		// TODO Auto-generated method stub
		videoTime = time;
		videoState = "pause";
		timestamp = new Date();
	}

	@Override
	public void setPlay(double time) {
		// TODO Auto-generated method stub
		videoTime = time;
		videoState = "play";
		timestamp = new Date();
	}

	@Override
	public void setInit() {
		// TODO Auto-generated method stub
		videoTime = 0.0;
		videoState = "pause";
		timestamp = null;
	}

}
