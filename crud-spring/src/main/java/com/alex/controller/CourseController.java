package com.alex.controller;

import com.alex.model.Course;
import com.alex.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
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
    public ResponseEntity<Course> findById(@PathVariable @NotNull @Positive Long id) {
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
    public Course create(@RequestBody @Valid Course course) {
        return courseRepository.save(course);
    }

    @PutMapping("/{id}")
    @ResponseStatus
    public ResponseEntity<Course> update(@PathVariable Long id, @RequestBody @Valid @NotNull @Positive  Course course) {
        return courseRepository.findById(id).map(cursoEncontrado -> {
            cursoEncontrado.setName(course.getName());
            cursoEncontrado.setCategory(course.getCategory());
            Course updated = courseRepository.save(cursoEncontrado);
            return ResponseEntity.ok().body(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable @NotNull @Positive Long id) {
        return courseRepository.findById(id).map(course -> {
            courseRepository.deleteById(id);
            return ResponseEntity.noContent().<Void>build();
        }).orElse(ResponseEntity.notFound().build());

    }
}
