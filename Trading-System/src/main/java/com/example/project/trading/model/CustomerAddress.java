package com.example.project.trading.model;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Embeddable
public class CustomerAddress {
	@NotNull(message = "enter a value")
	@Size(max=250,message = "max size is exceed" )
	String house_no;
	@NotEmpty(message = "Street name is mandatory")
	@Size(max=250,message = "max size is exceed" )
	String street;
	@NotBlank(message = "Landmark is mandatory")
	@Size(max=250,message = "max size is exceed" )
	String landmark;
	@NotEmpty(message = "City is mandatory")
	@Size(max=250,message = "max size is exceed" )
	String city;
	@NotEmpty(message = "State name is mandatory")
	@Size(max=250,message = "max size is exceed" )
	String state;
	@NotNull(message = "enter a value")
	@Size(max=250,message = "max size is exceed" )
	String pin;
	
	public CustomerAddress() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CustomerAddress(
			@NotNull(message = "enter a value") @Size(max = 250, message = "max size is exceed") String house_no,
			@NotEmpty(message = "Street name is mandatory") @Size(max = 250, message = "max size is exceed") String street,
			@NotBlank(message = "Landmark is mandatory") @Size(max = 250, message = "max size is exceed") String landmark,
			@NotEmpty(message = "City is mandatory") @Size(max = 250, message = "max size is exceed") String city,
			@NotEmpty(message = "State name is mandatory") @Size(max = 250, message = "max size is exceed") String state,
			@NotNull(message = "enter a value") @Size(max = 250, message = "max size is exceed") String pin) {
		super();
		this.house_no = house_no;
		this.street = street;
		this.landmark = landmark;
		this.city = city;
		this.state = state;
		this.pin = pin;
	}

	public String getHouse_no() {
		return house_no;
	}

	public void setHouse_no(String house_no) {
		this.house_no = house_no;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getLandmark() {
		return landmark;
	}

	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	@Override
	public String toString() {
		return "CustomerAddress [house_no=" + house_no + ", street=" + street + ", landmark=" + landmark + ", city="
				+ city + ", state=" + state + ", pin=" + pin + "]";
	}
	
	

}
