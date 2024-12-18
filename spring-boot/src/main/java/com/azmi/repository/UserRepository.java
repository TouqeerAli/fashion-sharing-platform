package com.azmi.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.azmi.modal.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmail(String email);


}
