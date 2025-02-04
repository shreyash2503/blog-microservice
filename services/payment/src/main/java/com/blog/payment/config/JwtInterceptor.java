package com.blog.payment.config;

import java.io.IOException;

import org.springframework.stereotype.Component;


import feign.FeignException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtInterceptor implements Filter {
    private final TokenClient tokenClient;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String authHeader = request.getHeader("Authorization");
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwtToken = authHeader.substring(7);
            try {
                UserValidResponse validResponse = tokenClient.validateToken("Bearer " + jwtToken) .orElseThrow(() -> new RuntimeException("Not a valid token"));
                if (validResponse.isValid()) {
                    request.setAttribute("username", validResponse.getUserId());
                    filterChain.doFilter(request, response);
                } else {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
                }
            } catch (FeignException exp) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token Validation Failed");
            } catch (Exception exp) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, exp.getMessage());
            }

        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization heading is missing or is invalid");
        }
    }
}