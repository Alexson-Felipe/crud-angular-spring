package com.alex;

import com.alex.model.Course;
import com.alex.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CrudSpringApplication {


    public static void main(String[] args) {
        SpringApplication.run(CrudSpringApplication.class, args);
    }

    @Bean
    CommandLineRunner initDataBase(CourseRepository courseRepository) {
        return args -> {
            courseRepository.deleteAll();
            var curso = Course.builder().name("Angular").category("Front-end").build();

            courseRepository.save(curso);
        };
    }
}
