package com.azmi.controller;

import com.azmi.response.PaymentResponse;
import com.azmi.service.PaymentService;
import com.stripe.exception.StripeException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.azmi.exception.OrderException;
import com.azmi.exception.UserException;
import com.azmi.modal.Order;
import com.azmi.repository.OrderRepository;
import com.azmi.response.ApiResponse;
import com.azmi.response.PaymentLinkResponse;
import com.azmi.service.OrderService;
import com.azmi.service.UserService;
import com.azmi.user.domain.OrderStatus;
import com.azmi.user.domain.PaymentStatus;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api")
public class PaymentController {
	
	private final OrderService orderService;
	private final OrderRepository orderRepository;

	@Autowired
	private PaymentService paymentService;

	public PaymentController(OrderService orderService,UserService userService,OrderRepository orderRepository) {
		this.orderService=orderService;
		this.orderRepository=orderRepository;
	}
	
	@PostMapping("/payments/{orderId}")
	public ResponseEntity<PaymentResponse>createPaymentLink(@PathVariable Long orderId,
															@RequestHeader("Authorization")String jwt)
			throws RazorpayException, UserException, OrderException, StripeException {
		
		Order order=orderService.findOrderById(orderId);
		PaymentResponse response =  paymentService.createPaymentLink(order);

		order.getPaymentDetails().setStatus(PaymentStatus.COMPLETED);
		order.setOrderStatus(OrderStatus.PLACED);
		orderRepository.save(order);
		return new ResponseEntity<PaymentResponse>(response,HttpStatus.OK);

	}
	
  @GetMapping("/payments")
  public ResponseEntity<ApiResponse> redirect(@RequestParam(name="payment_id") String paymentId,@RequestParam("order_id")Long orderId) throws RazorpayException, OrderException {
	  RazorpayClient razorpay = new RazorpayClient("rzp_test_kTsRSaDC8hwztX", "LieoD1s9mxMIv569PcgRDMcU");
	  Order order =orderService.findOrderById(orderId);
	
	  try {
		
		
		Payment payment = razorpay.payments.fetch(paymentId);
		System.out.println("payment details --- "+payment+payment.get("status"));
		
		if(payment.get("status").equals("captured")) {
			System.out.println("payment details --- "+payment+payment.get("status"));
		  
			order.getPaymentDetails().setPaymentId(paymentId);
			order.getPaymentDetails().setStatus(PaymentStatus.COMPLETED);
			order.setOrderStatus(OrderStatus.PLACED);
//			order.setOrderItems(order.getOrderItems());
			System.out.println(order.getPaymentDetails().getStatus()+"payment status ");
			orderRepository.save(order);
		}
		ApiResponse res=new ApiResponse("your order get placed", true);
	      return new ResponseEntity<ApiResponse>(res,HttpStatus.OK);
	      
	} catch (Exception e) {
		System.out.println("errrr payment -------- ");
		new RedirectView("https://shopwithzosh.vercel.app/payment/failed");
		throw new RazorpayException(e.getMessage());
	}

  }

}
