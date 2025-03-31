package com.rpmxh.homeSeeker;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

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

}