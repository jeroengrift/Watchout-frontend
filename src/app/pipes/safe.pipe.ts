import { Pipe, PipeTransform, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

//Create a fucking dynamic iframe url
constructor(private sanitizer: DomSanitizer){}

  transform(value: any, args?: any): any {
    if(value){
      return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
    return null;
  }

}
