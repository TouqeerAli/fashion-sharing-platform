package com.azmi.service;

import org.springframework.stereotype.Service;

import com.azmi.exception.ProductException;
import com.azmi.modal.Cart;
import com.azmi.modal.CartItem;
import com.azmi.modal.Product;
import com.azmi.modal.User;
import com.azmi.repository.CartRepository;
import com.azmi.request.AddItemRequest;

@Service
public class CartServiceImplementation implements CartService{
	
	private final CartRepository cartRepository;
	private final CartItemService cartItemService;
	private final ProductService productService;
	
	
	public CartServiceImplementation(CartRepository cartRepository,CartItemService cartItemService,
			ProductService productService) {
		this.cartRepository=cartRepository;
		this.productService=productService;
		this.cartItemService=cartItemService;
	}

	@Override
	public Cart createCart(User user) {
		System.out.println("Cart created for user :"+user.getFirstName());
		Cart cart = new Cart();
		cart.setUser(user);
		Cart createdCart=cartRepository.save(cart);
		return createdCart;
	}
	
	public Cart findUserCart(Long userId) {
		Cart cart =	cartRepository.findByUserId(userId);
		int totalPrice=0;
		int totalDiscountedPrice=0;
		int totalItem=0;
		for(CartItem cartsItem : cart.getCartItems()) {
			totalPrice+=cartsItem.getPrice();
			//totalDiscountedPrice+=cartsItem.getDiscountedPrice();
			totalItem+=cartsItem.getQuantity();
		}
		System.out.println("Total Price:"+totalPrice);
		System.out.println("totalDiscountedPrice Price:"+totalDiscountedPrice);


		cart.setTotalPrice(totalPrice);
		cart.setTotalItem(cart.getCartItems().size());
		cart.setTotalDiscountedPrice(totalDiscountedPrice);
		cart.setDiscounte(totalPrice-totalDiscountedPrice);
		cart.setTotalItem(totalItem);
		
		return cartRepository.save(cart);
		
	}

	@Override
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
		System.out.println("User Id in add cart item :"+userId);

		Cart cart=cartRepository.findByUserId(userId);
		System.out.println("Cart in add cart item :"+cart);
		Product product=productService.findProductById(req.getProductId());
		
		CartItem isPresent=cartItemService.isCartItemExist(cart, product, req.getSize(),userId);
		
		if(isPresent == null) {
			System.out.println("Is Prsent : "+isPresent);
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setCart(cart);
			cartItem.setQuantity(req.getQuantity());
			cartItem.setUserId(userId);
			
			
			int price= (int) (req.getQuantity()*product.getRentalPrice());


			cartItem.setPrice(price);
			cartItem.setSize(req.getSize());
			
			CartItem createdCartItem=cartItemService.createCartItem(cartItem);
			cart.getCartItems().add(createdCartItem);
		}
		
		
		return "Item Add To Cart";
	}

}
