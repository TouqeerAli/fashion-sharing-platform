package com.azmi.service;

import com.azmi.exception.ProductException;
import com.azmi.modal.Cart;
import com.azmi.modal.User;
import com.azmi.request.AddItemRequest;

public interface CartService {
	
	public Cart createCart(User user);
	
	public String addCartItem(Long userId,AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId);

}
