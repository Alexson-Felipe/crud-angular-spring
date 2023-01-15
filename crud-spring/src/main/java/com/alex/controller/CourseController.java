package com.alex.controller;

import com.alex.model.Course;
import com.alex.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;

    @GetMapping
    public List<Course> list() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> findById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(course -> ResponseEntity.ok().body(course))
                .orElse(ResponseEntity.notFound().build());
    }

    //    @RequestMapping(method = RequestMethod.POST)
//    @PostMapping
//    public ResponseEntity<Course> create(@RequestBody Course course) {
//        // return courseRepository.save(course);
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body(courseRepository.save(course));
//    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course create(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    @PutMapping
    public Course edit(@RequestBody Course course) {
        var findCourseEdit = courseRepository.findById(course.getId()).orElse(null);

//        findCourseEdit.
        return null;
    }
}
