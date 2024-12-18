package com.azmi.repository;

import com.azmi.modal.Product;
import com.azmi.modal.RentOut;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentOutRepository extends JpaRepository<RentOut, Long> {
    Page<RentOut> findByUserId(Long userId,Pageable pageable);

    Page<RentOut> findByStatus(String status, Pageable pageable);
    Page<RentOut> findByUserIdAndStatus(Long userId,String status, Pageable pageable );

}