import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { LoaderComponent } from './loader/loader.component'
import { DexterService } from './services/dexter.service';
import { PokeitemComponent } from './pokeitem/pokeitem.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formularioPerfil: FormGroup;
  uploadedImage: boolean = false;
  uploadedImageUrl: string = '';
  selectedFile: File | null = null;
  imgContainerStyle: { [key: string]: string } = {};
  svgUserStyle: { [key: string]: string } = {};
  uploadPhotoText = "Adjunta una foto";
  imgButtonPath = "../assets/cloud.svg";
  documentoMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
  documentoLabel = "Documento*";
  isFormValid: boolean = false;
  submittingForm = false;
  titleStrong = "¡Hola!";
  titleLigth = "Configuremos tu perfil";
  subTitle = "Queremos conocerte mejor.";
  intPaso = 0;
  titleCard = "Imágen perfil";
  pasatiempo = "";
  edad = ""
  dni = ""
  mayoredad = true;
  pokelist: any;
  pokemons=[
    {
      name :"Bulbasur",
      number:1,
      image:"../assets/001.png",
      status:0
    },{
      name :"Ivysaur",
      number:2,
      image:"../assets/002.png",
      status:0
    },{
      name :"Venusaur",
      number:3,
      image:"../assets/003.png",
      status:0
    },{
      name :"Charman",
      number:4,
      image:"../assets/004.png",
      status:0
    },{
      name :"Charmele",
      number:5,
      image:"../assets/005.png",
      status:0
    },{
      name :"Charizar",
      number:6,
      image:"../assets/006.png",
      status:0
    },{
      name :"Squirtle",
      number:7,
      image:"../assets/007.png",
      status:0
    },{
      name :"Wartortle",
      number:8,
      image:"../assets/008.png",
      status:0
    },{
      name :"Blastoise",
      number:9,
      image:"../assets/009.png",
      status:0
    }

  ]

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private dxs: DexterService) {
    this.pokelist={results:[]} 
    this.formularioPerfil = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'pasatiempo': new FormControl('', Validators.required),
      'cumple': new FormControl('', Validators.required),
      'documento': new FormControl('', Validators.required)
    });
    this.formularioPerfil.statusChanges.subscribe((status: string) => {
      this.isFormValid = status === 'VALID';
      this.pasatiempo = this.formularioPerfil.value.pasatiempo;
    });
    this.formularioPerfil.get('cumple')?.valueChanges.subscribe((date: Date) => {
      const today = new Date();
      const birthDate = new Date(date);
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18) {
        this.mayoredad = false;
        this.documentoLabel = "Carnet de Minoridad"
        this.formularioPerfil.get('documento')?.clearValidators();
        this.formularioPerfil.get('documento')?.updateValueAndValidity();
      } else {
        this.mayoredad = true;
        this.documentoLabel = "Documento*";
        this.formularioPerfil.get('documento')?.setValidators([Validators.required]);
        this.formularioPerfil.get('documento')?.updateValueAndValidity();
      }
    });
  }
  ngOnInit() {

  }
  toggleStatus(poke: any): void {
    if(this.countSelectedPokemons() <3){
      poke.status = poke.status === 0 ? 1 : 0; 
    }else{
      if(poke.status === 1){
        poke.status = 0;
      }
    }
  }
  countSelectedPokemons(): number {
    return this.pokemons.filter(poke => poke.status === 1).length;
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const imageUrl = URL.createObjectURL(this.selectedFile);
      this.imgContainerStyle['background-image'] = `url(${imageUrl})`;
      this.imgContainerStyle['background-size'] = `cover`;
      this.svgUserStyle['display'] = `none`;
      this.imgButtonPath = "../assets/trash.svg";
      this.uploadPhotoText = this.selectedFile.name;
    }
  }

  uploadImage(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  async onSubmit(): Promise<void> {
    this.submittingForm = true;
    this.cdr.detectChanges();

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        this.titleLigth = "";
        this.titleStrong = "¡Ya casi términamos!";
        this.subTitle = "Revisa la información, y completa lo solicitado.";
        this.intPaso = 1;
        this.titleCard = this.formularioPerfil.value.nombre;
        this.dni = this.formularioPerfil.value.documento;
        const cumpleDate = new Date(this.formularioPerfil.value.cumple);
        const hoyDate = new Date();
        const millisegundos = hoyDate.getTime() - cumpleDate.getTime();
        const edadAnios = Math.floor(millisegundos / (365 * 24 * 60 * 60 * 1000));
        this.edad = `${edadAnios} años`;
        this.dxs.getPokemons().subscribe(pokelist => {
          this.pokelist = pokelist;
          console.log(pokelist)
        });

        resolve();
      }, 2000);
    });

    this.submittingForm = false;
    this.cdr.detectChanges();
  }
}
