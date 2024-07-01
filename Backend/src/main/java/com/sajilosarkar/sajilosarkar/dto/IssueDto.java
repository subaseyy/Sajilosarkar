package com.sajilosarkar.sajilosarkar.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class IssueDto {
    private Integer id;
    private String title;
    private String category;
    private String location;
    private String description;
    private String priority;
    private Boolean status;
    private MultipartFile image;
    private String getImage;
    private Long userId;
}
