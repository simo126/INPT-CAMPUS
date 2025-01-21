package com.inptcampus.backend.Controller;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class HelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, INPTCampus Backend is working lets get started sbetios!";
    }
}
