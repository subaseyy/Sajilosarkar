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
    private Integer userId;


    // public Integer getId() {
    //     return id;
    // }

    // public void setId(Integer id) {
    //     this.id = id;
    // }   

    // public String getTitle() {
    //     return title;
    // }

    // public void setTitle(String title) {
    //     this.title = title;
    // }

    // public String getCategory() {
    //     return category;
    // }

    // public void setCategory(String category) {
    //     this.category = category;
    // }

    // public String getLocation() {
    //     return location;
    // }

    // public void setLocation(String location) {
    //     this.location = location;
    // }

    // public String getDescription() {
    //     return description;
    // }

    // public void setDescription(String description) {
    //     this.description = description;
    // }

    // public String getPriority() {
    //     return priority;
    // }

    // public void setPriority(String priority) {
    //     this.priority = priority;
    // }

    // public Boolean getStatus() {
    //     return status;
    // }

    // public void setStatus(Boolean status) {
    //     this.status = status;
    // }

    // public String getImage() {
    //     return image;
    // }

    // public void setImage(String image) {
    //     this.image = image;
    // }
    
    
}
