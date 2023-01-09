package com.alex.controller;

import com.alex.model.Course;
import com.alex.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;

    @GetMapping
    public List<Course> list(){
        return courseRepository.findAll();
    }

//    @PostMapping
//    public Course save(@RequestBody Course course){
//        return courseRepository.save(course);
//    }
}
