// ============================================================================
// Configuration - MODULE
//
// This module handles all functionality for the Configuration components
// ============================================================================

// ----------------------------------------------------------------------------
//  Imports
// ----------------------------------------------------------------------------
// Angular
import { NgModule }                 from "@angular/core";
import { CommonModule }             from "@angular/common";
import { FormsModule }              from "@angular/forms";

// Components
import { ConfigAlexaComponent }     from "./config-alexa/config-alexa.component";
import { ConfigChromeComponent }    from "./config-chrome/config-chrome.component";
import { ConfigDynatraceComponent } from "./config-dynatrace/config-dynatrace.component";
import { ConfigFilterComponent }   from "./config-filter/config-filter.component";
import { ConfigSlackComponent }     from "./config-slack/config-slack.component";
import { ConfigUserComponent }      from "./config-user/config-user.component";
import { ConfigUsersComponent }     from "./config-users/config-users.component";

// Services
import { ConfigService } from "./config.service";
import { FilterUsersByNamePipe } from './config-users-pipe/config-users.pipe';
import { FilterSidebarItemsByAdminPipe } from './config-sidebar-pipe/config-sidebar.pipe';

// ----------------------------------------------------------------------------
// Module
// ----------------------------------------------------------------------------
@NgModule({
  declarations: [
    ConfigAlexaComponent,
    ConfigChromeComponent,
    ConfigDynatraceComponent,
    ConfigFilterComponent,
    ConfigSlackComponent,
    ConfigUserComponent,
    ConfigUsersComponent,
    FilterUsersByNamePipe,
    FilterSidebarItemsByAdminPipe,
  ],
  exports: [
    ConfigAlexaComponent,
    ConfigChromeComponent,
    ConfigDynatraceComponent,
    ConfigFilterComponent,
    ConfigSlackComponent,
    ConfigUserComponent,
    ConfigUsersComponent,
    FilterUsersByNamePipe,
    FilterSidebarItemsByAdminPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    ConfigService,
  ],
})

export class ConfigModule { }
