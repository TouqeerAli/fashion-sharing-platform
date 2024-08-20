package com.azmi.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.azmi.modal.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public User findByEmail(String email);

}
