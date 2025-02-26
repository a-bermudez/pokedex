import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: false,
})
export class ListPokemonsPage implements OnInit {
  pokemons: Pokemon[] = [];
  //Pongo este asi para probar inject
  private loadingController = inject(LoadingController);
  private router= inject(Router)
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.morePokemon();
  }

  async morePokemon($event?) {
    const promise = this.pokemonService.getPokemons();
    let loading = null;
    if (!$event) {
      loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present()
    }
    if (promise) {
      promise
        .then((result: Pokemon[]) => {
          console.log(result);
          this.pokemons = this.pokemons.concat(result);
          console.log(this.pokemons);

          if ($event) {
            $event.target.complete();
          }

          if(loading){
            loading.dismiss()
          }
        })
        .catch((err) => {
          console.error(err);
          
          if ($event) {
            $event.target.complete();
          }
          if (loading) {
            loading.dismiss();
          }
        });
    }
  }

  goToDetails(pokemonName:string):void {
    console.log(pokemonName);
    
    this.router.navigate(['/pokemon-details', pokemonName]);
  }
}
