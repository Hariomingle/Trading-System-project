package com.example.project.trading.model;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tradings")

public class Trading {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int tid;
	@NotBlank(message = "Customer name is mandatory")
	//@NotEmpty
	@Size(min = 3)
	String customer_name;
	@NotBlank(message = "Stock name is mandatory")
	String stock_name;
	@NotNull(message = "enter a value")
	int stock_quantity;
	@NotNull(message = "enter a value")
	int stock_price;
	@NotNull(message = "enter a value")
	int stop_loss_price;
	@NotNull(message = "enter a value")
	int bank_account_number;
	@NotNull(message = "enter a value")
	int trading_account_number;
	@NotNull(message = "enter a value")
	int pan;
	@NotNull(message = "enter a value")
	int aadhar;
	@NotBlank(message = "String notes is mandatory")
	@Size(max=250,message = "max size is exceed" )
	String notes;
	@NotNull(message = "enter a value")
	int phone_number;
	
	@Valid
	@Embedded
	CustomerAddress ca;
	
	public Trading() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Trading(@NotNull(message = "enter a value") int tid,
			@NotBlank(message = "Customer name is mandatory") @Size(min = 3) String customer_name,
			@NotBlank(message = "Stock name is mandatory") String stock_name,
			@NotNull(message = "enter a value") int stock_quantity, @NotNull(message = "enter a value") int stock_price,
			@NotNull(message = "enter a value") int stop_loss_price,
			@NotNull(message = "enter a value") int bank_account_number,
			@NotNull(message = "enter a value") int trading_account_number, @NotNull(message = "enter a value") int pan,
			@NotNull(message = "enter a value") int aadhar,
			@NotBlank(message = "String notes is mandatory") @Size(max = 250, message = "max size is exceed") String notes,
			@NotNull(message = "enter a value") int phone_number, @Valid CustomerAddress ca) {
		super();
		this.tid = tid;
		this.customer_name = customer_name;
		this.stock_name = stock_name;
		this.stock_quantity = stock_quantity;
		this.stock_price = stock_price;
		this.stop_loss_price = stop_loss_price;
		this.bank_account_number = bank_account_number;
		this.trading_account_number = trading_account_number;
		this.pan = pan;
		this.aadhar = aadhar;
		this.notes = notes;
		this.phone_number = phone_number;
		this.ca = ca;
	}

	public int getTid() {
		return tid;
	}

	public void setTid(int tid) {
		this.tid = tid;
	}

	public String getCustomer_name() {
		return customer_name;
	}

	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}

	public String getStock_name() {
		return stock_name;
	}

	public void setStock_name(String stock_name) {
		this.stock_name = stock_name;
	}

	public int getStock_quantity() {
		return stock_quantity;
	}

	public void setStock_quantity(int stock_quantity) {
		this.stock_quantity = stock_quantity;
	}

	public int getStock_price() {
		return stock_price;
	}

	public void setStock_price(int stock_price) {
		this.stock_price = stock_price;
	}

	public int getStop_loss_price() {
		return stop_loss_price;
	}

	public void setStop_loss_price(int stop_loss_price) {
		this.stop_loss_price = stop_loss_price;
	}

	public int getBank_account_number() {
		return bank_account_number;
	}

	public void setBank_account_number(int bank_account_number) {
		this.bank_account_number = bank_account_number;
	}

	public int getTrading_account_number() {
		return trading_account_number;
	}

	public void setTrading_account_number(int trading_account_number) {
		this.trading_account_number = trading_account_number;
	}

	public int getPan() {
		return pan;
	}

	public void setPan(int pan) {
		this.pan = pan;
	}

	public int getAadhar() {
		return aadhar;
	}

	public void setAadhar(int aadhar) {
		this.aadhar = aadhar;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public int getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(int phone_number) {
		this.phone_number = phone_number;
	}

	public CustomerAddress getCa() {
		return ca;
	}

	public void setCa(CustomerAddress ca) {
		this.ca = ca;
	}

	@Override
	public String toString() {
		return "Trading [tid=" + tid + ", customer_name=" + customer_name + ", stock_name=" + stock_name
				+ ", stock_quantity=" + stock_quantity + ", stock_price=" + stock_price + ", stock_loss_price="
				+ stop_loss_price + ", bank_account_number=" + bank_account_number + ", trading_account_number="
				+ trading_account_number + ", pan=" + pan + ", aadhar=" + aadhar + ", notes=" + notes
				+ ", phone_number=" + phone_number + ", ca=" + ca + "]";
	}

	
	
}