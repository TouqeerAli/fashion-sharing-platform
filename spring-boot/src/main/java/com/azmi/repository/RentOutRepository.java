package com.azmi.repository;

import com.azmi.modal.Product;
import com.azmi.modal.RentOut;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentOutRepository extends JpaRepository<RentOut, Long> {
}
