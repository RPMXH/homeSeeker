package com.rpmxh.homeSeeker;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingRepository extends JpaRepository<Listing, String> {
    // You can add custom query methods here if needed
    List<Listing> findListingsByAssessmentOrderByPriceAsc(char assessment);
    List<Listing> findListingsByAssessmentIsNullOrderByPriceAsc();
}