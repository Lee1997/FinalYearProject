import { Injectable, Component } from '@angular/core'

@Injectable()
export class ILogger{
    public isDebug:boolean = false;
}

@Component({
    providers: [[ILogger]]
})
export class Logger extends ILogger{
    public isDebug : boolean;
    constructor(_isDebug = false){
        /* 
            When calling on this constructor in a file
            pass in True as an argument to turn on all 
            logging from that file
        */
        super();
        this.isDebug = _isDebug;
    }

    log(message){
        if(this.isDebug)
            console.log(message);
    }
    
    logError(message, error){
        if(this.isDebug)
            console.error(message, error);
    }
}