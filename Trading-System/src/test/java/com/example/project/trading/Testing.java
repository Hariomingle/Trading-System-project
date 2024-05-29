package com.example.project.trading;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.project.trading.model.CustomerAddress;
import com.example.project.trading.model.Trading;
import com.example.project.trading.service.TradingService;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
public class Testing {
	
	@Autowired
	private TradingService tradingService;
	
	@Test
	public void testAddTrading() {
		Trading trade = new Trading (1,"customer_name", " stock_name",  1000, 5000,
			2000,  101, 100,  111, 111000111,
			 "notes",  909900990,new CustomerAddress( "house_no", "street", " landmark",
			" city"," state","pin" ));
		Trading test = tradingService.addTrading(trade);
		assertNotNull(test.getTid());
		assertEquals(test.getStock_price(),trade.getStock_price());
	}
		@Test
		public void testUpdateTrading() {
			Trading trade = new Trading(1,"customer_name", " stock_name",  1000, 5000,
			2000,  101, 100,  111, 111000111,
			 "notes",  909900990,new CustomerAddress( "house_no", "street", " landmark",
			" city"," state","pin" ));
			Trading test = tradingService.addTrading(trade);
			test.setCustomer_name("Rishitha");
			int n=919293949;
			test.setPhone_number(n);
			Trading updatetrade = tradingService.updateTrading(test.getTid(), test);
			assertNotNull(updatetrade.getTid());
			assertEquals("Rishitha",updatetrade.getCustomer_name());		
	}
		@Test
		public void testDeleteTrading() {
			Trading trade = new Trading(1,"customer_name", " stock_name",  1000, 5000,
					2000,  101, 100,  111, 111000111,
					 "notes",  909900990,new CustomerAddress( "house_no", "street", " landmark",
					" city"," state","pin" ));
			Trading test = tradingService.addTrading(trade);
			tradingService.deleteTrading(test.getTid());
			
		}
		@Test
		public void testDisplayTrading1() {
			Trading trade = new Trading(1,"customer_name", " stock_name",  1000, 5000,
					2000,  101, 100,  111, 111000111,
					 "notes",  909900990,new CustomerAddress( "house_no", "street", " landmark",
					" city"," state","pin" ));
			Trading test = tradingService.addTrading(trade);
			Trading tradingView = tradingService.displayTrading(trade.getTid());
			assertNotNull(test.getTid());
			assertEquals("customer_name", tradingView.getCustomer_name());
		 }
}
