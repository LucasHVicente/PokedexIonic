import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  offset = 0;
  pokemon = [];
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(private pokeService: PokemonService) {}

  ngOnInit(){
    this.loadPokemon();
  }

  goToLink(url: string){
    window.open(url, "_blank");
}

  onSearchChange(e){
    let value = e.detail.value;
    if(value==''){
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.pokeService.searchPokemon(value).subscribe(res=>{
      this.pokemon = [res];
      console.log(this.pokemon)
    }, err =>{
      this.pokemon = [];
    })

  }

  loadPokemon(loadMore=false, event?){
    if(loadMore){
      this.offset+=25;
    }

    this.pokeService.getPokemonList(this.offset).subscribe(res=>{
      console.log('results: ', res);
      this.pokemon = [...this.pokemon, ...res];
      
      if(event){
        event.target.complete();
      }
      if(this.offset == 125){
        this.infinite.disabled = true;
      }
    })
  }

}
