package com.rpmxh.homeSeeker;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @GetMapping("/all")
    public ResponseEntity<List<Listing>> getAllListings() {
        return new ResponseEntity<>(
                listingService.getAllListings(),
                HttpStatus.OK
        );
    }

    @GetMapping("/unassessed")
    public ResponseEntity<List<Listing>> getUnassessedListings() {
        return new ResponseEntity<>(
                listingService.getListingsWithoutAssessment(),
                HttpStatus.OK
        );
    }

    @GetMapping("/{assessment}")
    public ResponseEntity<List<Listing>> getListingsByAssessment(@PathVariable char assessment) {
        return new ResponseEntity<>(
                listingService.getListingsByAssessment(assessment),
                HttpStatus.OK
        );
    }

    @PutMapping("/{listingId}")
    public ResponseEntity<Listing> updateEntity(@PathVariable String listingId, @RequestBody Listing updatedEntity) {
        Listing updated = listingService.updateEntity(listingId, updatedEntity);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}