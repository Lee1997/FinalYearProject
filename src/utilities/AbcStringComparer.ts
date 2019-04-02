import { Logger } from "./Logger";

export class AbcStringComparer{
    private l : Logger;

    constructor(){
        this.l = new Logger();
    }

    compareAbcStrings(abc1, abc2) {
        var longer = abc1;
        var shorter = abc2;
        if (abc1.length < abc2.length) {
          longer = abc2;
          shorter = abc1;
        }
        var longerLength = longer.length;
        if (longerLength === 0) {
          return 1.0;
        }
        return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
      }

      editDistance(abc1, abc2) {
        abc1 = abc1.toLowerCase();
        abc2 = abc2.toLowerCase();
      
        var costs = new Array();
        for (var i = 0; i <= abc1.length; i++) {
          var lastValue = i;
          for (var j = 0; j <= abc2.length; j++) {
            if (i == 0)
              costs[j] = j;
            else {
              if (j > 0) {
                var adjustedNote = costs[j - 1];
                if (abc1.charAt(i - 1) != abc2.charAt(j - 1))
                  adjustedNote = Math.min(Math.min(adjustedNote, lastValue),
                    costs[j]) + 1;
                costs[j - 1] = lastValue;
                lastValue = adjustedNote;
              }
            }
          }
          if (i > 0)
            costs[abc2.length] = lastValue;
        }
        return costs[abc2.length];
      }
}