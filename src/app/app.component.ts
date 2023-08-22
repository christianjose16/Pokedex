import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { LoaderComponent } from './loader/loader.component'
import { DexterService } from './services/dexter.service';
import { PokeitemComponent } from './pokeitem/pokeitem.component';
import { CommonModule } from '@angular/common';
import { Pokemon } from './models/pokeItem';

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
  pokelist: any = [];
  misPokemon: any;
  searchTerm: string = '';
  nombre = "";
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];


  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private dxs: DexterService) {
    this.pokelist = { results: [] }
    this.formularioPerfil = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'pasatiempo': new FormControl('', Validators.required),
      'cumple': new FormControl('', Validators.required),
      'documento': new FormControl('', Validators.required)
    });
    this.formularioPerfil.statusChanges.subscribe((status: string) => {
      this.isFormValid = status === 'VALID';
      this.pasatiempo = this.formularioPerfil.value.pasatiempo;
      this.nombre = this.formularioPerfil.value.nombre;
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
    if (this.countSelectedPokemons() < 3) {
      if (poke.status === 1) {
        this.pokemons = this.pokemons.filter(pokemon => pokemon.number !== poke.number);
        this.filteredPokemons.push({
          name: poke.name,
          image: poke.image,
          number: poke.number,
          status: 0,
        });
      } else {
        this.filteredPokemons = this.filteredPokemons.filter(pokemon => pokemon.number !== poke.number);
        this.pokemons.push({
          name: poke.name,
          image: poke.image,
          number: poke.number,
          status: 1,
        });

      }
      poke.status = poke.status === 0 ? 1 : 0;
    } else {
      if (poke.status === 1) {
        poke.status = 0;
        this.pokemons = this.pokemons.filter(pokemon => pokemon.number !== poke.number);
        this.filteredPokemons.push({
          name: poke.name,
          image: poke.image,
          number: poke.number,
          status: 0,
        });
      }
    }
  }
  filterPokemons() {
    this.filteredPokemons = [];
    if (this.searchTerm.toLowerCase() == "") {
      this.dxs.getPokemons().subscribe(pokelist => {
        this.pokelist = pokelist;
        this.filteredPokemons = [];
        pokelist.results.forEach(element => {
          this.dxs.getPokemon(element.name).subscribe(pokeitem => {
            let newObj: Pokemon = {
              name: pokeitem.name,
              image: pokeitem.sprites.front_default,
              number: pokeitem.id,
              status: 0
            }
            this.filteredPokemons.push(newObj);
            console.log(pokeitem);
          });
        });
      });
    } else {
      this.dxs.getPokemon(this.searchTerm.toLowerCase()).subscribe(pokeitem => {
        let newObj: Pokemon = {
          name: pokeitem.name,
          image: pokeitem.sprites.front_default,
          number: pokeitem.id,
          status: 0
        }
        this.filteredPokemons.push(newObj);
        console.log(pokeitem);
      });
    }
    //this.filteredPokemons = this.pokemons.filter(poke =>
    //  poke.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    //);
  }
  backToone() {
    this.intPaso = 1;
  }
  backTozero() {
    this.intPaso = 0;
  }
  async savePokemons(): Promise<void> {
    this.submittingForm = true;
    this.cdr.detectChanges();

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        this.misPokemon = this.pokemons.filter(pokemon => pokemon.status === 1);
        this.intPaso = 2;
        this.titleStrong = "¡Hola " + this.nombre + "!";
        this.titleLigth = "";
        this.subTitle = "";
        resolve();
      }, 2000);
    });

    this.submittingForm = false;
    this.cdr.detectChanges();
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
          this.filteredPokemons = [];
          pokelist.results.forEach(element => {
            this.dxs.getPokemon(element.name).subscribe(pokeitem => {
              let newObj: Pokemon = {
                name: pokeitem.name,
                image: pokeitem.sprites.front_default,
                number: pokeitem.id,
                status: 0
              }
              this.filteredPokemons.push(newObj);
              console.log(pokeitem);
            });
          });
        });

        resolve();
      }, 2000);
    });

    this.submittingForm = false;
    this.cdr.detectChanges();
  }
}
