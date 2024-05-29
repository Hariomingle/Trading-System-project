package com.example.project.trading.service;

import java.util.List;

import com.example.project.trading.exception.ExceptionClass;
import com.example.project.trading.model.Trading;

public interface TradingService {
	
	public Trading addTrading(Trading trading);
	public List<Trading> getAllTradings();
	//public boolean insertTrading(Trading trading);
	public Trading displayTrading(int tid)throws ExceptionClass;
	public void deleteTrading(int tid);
	public Trading updateTrading(int tid, Trading trade) throws ExceptionClass;
	

}
