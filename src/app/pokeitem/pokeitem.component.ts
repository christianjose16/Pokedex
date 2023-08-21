import { Component, Input } from '@angular/core';
import { DexterService } from '../services/dexter.service';

@Component({
  selector: 'app-pokeitem',
  templateUrl: './pokeitem.component.html',
  styleUrls: ['./pokeitem.component.css']
})
export class PokeitemComponent {
  @Input() name: string;
  pokeitem:any;
  photoSrc="";
  constructor(private dxs: DexterService){
    this.name = ""
    this.pokeitem = {}
  }
  ngOnInit(){
    this.dxs.getPokemon(this.name).subscribe(pokelist => {
      this.pokeitem = pokelist;
      this.photoSrc = this.pokeitem.sprites.front_default
      console.log(pokelist)
    });
  }
}
