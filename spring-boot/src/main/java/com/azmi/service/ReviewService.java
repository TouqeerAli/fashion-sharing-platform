package com.azmi.service;

import java.util.List;

import com.azmi.exception.ProductException;
import com.azmi.modal.Review;
import com.azmi.modal.User;
import com.azmi.request.ReviewRequest;

public interface ReviewService {

	public Review createReview(ReviewRequest req,User user) throws ProductException;
	
	public List<Review> getAllReview(Long productId);
	
	
}
