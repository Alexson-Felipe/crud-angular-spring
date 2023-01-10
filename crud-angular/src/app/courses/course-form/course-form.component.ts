import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private courseService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.courseService.save(this.form.value).subscribe(
      (result) => this.onSave(),
      () => this.onError()
    );
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
