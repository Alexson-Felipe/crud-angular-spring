import { CoursesService } from '../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import {Observable, of} from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../shared/components/error-dialog/error-dialog.component";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  // courses: Course[] = [];
  displayedColumns = ['name','category'];

  // coursesService: CoursesService;

  constructor(public dialog: MatDialog, private coursesService: CoursesService) {
    // this.courses = [];
    // this.coursesService = new CoursesService();
    this.courses$ = this.coursesService.list().pipe(error => {
      this.onError('Erro ao Carregar cursos.');
      return of([])
    });

    // this.coursesService.list().subscribe(courses => this.courses = courses);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

}
