package com.azmi.service;

import java.util.List;

import com.azmi.exception.ProductException;
import com.azmi.modal.Rating;
import com.azmi.modal.User;
import com.azmi.request.RatingRequest;

public interface RatingServices {
	
	public Rating createRating(RatingRequest req,User user) throws ProductException;
	
	public List<Rating> getProductsRating(Long productId);

}
