import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { cursos } from '../models/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {


  private listCursos: cursos[] = [
    {
      codigoCurso : 10000,
      nombreCurso: 'Fisica I',
      creditos: 3,
      imagen: 'https://elperuano.pe/fotografia/thumbnail/2020/10/25/000095143M.jpg',
      profesor: 'Jose Ruiz'
    },
    {
      codigoCurso : 10001,
      nombreCurso: 'Quimica',
      creditos: 4,
      imagen: 'https://elperuano.pe/fotografia/thumbnail/2020/10/25/000095143M.jpg',
      profesor: 'Pablo Perez'
    },
    {
      codigoCurso : 10002,
      nombreCurso: 'Algebra',
      creditos: 4,
      imagen: 'https://elperuano.pe/fotografia/thumbnail/2020/10/25/000095143M.jpg',
      profesor: 'Pedro Ruiz'
    },
    {
      codigoCurso : 10003,
      nombreCurso: 'Fisica II',
      creditos: 3,
      imagen: 'https://elperuano.pe/fotografia/thumbnail/2020/10/25/000095143M.jpg',
      profesor: 'Carlos Perez'
    }
  ]

  private listaCursosSubect: BehaviorSubject<cursos[]>;

  constructor() {
    this.listaCursosSubect = new BehaviorSubject<cursos[]>(this.listCursos);
  }

  obtenerListaCursos(): Observable<cursos[]>{
    return this.listaCursosSubect.asObservable();
  }

  obtenerCurso(codigoCurso: number): Observable<cursos[]>{
    return this.obtenerListaCursos().pipe(
      map((cursos: cursos[]) => cursos.filter((curso: cursos) => curso.codigoCurso === codigoCurso))
    )
  }



}
