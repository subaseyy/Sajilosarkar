package com.sajilosarkar.sajilosarkar.config;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
//    private final JwtAuthenticationFilter jwtAuthFilter;
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
//            throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }
//
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring()
//                .requestMatchers("/api/users/login", "/hello", "/api/users/refresh-token", "/api/users/register", "/error");
//    }
//
//    /**
//     * @param http
//     * @returnss
//     * @throws Exception
//     */
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/*").authenticated()) // Ensure all other requests are permitted or properly secured
//                .sessionManagement(management -> management
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//
//}



import com.sajilosarkar.sajilosarkar.service.impl.CustomUserDetailService;
import com.sajilosarkar.sajilosarkar.util.PasswordEncoderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailService customUserDetailService;
    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(customUserDetailService);
        authenticationProvider.setPasswordEncoder(PasswordEncoderUtil.getInstance());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }


    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity httpSecurity)
            throws Exception {
        httpSecurity
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/authenticate")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

}
