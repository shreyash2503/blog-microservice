package com.blog.authentication.config;

import com.blog.authentication.user.Permission;
import com.blog.authentication.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
/*
Sequence of execution
Request → JwtAuthenticationFilter → UsernamePasswordAuthenticationFilter → AuthorizationFilter (request matchers) → Controller
*/

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean

    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/**")
                        .permitAll()
                        .requestMatchers("/api/v1/management/**").hasAnyRole(Role.ADMIN.name(), Role.MANAGER.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/management/**").hasAnyAuthority(Permission.ADMIN_READ.name(), Permission.MANAGER_READ.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/management/**").hasAnyAuthority(Permission.ADMIN_CREATE.name(), Permission.MANAGER_CREATE.name())
                        .requestMatchers(HttpMethod.PUT, "api/v1/management/**").hasAnyAuthority(Permission.ADMIN_UPDATE.name(), Permission.MANAGER_UPDATE.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/management/**").hasAnyAuthority(Permission.ADMIN_DELETE.name(), Permission.MANAGER_DELETE.name())
                        .anyRequest()
                        .authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                /*
                If your JwtAuthenticationFilter successfully authenticates the request
                 by validating the JWT and setting the Authentication in the SecurityContext, the subsequent filters
                 (like UsernamePasswordAuthenticationFilter) will skip their authentication logic because the
                 user is already authenticated.
                 */
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();


    }

}
