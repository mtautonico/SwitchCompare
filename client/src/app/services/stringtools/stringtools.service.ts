import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringtoolsService {
  // @ts-ignore
  CapEachWord(str: string): string {
    if (str !== null) {
      const words = str.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
      return words.join(" ");
    } else {
      return "";
    }
  }
}
