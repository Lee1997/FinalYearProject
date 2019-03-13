import { Logger } from "./Logger";
import { formControlBinding } from "@angular/forms/src/directives/reactive_directives/form_control_directive";

export class StringFormatter{
    private isDebug : Boolean;
    private l : Logger = new Logger();
    constructor(){}

    baseMappings = {
        "&#039;": "\'",
        "&#8217;": "\’",
        "&amp;": "&",
        "&quot;": "\""
    }

    telephoneMapping = {
        "^": "tel:",
        " ": "%"
    }

    format(str){
        
        this.l.log("String formatter recieved string: " + str)

        for(var mapping in this.baseMappings){
            str = this.replaceValues(str, this.baseMappings);
        }     

        this.l.log("String formatter returning string: " + str)
        return str;
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

    formatTuneSettings(settings){
        for(var i = 0; i < settings.length; i++){
            settings[i].tune.name = this.format(settings[i].tune.name);
        }
        return settings;
    }

    formatPopularTunes(tunes){
        for(var i = 0; i < tunes.length; i++){
            tunes[i].name = this.format(tunes[i].name);
        }
        return tunes;
    }

    formatTuneSets(sets){
        for(var i = 0; i < sets.length; i++){
            var set = sets[i];
            this.l.log("Formatting Tunes" + JSON.stringify(set));

            set.name = this.format(set.name);

        }
        return sets;
    }

    cleanComments(comments: any){
        for(var i = 0; i < comments.length; i++){
            this.l.log(JSON.stringify(comments[i]));
            comments[i].subject = this.format(comments[i].subject);
            comments[i].content = this.format(comments[i].content);
            comments[i].member.name = this.format(comments[i].member.name);
        }
        return comments;
    }

    formatTracks(tracks){
        this.l.log("Formatting tracks " + JSON.stringify(tracks));

        for(var i = 0; i < tracks.length; i++){
            var tunes = tracks[i].tunes;

            for(var j = 0; j < tunes.length; j++){
                tunes[j].name = this.format(tunes[j].name);
            }
        }

        return tracks;       
    }

    formatRecordings(recordings){
        this.l.log("Formatting recordings " + JSON.stringify(recordings));

        for(var i = 0; i < recordings.length; i++){
            var recording = recordings[i];
            recording.name = this.format(recording.name);
        }

        return recordings;
    }

    formatSessions(sessions){
        this.l.log("Formatting sessions: " + JSON.stringify(sessions));
        for(var i = 0; i < sessions.length; i++){
            var session = sessions[i];
            session.venue.name = this.format(session.venue.name);
        }

        return sessions;
    }

    formatSession(session){
        session.venue.name = this.format(session.venue.name);

        return session;
    }

    formatSessionLocation(res){
        var ret = res.town.name + ", ";
        ret += res.area.name + ", ";
        ret += res.country.name;
        this.l.log("Formatted location to: " + ret);    
        return ret;
    }

    formatComments(comments: any){
        for(var i = 0; i < comments.length; i++){
            var comment = comments[i];
            comment.subject = this.format(comment.subject);
            comment.content = this.format(comment.content);
        }

        return comments;
    }

    formatTelephoneLink(number){
        if(number == "")
            return number;

        number = this.replaceValues(number, this.telephoneMapping);

        return number;

    }

    formatEvent(event){
        event.name = this.format(event.name);
        return event;
    }

    

    formatEventAddress(event){
        var address = event.venue.name + "\n";
        address += event.town.name + "\n";
        address += event.area.name + "\n";
        address += event.country.name;

        return address;
    }

    formatSettingPercentage(percent, leftIndex, rightIndex){
        return "'Setting " + leftIndex 
            + "' is " + percent + "% identical to 'Setting "
            + rightIndex + "'";
    }

    formatNames(list){
        for(var i = 0; i < list.length; i++){
            list[i].name = this.format(list[i].name);
        }
        return list;
    }
}