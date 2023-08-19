import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
