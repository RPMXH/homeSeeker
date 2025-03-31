package com.rpmxh.homeSeeker;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "listings")
public class Listing {

    @Id
    private String listingId;

    private char assessment;
    private String notes;
    private Double price;
    private String listingLink;
    private String source;
}