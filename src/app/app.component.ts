import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  formularioPerfil: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formularioPerfil = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'pasatiempo': new FormControl('',Validators.required),
      'cumple': new FormControl('',Validators.required),
      'documento': new FormControl('',Validators.required)
    });
  }
  ngOnInit() {

  }
}
