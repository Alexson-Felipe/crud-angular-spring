package com.alex.service;

import com.alex.model.Course;
import com.alex.repository.CourseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

@Validated
@Service
public class CourseService {
    private final CourseRepository courseRepository;
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> list() {
        return courseRepository.findAll();
    }

    public Optional<Course> findById(@NotNull @Positive Long id) {
        return courseRepository.findById(id);
    }

    public Course create(@Valid Course course) {
        return courseRepository.save(course);
    }

    public Optional<Course> update(@NotNull @Positive Long id, @Valid Course course) {
        return courseRepository.findById(id).map(cursoEncontrado -> {
            cursoEncontrado.setName(course.getName());
            cursoEncontrado.setCategory(course.getCategory());
            return courseRepository.save(cursoEncontrado);
        });
    }

    public boolean remove(@NotNull @Positive Long id) {
        return courseRepository.findById(id).map(course -> {
            courseRepository.deleteById(id);
            return true;
        }).orElse(false);

    }
}
