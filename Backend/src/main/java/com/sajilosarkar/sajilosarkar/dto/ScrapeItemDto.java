package com.sajilosarkar.sajilosarkar.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScrapeItemDto {
    private long id;
    private String name;
    private String price;
    private String description;
    private String category;

}
