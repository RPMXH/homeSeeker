package com.rpmxh.homeSeeker;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;

    public List<Listing> getAllListings() {
        return listingRepository.findAll();
    }

    public List<Listing> getListingsByAssessment(char assessment) {
        return listingRepository.findListingsByAssessmentOrderByPriceAsc(assessment);
    }

    public List<Listing> getListingsWithoutAssessment() {
        return listingRepository.findListingsByAssessmentIsNullOrderByPriceAsc();
    }

    public Listing updateEntity(String listingId, Listing updatedEntity) {
        return listingRepository.findById(listingId)
                .map(listing -> listingRepository.save(updatedEntity))
                .orElse(null); // Or throw an exception
    }
}