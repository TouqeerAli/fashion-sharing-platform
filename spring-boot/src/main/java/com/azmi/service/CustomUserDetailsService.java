package com.azmi.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.azmi.modal.User;
import com.azmi.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	private final UserRepository userRepository;
	
	public CustomUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
		
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepository.findByEmail(username);

		if(user == null) {
			throw new UsernameNotFoundException("user not found with email "+username);
		}


		List<GrantedAuthority> authorities = new ArrayList<>();

		authorities.addAll(user.getAuthorities());
		return new CustomUserDetails(user.getEmail(),user.getPassword(),authorities);
	}



//	@Override
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		User user = this.userRepository.findByEmail(email)
//				.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
//
//		// Return an instance of CustomUserDetails
//		return new CustomUserDetails(user.getEmail(), user.getPassword(), user.getAuthorities());
//	}

}
