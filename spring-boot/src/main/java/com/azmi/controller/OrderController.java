package com.azmi.controller;

import java.util.List;

import com.azmi.response.PaymentResponse;
import com.azmi.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azmi.exception.OrderException;
import com.azmi.exception.UserException;
import com.azmi.modal.Address;
import com.azmi.modal.Order;
import com.azmi.modal.User;
import com.azmi.service.OrderService;
import com.azmi.service.UserService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	
	private final OrderService orderService;
	private final UserService userService;

	@Autowired
	private final PaymentService paymentService;
	
	public OrderController(OrderService orderService,UserService userService,PaymentService paymentService) {
		this.orderService=orderService;
		this.userService=userService;
		this.paymentService=paymentService;
	}
	
	@PostMapping("/")
	public ResponseEntity<Order> createOrderHandler(@RequestBody Address spippingAddress,
															  @RequestHeader("Authorization")String jwt) throws UserException, StripeException {
		
		User user=userService.findUserProfileByJwt(jwt);
		Order order =orderService.createOrder(user, spippingAddress);
		return new ResponseEntity<Order>(order,HttpStatus.OK);
		
	}
	
	@GetMapping("/user")
	public ResponseEntity< List<Order>> usersOrderHistoryHandler(@RequestHeader("Authorization") 
	String jwt) throws OrderException, UserException{
		System.out.println("User orders");
		User user=userService.findUserProfileByJwt(jwt);
		List<Order> orders=orderService.usersOrderHistory(user.getId());
		 for (Order order: orders){
			 System.out.println("Order Id"+order.getId());
			 System.out.println("Order Status"+order.getOrderStatus());
			 System.out.println("Order Items"+order.getOrderItems());
		 }
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity<Order> findOrderHandler(@PathVariable Long orderId, @RequestHeader("Authorization")
	String jwt) throws OrderException, UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Order orders=orderService.findOrderById(orderId);
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}

}
