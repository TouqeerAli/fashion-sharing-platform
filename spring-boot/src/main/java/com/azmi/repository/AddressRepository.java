package com.azmi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.azmi.modal.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
