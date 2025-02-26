import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';

import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: false,
})
export class PokemonDetailsPage implements OnInit {
  private pokemonService = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  pokemonId!: string;
  pokemonDetails!: Pokemon;
  constructor() {}

  ngOnInit(): void {
    this.pokemonId = this.activatedRoute.snapshot.paramMap.get('pokemonName');
    this.getPokemon();
  }

  async getPokemon() {
    await this.pokemonService
      .getPokemonDetails(this.pokemonId)
      .then((response) => {
        console.log(response.data);
        if (response?.data) {
          this.pokemonDetails = {
            ...response.data,
            sprite: response.data.sprites.front_default,
            type1: response.data.types[0].type.name,
            type2: response?.data?.types[1]?.type?.name,
            abilities: response.data.abilities
              .filter((skill) => {
                return !skill.is_hidden;
              })
              .map((ability) => {
                return ability.ability.name;
              }),
            hiddenAbility: response.data.abilities.find((skill) => {
              return skill.is_hidden;
            }).ability.name,
          };
          console.log(this.pokemonDetails);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/list-pokemons']);
  }
}
