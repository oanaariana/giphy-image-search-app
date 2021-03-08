declare var require: any;
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obscenity'
})
export class ObscenityPipe implements PipeTransform {
  public readonly obscenities = require('badwords-list');

  transform(value: any, ...args: any[]): any {
    let newVal: string = value;
    let grawlix: string = '@#$%&!';

    this.obscenities.array.forEach(curse => {
      console.log(curse, 'curse')
      newVal = newVal ? newVal.replace(curse, grawlix) : newVal;
    });

    return newVal;
  }

}

export { } // this will make it module

declare global { // this is important to access it as global type String

    interface String {
        replaceAll(target: string, replace: string, ignore?: boolean): string;
    }

}

String.prototype.replaceAll = function (str1: string, str2: string, ignore: boolean = false) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}