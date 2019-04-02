import { Logger } from "./Logger";

export class AbcFormatter{

    private l : Logger;

    constructor(){ this.l = new Logger(); }

    baseMappings = {
        // " ": "",
        // "\\:\\|": ":|\n",
        "&quot;": "\"",
        // "|:": "",
        "!": "!\n",
        "&#039;": "'"
    };

    htmlMappings = {
        "&quot;": "\"",
        "&gt;": ">",
    }

    format(abc, isHtml = false){
        this.l.log("abc formatter recieved abc: " + abc)
        if(isHtml){
            this.l.log("Performing HTML mappings")
            abc = this.replaceValues(abc, this.htmlMappings);
        }
        else{
            //Strip spaces and repeats (|:), count bars
            abc = this.replaceValues(abc, this.baseMappings);
            this.l.log("Using abc str: " + abc)
            for(var i = 1; i < abc.length; i++){
                if(i % Math.round(abc.length / 4) == 0){
                    //abc = abc.substring(0, i) + "\n" + abc.substring(i, abc.length);
                }
            }
        }

        return abc;
    }

    replaceValues(str, dict){
        for(var key in dict){
            this.l.log("key: " + key);
            str = str.replace(new RegExp(key, "g"), dict[key])
        }
        return str;
    }

    replaceValue(str, oldValue, newValue){
        return str.replace(oldValue, newValue);
    }

}