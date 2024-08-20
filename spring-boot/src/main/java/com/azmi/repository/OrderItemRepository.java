package com.azmi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.azmi.modal.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
