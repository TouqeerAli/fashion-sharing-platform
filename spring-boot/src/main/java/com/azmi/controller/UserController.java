package com.azmi.controller;

import com.azmi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azmi.exception.UserException;
import com.azmi.modal.User;
import com.azmi.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final UserService userService;


	@Autowired
	private UserRepository userRepository;
	
	public UserController(UserService userService) {
		this.userService=userService;
	}
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws UserException{

		System.out.println("/api/users/profile");
		User user=userService.findUserProfileByJwt(jwt);
		return new ResponseEntity<User>(user,HttpStatus.ACCEPTED);
	}

	@GetMapping("/loggedin-profile")
	public ResponseEntity<User> getLoggedInUserProfile() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			String username = (String) authentication.getPrincipal();
			User user = userRepository.findByEmail(username);

			if(user == null) {
				throw new UsernameNotFoundException("user not found with email "+username);
			}
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}



	@GetMapping("/allCustomers")
	public ResponseEntity<List<User>> getAllCustomers() {
		List<User> customers=this.userService.getAllCustomers();
		return new ResponseEntity<>(customers, HttpStatus.OK);
	}


}
