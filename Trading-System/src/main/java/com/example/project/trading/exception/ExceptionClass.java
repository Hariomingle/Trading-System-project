package com.example.project.trading.exception;

public class ExceptionClass extends RuntimeException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ExceptionClass() {
		super("Data is invalid");
	}
}
