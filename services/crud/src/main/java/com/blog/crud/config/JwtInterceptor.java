package com.blog.crud.config;

import feign.FeignException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class JwtInterceptor implements Filter {
    private final TokenClient tokenClient;
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
        String authHeader = httpRequest.getHeader("Authorization");
        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwtToken = authHeader.substring(7);
            try {
                var response = tokenClient.validateToken("Bearer " + jwtToken).orElseThrow(() -> new RuntimeException("User not found"));
                if(response.isValid()) {
                    httpRequest.setAttribute("username", response.getUserId());
                    filterChain.doFilter(servletRequest, servletResponse);
                } else {
                    httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
                }

            } catch (FeignException exp) {
                httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token validation failed");
            } catch (Exception e) {
                httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
            }
        } else {
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, " Authorization header is missing or invalid");
        }





    }
}
