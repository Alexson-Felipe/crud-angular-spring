import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form.value.name = 'null';
  }


  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({ _id: course._id, name: course.name, category: course.category });
  }

  onSubmit() {
    this.courseService.save(this.form.value).subscribe({
      next: () => this.onSave(),
      error: () => {
        this.onError();
      },
    });
  }

  onCancel(): void {
    this.location.back();
  }

  private onSave() {
    this.snackBar
      .open('Curso salvo', '', {
        duration: 4000,
      })
      .afterOpened()
      .subscribe(() => this.onCancel());
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso!', '', {
      duration: 1000,
    });
  }
}
