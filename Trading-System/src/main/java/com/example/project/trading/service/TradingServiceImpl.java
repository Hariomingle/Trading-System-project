package com.example.project.trading.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.trading.exception.ExceptionClass;
import com.example.project.trading.model.Trading;

@Service
public class TradingServiceImpl implements TradingService {
	
    @Autowired
    TradingRepository tradingRepository;
    
	@Override
	public Trading addTrading(Trading trading) {
		// TODO Auto-generated method stub
		return tradingRepository.save(trading);
	}

	@Override
	public List<Trading> getAllTradings() {
		// TODO Auto-generated method stub
		return (List<Trading>) tradingRepository.findAll();
	}

	@Override
	public void deleteTrading(int tid) {
		// TODO Auto-generated method stub
		tradingRepository.deleteById(tid);
	}

	@Override
	public Trading displayTrading(int tid) {
		// TODO Auto-generated method stub
		tradingRepository.findById(tid).orElseThrow(()->new ExceptionClass());
										
		return tradingRepository.findById(tid).get() ;
	}

	@Override
	public Trading updateTrading(int tid, Trading trade) {
		// TODO Auto-generated method stub
		tradingRepository.findById(tid).orElseThrow(()->new ExceptionClass());
		Trading t = tradingRepository.findById(tid).get();
		
		t.setCustomer_name(trade.getCustomer_name());
		t.setStock_name(trade.getStock_name());
		t.setStock_price(trade.getStock_price());
		t.setStock_quantity(trade.getStock_quantity());
		t.setStop_loss_price(trade.getStop_loss_price());
		t.setBank_account_number(trade.getBank_account_number());
		t.setTrading_account_number(trade.getTrading_account_number());
		t.setPan(trade.getPan());
		t.setAadhar(trade.getAadhar());
		t.setNotes(trade.getNotes());
		t.setPhone_number(trade.getPhone_number());
		t.setCa(trade.getCa());
		
		return tradingRepository.save(t);
	}
	
}
