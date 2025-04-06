package com.rpmxh.homeSeeker;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // Mark this as a configuration class
@EnableJpaRepositories
public class HomeSeekerConfig {

    @Bean
    public ListingService listingService(ListingRepository listingRepository) {
        System.out.println("listingService");
        return new ListingService(listingRepository);
    }

    @Bean
    public ListingController listingController(ListingService listingService) {
        System.out.println("listingController");
        return new ListingController(listingService);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Apply CORS configuration to your API paths
                        // Add the specific origins (frontend URLs) allowed to connect
                        .allowedOrigins(
                                "http://localhost:3000", // Example: React default port
                                "http://localhost:4200", // Example: Angular default port
                                "http://localhost:8081", // Example: Another possible frontend port
                                "http://localhost:5173"  // Example: Vite default port
                                // Add any other localhost ports your frontend might run on
                        )
                        // Specify allowed HTTP methods
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH")
                        // Allow all headers (you might want to restrict this in production)
                        .allowedHeaders("*")
                        // IMPORTANT: Allow credentials (cookies, authorization headers) if needed
                        // If true, allowedOrigins cannot be "*"
                        .allowCredentials(true)
                        // How long the result of a preflight request (OPTIONS) can be cached (in seconds)
                        .maxAge(3600);
            }
        };
    }

}