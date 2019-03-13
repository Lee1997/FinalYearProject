import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { Logger } from '../../utilities/Logger';
import { StringFormatter } from '../../utilities/StringFormatter';

@Injectable()
export class TheSessionService{
    http: any;
    baseUrl: String;
    urlJsonAppender: String;

    private l = new Logger(true);
    private strFormatter = new StringFormatter();

    constructor(http: Http){
        this.http = http;
        this.baseUrl = 'https://thesession.org/';
        this.urlJsonAppender = '?format=json';
    }

    getItems(scope, itemType){
        var url = this.baseUrl 
                + itemType + '/' + scope 
                + this.urlJsonAppender;

        var ret = this.get(url);
        this.l.log("Getting " + scope + " " + itemType + "  from " + url);
        return ret;
    }

    get(url){
        return this.http.get(url).map(res => res.json());
    }

    getInformation(type, id){
        var url = this.baseUrl 
                + type + "/" + id  
                + this.urlJsonAppender;

        var ret = this.get(url);
        this.l.log("Retrieved " + type + " informaion for id: " + id);
        return ret;
    }

    getTunebookInformation(memberId){
        var url = this.baseUrl 
                + 'members/' + memberId + '/tunebook' 
                + this.urlJsonAppender;

        var ret = this.get(url);
        this.l.log("Retrieved tunebook for member id: " + memberId);
        return ret; 
    }

    getTuneRecordings(tuneId){
        var url = this.baseUrl 
                + 'tunes/' + tuneId + '/recordings' 
                + this.urlJsonAppender;
                
        var ret = this.get(url);
        this.l.log("Retrieved tune recordings for tune id: " + tuneId);
        return ret;
    }

    getTuneRecording(tuneId, recordingId){
        var url = this.baseUrl
                + 'tunes/' + tuneId + '/recordings/' + recordingId
                + this.urlJsonAppender;

        var ret = this.get(url);
        this.l.log("Retrieved recorded_with tune id:" + tuneId + " & recording id: " + recordingId);
        return ret;
    }

    getMemberInformation(type, memberId){
        var url = this.baseUrl
                + 'members/' + memberId + '/' + type
                + this.urlJsonAppender;
        var ret = this.get(url);
        this.l.log("Retrieved member tunes for member id: " + memberId);
        return ret;
    }

    search(query, type, page){
        var url = this.baseUrl
                + type + '/search?q=' + query
                + '&page=' + page
                + '&format=json';
        var ret = this.get(url);
        
        return ret;
    }
    
}