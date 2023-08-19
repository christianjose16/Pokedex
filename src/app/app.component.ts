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
  uploadedImage: boolean = false;
  uploadedImageUrl: string = '';
  selectedFile: File | null = null;
  imgContainerStyle: { [key: string]: string } = {};
  svgUserStyle: { [key: string]: string } = {};


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
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const imageUrl = URL.createObjectURL(this.selectedFile);
      this.imgContainerStyle['background-image'] = `url(${imageUrl})`;
      this.imgContainerStyle['background-size'] = `cover`;
      this.svgUserStyle['display'] = `none`;
    }
  }

  uploadImage(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
}
