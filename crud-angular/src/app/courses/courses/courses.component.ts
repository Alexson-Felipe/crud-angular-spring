import { CoursesService } from '../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  // courses: Course[] = [];
  displayedColumns = ['name', 'category', 'actions'];

  // coursesService: CoursesService;

  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.coursesService.list().pipe(
      catchError(() => {
        this.onError('Erro ao Carregar cursos.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  public onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route }).then();
  }
}
