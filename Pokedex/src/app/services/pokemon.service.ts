import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  
  constructor(private http: HttpClient) { }

  getPokemonList(offset = 0){
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`).pipe(
      map(result =>{
        return result['results'];
      }),
      map(pokemons=>{
        return pokemons.map((poke, index)=>{
          poke.image = this.getPokemonImage(index+offset+1);
          poke.pokeIndex = index+offset+1;
          return poke;
        });
      })
    );
  }
  getPokemonImage(index){
    return `${this.imageUrl}${index}.png`;

  }
  searchPokemon(pokeName){
    return this.http.get(`${this.baseUrl}/pokemon/${pokeName}`).pipe(
      map(pokemon=>{
        pokemon['image'] = this.getPokemonImage(pokemon['id']);
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon
      })
    )

  }

  getPokeDetails(index){
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map(poke =>{
        let sprites = Object.keys(poke['sprites']);
        poke['images']= sprites
          .map(spriteKey=> poke['sprites'][spriteKey])
          .filter(img=>img);
        return poke;
      })
    )

  }
}
