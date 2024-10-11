package com.azmi.repository;

import com.azmi.modal.RentOutProductImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentOutProductImagesRepository extends JpaRepository<RentOutProductImages,Long> {
    List<RentOutProductImages> findByRentOutId(Long rentOutId);
}
