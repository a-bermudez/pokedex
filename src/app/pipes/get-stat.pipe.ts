import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Pipe({
  name: 'getStat',
  standalone: false,
})
export class GetStatPipe implements PipeTransform {
  transform(value: Pokemon, nameStat: string): number {
    const statFound = value.stats.find((stat) => {
      return stat.stat.name === nameStat;
    });
    if(statFound) {
      return statFound.base_stat;
    }
    return 0;
  }
}
