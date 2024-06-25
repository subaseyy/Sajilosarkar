package com.sajilosarkar.sajilosarkar.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "issues")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String priority;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private Boolean status;

    @Column(nullable = true)
    private String image;

    @OneToMany(mappedBy = "issue", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IssueReply> replies;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Optional: Utility method to set userId
    public void setUserId(Integer userId) {
        if (this.user == null) {
            this.user = new User();
        }
        this.user.setId(userId);
    }
}
