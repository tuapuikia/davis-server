import { Component, OnInit, 
         OnChanges, SimpleChange, 
         AfterViewInit,
         ElementRef,
         Renderer,
         ViewChild,
         Input, Output, 
         EventEmitter }           from '@angular/core';

// Services
import { ConfigService }          from '../config.service';
import { DavisService }           from '../../davis.service';
import { DavisModel }             from '../../models/davis.model';
import * as _                     from 'lodash';

@Component({
  selector: 'config-filter',
  templateUrl: './config-filter.component.html',
})
export class ConfigFilterComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() isNotifications: boolean;
  @Input() isNewFilter: boolean;
  @Output() showFiltersList: EventEmitter<any> = new EventEmitter();
  @ViewChild('name') name: ElementRef;
  
  filterScope: any;
  filterScopes: any;
  filterOptions: any;
  submitted: boolean = false;
  submitButton: string;
  submitButtonDefault: string;
  isDirty: boolean = false;

  constructor(
    private renderer: Renderer,
    public iDavis: DavisService,
    public iConfig: ConfigService) {}

  doSubmit() {
    this.submitted = true;
    this.submitButton = (this.isNewFilter) ? 'Adding...' : 'Saving...';
    
    // Safari autocomplete polyfill - https://github.com/angular/angular.js/issues/1460
    this.iConfig.values.filter.name = this.iDavis.safariAutoCompletePolyFill(this.iConfig.values.filter.name, 'name');
    this.iConfig.values.filter.description = this.iDavis.safariAutoCompletePolyFill(this.iConfig.values.filter.description, 'description');
    // this.iConfig.values.filter.scope = this.iDavis.safariAutoCompletePolyFill(this.iConfig.values.filter.scope, 'scope');
    this.iConfig.values.filter.origin = this.iDavis.safariAutoCompletePolyFill(this.iConfig.values.filter.origin, 'origin');
    
    // Safari autocomplete polyfill - Update any autofilled checkboxes
    this.validate();
    
    if (this.isNewFilter) {
      this.iConfig.addDavisFilter(this.iConfig.values.filter)
        .then(response => {
          if (!response.success) throw new Error(response.message);
          this.filterOptions = new DavisModel().filterOptions;
          this.iConfig.values.filter = new DavisModel().filter;
          this.iConfig.values.filter.owner = this.iDavis.values.user._id;
          this.iConfig.values.filter.scope = 'global';
          this.iConfig.values.original.filter = new DavisModel().filter;
          this.isDirty = false;
          this.showFiltersList.emit();
          this.iConfig.status['filter'].success = true;
          this.submitButton = this.submitButtonDefault;
        })
        .catch(err => {
          this.iConfig.displayError(err, 'filter');
          this.submitButton = this.submitButtonDefault;
        });
    } else {
      this.iConfig.updateDavisFilter(this.iConfig.values.filter)
        .then(response => {
          if (!response.success) throw new Error(response.message);
          this.iConfig.values.original.filter = _.cloneDeep(this.iConfig.values.filter);
          this.isDirty = false;
          this.showFiltersList.emit();
          this.iConfig.status['filter'].success = true;
          this.submitButton = this.submitButtonDefault;
        })
        .catch(err => {
          this.iConfig.displayError(err, 'filter');
          this.submitButton = this.submitButtonDefault;
        });
    }
  }

  validate() {
    
    // Get checkbox values
    for(let key in this.filterOptions) {
      if (key !== 'origin') {
        this.iConfig.values.filter[key] = [];
        this.filterOptions[key].forEach((option: any)  => {
          if (option.enabled) this.iConfig.values.filter[key].push(option.value);
        });
      }
    }
    this.isDirty = !_.isEqual(this.iConfig.values.filter, this.iConfig.values.original.filter);
  }
  
  removeNullProperties(filter: any): any {
    
    Object.keys(filter).forEach(key => {
      if (filter[key] && typeof filter[key] === 'object') {
        this.removeNullProperties(filter[key]);
      } else if (filter[key] == null || filter[key].length < 1) {
        delete filter[key];
      }
    });
      
    return filter;
  }

  onSourceChange(source: string) {
    this.iConfig.values.filter.scope = this.buildScope();
  }
  
  onEmailChange(email: string) {
    this.iConfig.values.filter.scope = this.buildScope();
  }
  
  onTeamChange(team_id: string) {
    if (team_id && team_id !== 'null') {
      this.filterScopes.channels = this.filterScopes.teams[team_id].channels;
    } else {
      this.filterScope.channel = null;
      this.filterScopes.channels = [];
    }
    this.iConfig.values.filter.scope = this.buildScope();
  }
  
  onChannelChange(id: string) {
    this.iConfig.values.filter.scope = this.buildScope();
  }
  
  buildScope(): string {
    let scope = 'global';
    if (this.filterScope.source === 'web') {
      scope = (this.filterScope.email && this.filterScope.email !== 'null') ? `${this.filterScope.source}:${this.filterScope.email}` : this.filterScope.source;
    } else if (this.filterScope.source === 'slack') {
      scope = (this.filterScope.team_id && this.filterScope.team_id !== 'null') ? `${this.filterScope.source}:${this.filterScope.team_id}` : this.filterScope.source;
      scope = (this.filterScope.channel_id && this.filterScope.channel_id !== 'null') ? `${scope}:${this.filterScope.channel_id}` : scope;
    }
    return scope;
  }
  
  init() {
    this.iConfig.getDavisUsers()
      .then(response => {
        if (!response.success) throw new Error(response.message);
        this.filterScopes.users = response.users;
        return this.iConfig.getSlackChannels();
      })
      .then(response => {
        if (!response.success) throw new Error(response.message);
        
        if (response.channels && response.channels.length > 0) {
          response.channels.forEach((channel: any) => {
            
            if (!this.filterScopes.teams[channel.team_id]) {
              this.filterScopes.teams[channel.team_id] = {};
              this.filterScopes.teams[channel.team_id].team_id = channel.team_id;
              this.filterScopes.teams[channel.team_id].team_name = channel.team_name;
              this.filterScopes.teams[channel.team_id].channels = [];
            }
            this.filterScopes.teams[channel.team_id].channels.push({id: channel.id, name: channel.name});
          });
          
          for(let team in this.filterScopes.teams) {
            this.filterScopes.teams_array.push(this.filterScopes.teams[team]);
          }
          
          if (this.filterScope.team_id && this.filterScope.team_id !== 'null') {
            this.filterScopes.channels = this.filterScopes.teams[this.filterScope.team_id].channels;
          } else {
            this.filterScope.channel = null;
            this.filterScopes.channels = [];
          }
        } else {
          // Remove Slack from scope source, since there are no teams for this user
          this.filterScopes.sources.splice(2, 1);
        }
      })
      .catch(err => {
        this.iConfig.displayError(err, null);
      });
    
    if (this.isNewFilter) {
      this.iConfig.values.filter.origin = (this.isNotifications) ? 'NOTIFICATION' : 'QUESTION';
      this.iConfig.values.filter.owner = this.iDavis.values.user._id;
      this.iConfig.values.filter.scope = 'global';
    }
    this.filterScope = new DavisModel().filterScope;
    this.filterScopes = new DavisModel().filterScopes;
    this.filterOptions = new DavisModel().filterOptions;
    
    if (this.isNotifications) {
      this.filterScope.source = 'slack';
      this.filterScopes.sources = [this.filterScopes.sources[2]];
    }
    
    // Set checkbox values
    for(let key in this.filterOptions) {
      if (key !== 'origin') {
        this.iConfig.values.filter[key].forEach((value: any, index: any) => {
          this.filterOptions[key].forEach((option: any, index: any) => {
            if (option.value === value) this.filterOptions[key][index].enabled = true;
          });
        });
      }
    }
    
    // Set scope values
    if (!this.isNewFilter) {
      if (this.iConfig.values.filter.scope && this.iConfig.values.filter.scope !== 'global') {
        let exploded = this.iConfig.values.filter.scope.split(':');
        this.filterScope.source = exploded[0];
        if (exploded.length > 1 && exploded[0] === 'web') this.filterScope.email = exploded[1];
        if (exploded.length > 1 && exploded[0] === 'slack') this.filterScope.team_id = exploded[1];
        if (exploded.length > 2 && exploded[0] === 'slack') this.filterScope.channel_id = exploded[2];
      }
    }
    
    setTimeout(() => {
      this.validate();
    }, 200);
  }

  ngOnInit() {
    this.submitButton = (this.isNewFilter) ? 'Add' : 'Save';
    this.submitButtonDefault = (this.isNewFilter) ? 'Add' : 'Save';
  }
  
  // Workaround for reseting checkboxes when clicking Add Filter while editing a filter
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['isNewFilter']) this.init();
  }
  
  ngAfterViewInit() {
    if (this.isNewFilter) {
      this.renderer.invokeElementMethod(this.name.nativeElement, 'focus');
    }
  }
}