package com.example.project.trading.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.trading.model.Trading;
import com.example.project.trading.service.TradingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/trading")
@CrossOrigin(origins = "*") // Enable CORS for frontend access
public class TradingController {
	
	@Autowired
	TradingService tradingService;
	
	@GetMapping("/show")
	@ResponseStatus(HttpStatus.OK)
	public List<Trading> dissplayAll()
	{
		return tradingService.getAllTradings();
	}
	
	@PostMapping("/addtradings")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> addTrading(@Valid @RequestBody Trading t) {
		try {
			Trading result = tradingService.addTrading(t);
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Error: " + e.getMessage());
		}
	}
	
	@PutMapping("/update/{tid}")
	@ResponseStatus(HttpStatus.CREATED)
	public Trading update(@PathVariable int tid,@RequestBody Trading t){	
		return tradingService.updateTrading (tid, t);
	}
	
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/delete/{tid}")
	public void deleteNotes(@PathVariable int tid) {
		tradingService.deleteTrading(tid);
	}
	
	@GetMapping("/all")
	public List<Trading> showAll()
	{
		return tradingService.getAllTradings();
	}
	
	@GetMapping("/{tid}")
	@ResponseStatus(HttpStatus.OK)
	public Trading getTradingById(@PathVariable int tid) {
		return tradingService.displayTrading(tid);
	}
}
