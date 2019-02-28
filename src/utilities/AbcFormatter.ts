export class AbcFormatter{

    constructor(){}

    baseMappings = {
        ":|": ":|\n",
        "&quot;": "\"",
    };

    htmlMappings = {
        "&quot;": "\"",
        "&gt;": ">",
        "!": "  "
    }

    format(abc, isHtml = false){

        if(isHtml){
            console.log("Performing HTML mappings")
            abc = this.replaceValues(abc, this.htmlMappings);
        }
        else{
            for(var i = 1; i < abc.length; i++){
                if(i % 64 == 0){
                    abc = abc.substring(0, i) + "\n" + abc.substring(i, abc.length);
                }
            }
        }

        return abc;
    }

    replaceValues(str, dict){
        for(var key in dict){
            str = str.replace(new RegExp(key, "g"), dict[key])
        }
        return str;
    }

    replaceValue(str, oldValue, newValue){
        return str.replace(oldValue, newValue);
    }

}