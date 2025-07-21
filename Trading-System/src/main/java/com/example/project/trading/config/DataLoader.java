package com.example.project.trading.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.project.trading.model.CustomerAddress;
import com.example.project.trading.model.Trading;
import com.example.project.trading.service.TradingService;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private TradingService tradingService;

    @Override
    public void run(String... args) throws Exception {
        // Load some demo data
        loadDemoData();
    }

    private void loadDemoData() {
        try {
            // Demo trade 1
            CustomerAddress address1 = new CustomerAddress();
            address1.setHouse_no("123");
            address1.setStreet("MG Road");
            address1.setLandmark("Near Metro Station");
            address1.setCity("Mumbai");
            address1.setState("Maharashtra");
            address1.setPin("400001");

            Trading trade1 = new Trading();
            trade1.setCustomer_name("Rajesh Kumar");
            trade1.setStock_name("RELIANCE");
            trade1.setStock_quantity(100);
            trade1.setStock_price(2485);
            trade1.setStop_loss_price(2400);
            trade1.setBank_account_number(123456789);
            trade1.setTrading_account_number(987654321);
            trade1.setPan(123456789);
            trade1.setAadhar(987654321);
            trade1.setPhone_number(987654321);
            trade1.setNotes("Long term investment in Reliance");
            trade1.setCa(address1);

            tradingService.addTrading(trade1);

            // Demo trade 2
            CustomerAddress address2 = new CustomerAddress();
            address2.setHouse_no("456");
            address2.setStreet("Brigade Road");
            address2.setLandmark("Commercial Street");
            address2.setCity("Bangalore");
            address2.setState("Karnataka");
            address2.setPin("560001");

            Trading trade2 = new Trading();
            trade2.setCustomer_name("Priya Sharma");
            trade2.setStock_name("TCS");
            trade2.setStock_quantity(50);
            trade2.setStock_price(3642);
            trade2.setStop_loss_price(3500);
            trade2.setBank_account_number(111222333);
            trade2.setTrading_account_number(444555666);
            trade2.setPan(111222333);
            trade2.setAadhar(444555666);
            trade2.setPhone_number(888999777);
            trade2.setNotes("Tech stock for portfolio diversification");
            trade2.setCa(address2);

            tradingService.addTrading(trade2);

            // Demo trade 3
            CustomerAddress address3 = new CustomerAddress();
            address3.setHouse_no("789");
            address3.setStreet("Connaught Place");
            address3.setLandmark("Central Park");
            address3.setCity("New Delhi");
            address3.setState("Delhi");
            address3.setPin("110001");

            Trading trade3 = new Trading();
            trade3.setCustomer_name("Amit Patel");
            trade3.setStock_name("INFY");
            trade3.setStock_quantity(75);
            trade3.setStock_price(1398);
            trade3.setStop_loss_price(1350);
            trade3.setBank_account_number(555666777);
            trade3.setTrading_account_number(888999000);
            trade3.setPan(555666777);
            trade3.setAadhar(888999000);
            trade3.setPhone_number(777888999);
            trade3.setNotes("IT sector investment");
            trade3.setCa(address3);

            tradingService.addTrading(trade3);

            System.out.println("Demo trading data loaded successfully!");

        } catch (Exception e) {
            System.out.println("Demo data already exists or error loading: " + e.getMessage());
        }
    }
} 