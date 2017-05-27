import { Component } from '@angular/core';

export class Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
}

export class Reason {
  id: string;
  description: string;
  appliesToUser: boolean;
  tags: string[];
}

const RELATIONSHIPREASONS: Reason[] = [
{id:'liveNearby', description:'I currently live nearby', appliesToUser:false, tags:[]},
{id:'wantLiveNearby', description:'I would like to live nearby', appliesToUser:false, tags:[]},
{id:'workNearby', description:'I work nearby', appliesToUser:false, tags:[]},
{id:'grewUpNearby', description:'I grew up nearby', appliesToUser:false, tags:[]},
{id:'friendsNearby', description:'I have friends that live nearby', appliesToUser:false, tags:[]},
{id:'familyNearby', description:'I have family that live nearby', appliesToUser:false, tags:[]}
];

const SUPPORTREASONS: Reason[] = [
{id:'stayInArea', description:'I want to stay in the neighbourhood', appliesToUser:false, tags:[]},
{id:'moveToArea', description:'I want to move to this neighbourhood', appliesToUser:false, tags:[]},
{id:'rentalSupport', description:'I want more rental homes in Vancouver', appliesToUser:false, tags:['RENTAL']},
{id:'friendsFamilySupport', description:'I want my friends and family to be able to live in this neighbourhood', appliesToUser:false, tags:[]},
{id:'vibrantSupport', description:'This project will make the neighbourhood more vibrant', appliesToUser:false, tags:[]},
{id:'retailSupport', description:'I want more shops in the neighbourhood', appliesToUser:false, tags:[]},
{id:'centralSupport', description:'I want more homes in central, walkable neighbourhoods', appliesToUser:false, tags:[]},
{id:'transitSupport', description:'I want more homes with good access to transit', appliesToUser:false, tags:[]},
];

const IMPROVEREASONS: Reason[] = [
{id:'moreHomes', description:'The project could have more homes', appliesToUser:false, tags:[]},
{id:'moreFamilyHomes', description:'The project could have more family-friendly homes', appliesToUser:false, tags:[]},
{id:'noRezoning', description:'The project should have been allowed without a rezoning', appliesToUser:false, tags:[]},
{id:'', description:'', appliesToUser:false, tags:[]},
{id:'', description:'', appliesToUser:false, tags:[]},
];

const PROJECTS: Project[] = [
  { id: 15, name: '228 E 7th Ave' , description: 'Great project. Much housing', tags:['RENTAL']},
  { id: 17, name: 'Dynama'  , description: 'Great project. ', tags:[]},
  { id: 18, name: 'Dr IQ'   , description: 'Great project. ', tags:[]},
  { id: 19, name: 'Magma'   , description: 'Great project. ', tags:[]},
  { id: 20, name: 'Tornado' , description: 'Great project. ', tags:[]}
];

@Component({
  selector: 'app-root',
  templateUrl: './letter-builder.component.html'
})
export class LetterBuilderComponent {
  title = 'AHV Letter Builder';
  project = PROJECTS.filter(function(p) { return p.id === 15; })[0];//todo: get project ID from URL or something

  relationshipReasons = this.getApplicableReasonsForProject(this.project, RELATIONSHIPREASONS);
  supportReasons = this.getApplicableReasonsForProject(this.project, SUPPORTREASONS);
  improveReasons = this.getApplicableReasonsForProject(this.project, IMPROVEREASONS);
  name : string;
  emailAddress : string;
  letter: string;

   generateText(): void {
     this.letter = '';
    this.relationshipReasons.filter(function(r){return r.appliesToUser; }).forEach(element => {
      this.letter += element.description;
      // todo: generate a real letter
    });
  }

   getApplicableReasonsForProject(project: Project, allReasons: Reason[]): Reason[]
   {
     var ret = allReasons.filter(function(r){return r.tags.length === 0; });
     project.tags.forEach(tag => {
       var tagMatches = allReasons.filter(function(r){return r.tags.includes(tag)});
       ret = ret.concat(tagMatches);
     });
     return ret;
   }

}