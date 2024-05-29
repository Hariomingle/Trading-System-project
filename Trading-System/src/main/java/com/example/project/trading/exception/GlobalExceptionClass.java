package com.example.project.trading.exception;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionClass {
	@ExceptionHandler(ExceptionClass.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String ExceptionClass(ExceptionClass e) {
		return e.getMessage();
		}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Set<String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
		Set<String> resp=new HashSet<>();
		ex.getBindingResult().getAllErrors().forEach((error)->{
			String fieldName=((FieldError) error).getField();
			String message=error.getDefaultMessage();
			resp.add(message);
			});
		
		return new ResponseEntity<Set<String>>(resp,HttpStatus.BAD_REQUEST);
	}
	

}
