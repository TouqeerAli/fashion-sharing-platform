package com.azmi.service;

import com.azmi.exception.UserException;
import com.azmi.modal.User;

public interface UserService {
	
	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;

}
