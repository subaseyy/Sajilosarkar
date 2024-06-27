package com.sajilosarkar.sajilosarkar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;



@SpringBootApplication
@ComponentScan("com.sajilosarkar.sajilosarkar")
public class SajilosarkarApplication {

    public static void main(String[] args) {
        SpringApplication.run(SajilosarkarApplication.class, args);
    }




}
