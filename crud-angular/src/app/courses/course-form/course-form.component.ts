import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.courseService.save(this.form.value).subscribe(
      (result) => console.log(result),
      () => this.onError()
    );
  }

  onCancel(): void {
    this.router.navigate(['']);
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso!', '', {
      duration: 1000,
    });
  }
}
