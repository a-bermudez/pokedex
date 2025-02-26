import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private nextUrl: string;
  constructor() {
    this.nextUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=00&limit=20';
  }
  getPokemons() {
    const url = this.nextUrl;

    if (url) {
      const options = {
        url,
        headers: {},
        params: {},
      };
      return CapacitorHttp.get(options).then(async (res) => {
        let pokeArray: Pokemon[] = [];

        if (res?.data) {
          const result = res.data.results;
          this.nextUrl = res.data.next;

          const promises: Promise<HttpResponse>[] = [];

          for (let index = 0; index < result.length; index++) {
            const pokemon = result[index];
            const urlPokemon = pokemon.url;
            const options = {
              url: urlPokemon,
              headers: {},
              params: {},
            };
            promises.push(CapacitorHttp.get(options));
          }
          await Promise.all(promises).then((ress) => {
            console.log(ress);
            for (const response of ress) {
              const pokemonData = response.data;
              console.log(pokemonData);

              const pokemonObj = new Pokemon();
              pokemonObj.id = pokemonData.order;
              pokemonObj.name = pokemonData.name;
              pokemonObj.type1 = pokemonData.types[0].type.name;
              if (pokemonData.types[1]) {
                pokemonObj.type2 = pokemonData.types[1].type.name;
              }
              pokemonObj.sprite = pokemonData.sprites.front_default;
              pokemonObj.weight = pokemonData.weight / 10;
              pokemonObj.height = pokemonData.height / 10;
              pokemonData.Stat = pokemonData.stats;
              pokemonObj.abilities = pokemonData.abilities
                .filter((skill) => {
                  return !skill.is_hidden;
                })
                .map((ability) => {
                  return ability.ability.name;
                });
              const hiddenAbility = pokemonData.abilities.find((skill) => {
                return skill.is_hidden;
              });
              if (hiddenAbility) {
                pokemonObj.hiddenAbility = hiddenAbility.ability.name;
              }
              pokeArray.push(pokemonObj);
            }
          });
        }
        return pokeArray;
      });
    }
    return null;
  }

  getPokemonDetails(name: string): Promise<HttpResponse> {
    let url: string = `https://pokeapi.co/api/v2/pokemon/${name}/`;

    const options = {
      url,
      header: {},
      params: {},
    };

    return CapacitorHttp.get(options);
  }
}
