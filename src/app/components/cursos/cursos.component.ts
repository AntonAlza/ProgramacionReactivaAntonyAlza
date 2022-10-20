import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { cursos } from 'src/app/models/cursos';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit, OnDestroy {

  listaCursos$!: Observable<cursos[]>
  formularioEditar!: FormGroup;
  suscripcion: any;
  
  constructor(private cursosService: CursosService) {
    this.formularioEditar = new FormGroup({
      codigoCurso: new FormControl(),
      nombreCurso: new FormControl(),
      creditos: new FormControl(),
      profesor: new FormControl()
    });
   }

  ngOnInit(): void {
    this.listaCursos$ = this.cursosService.obtenerListaCursos();
  }

  editarCurso(id: number){
    this.suscripcion = this.cursosService.obtenerCurso(id).subscribe(
      (lista :cursos[]) => {
        let cursoModificar = lista[0];
        this.formularioEditar = new FormGroup({
          codigoCurso: new FormControl(cursoModificar.codigoCurso),
          nombreCurso: new FormControl(cursoModificar.nombreCurso),
          creditos: new FormControl(cursoModificar.creditos),
          profesor: new FormControl(cursoModificar.profesor)
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });    
  }

  ngOnDestroy(): void{
    this.suscripcion.unsubscribe();
  }

}
