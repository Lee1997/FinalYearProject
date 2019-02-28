import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { Logger } from '../../utilities/Logger';

@Injectable()
export class TheSessionService{
    http: any;
    baseUrl: String;
    urlJsonAppender: String;

    private l = new Logger(true);

    constructor(http: Http){
        this.http = http;
        this.baseUrl = 'https://thesession.org/';
        this.urlJsonAppender = '?format=json';
    }

    getItems(scope, itemType){
        var url = this.baseUrl + itemType + '/' + scope + this.urlJsonAppender;
        this.l.log("Getting " + scope + " " + itemType + "  from " + url);
        return this.http.get(url).map(res => res.json());
    }

    getInformation(type, id){
        var url = this.baseUrl + type + "/" + id + this.urlJsonAppender
        var ret = this.http.get(url).map(res => res.json());
        this.l.log("Getting " + type + " informaion for id: " + id);
        return ret;
    }
}