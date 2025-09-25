package com.inptcampus.backend.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/auth/register").permitAll()
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                        .requestMatchers("/api/filieres").permitAll()
                        // STUDENT only
                        .requestMatchers("/api/students/reserve").hasRole("STUDENT")
                        .requestMatchers("/api/students/unreserve").hasRole("STUDENT")
                        .requestMatchers("/api/students/unreserve").hasRole("STUDENT")
                        .requestMatchers("/api/rooms/available").hasRole("STUDENT")
                        .requestMatchers("/api/issues/my").hasRole("STUDENT")
                        //  ADMIN
                        .requestMatchers(
                                "/api/rooms/**",
                                "/api/issues",
                                "/api/issues/unresolved",
                                "/api/students/**",
                                "/api/rooms/**",
                                "/api/filieres/**",
                                "/api/buildings/**",
                                "/api/issues/**",
                                "/api/admin"
                        ).hasRole("ADMIN")

                        // Deny everything else
                        .anyRequest().denyAll()
                );

        // JWT filter before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
