package com.azmi.config;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class AppConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/**").authenticated().anyRequest().permitAll())
				.addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
				.csrf(AbstractHttpConfigurer::disable)
				.cors(cors -> cors.configurationSource(new CorsConfigurationSource() {

					@Override
					public CorsConfiguration getCorsConfiguration(@NotNull HttpServletRequest request) {

						CorsConfiguration cfg = new CorsConfiguration();

						cfg.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:4000", "http://localhost:4200"));
						// cfg.setAllowedMethods(Arrays.asList("GET", "POST","DELETE","PUT"));
						cfg.setAllowedMethods(Collections.singletonList("*"));
						cfg.setAllowCredentials(true);
						cfg.setAllowedHeaders(Collections.singletonList("*"));
						cfg.setExposedHeaders(List.of("Authorization"));
						cfg.setMaxAge(3600L);
						return cfg;

					}
				})).httpBasic(SecurityConfigurerAdapter::and).formLogin();

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
