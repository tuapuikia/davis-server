"use strict";var __decorate=this&&this.__decorate||function(t,e,s,n){var a,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,s):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,n);else for(var i=t.length-1;i>=0;i--)(a=t[i])&&(r=(o<3?a(r):o>3?a(e,s,r):a(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r},__metadata=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},core_1=require("@angular/core"),router_1=require("@angular/router"),http_1=require("@angular/http"),http_2=require("@angular/http"),DavisService=function(){function t(t,e){this.http=t,this.router=e,this.isAdmin=!1,this.isAuthenticated=!1,this.timezones=[],this.isWizard=!1,this.titleGlobal="",this.helpLinkText="How to complete this step",this.isChromeExtensionInstalled=chrome.app.isInstalled,this.values={authenticate:{email:null,password:null},user:{email:null,password:null,timezone:null,alexa_ids:null,name:{first:null,last:null},admin:!1},otherUser:{email:null,password:null,timezone:null,alexa_ids:null,name:{first:null,last:null},admin:!1},users:[],dynatrace:{url:null,token:null,strictSSL:!0},slack:{enabled:!0,clientId:null,clientSecret:null,redirectUri:null},original:{user:{},otherUser:{},dynatrace:{},slack:{}}},this.config={user:{title:"My Account",name:"user",path:"src/config-user",error:null,success:null},users:{title:"User Accounts",name:"users",path:"src/config-users",error:null,success:null},dynatrace:{title:"Let's connect to Dynatrace!",name:"dynatrace",path:"src/config-dynatrace",error:null,success:null},alexa:{title:"Alexa",name:"alexa",path:"src/config-alexa",error:null,success:null},slack:{title:"Slack App",name:"slack",path:"src/config-slack",error:null,success:null}}}return t.prototype.logOut=function(){this.isAuthenticated=!1,this.isAdmin=!1,this.token=null,sessionStorage.removeItem("email"),sessionStorage.removeItem("token"),sessionStorage.removeItem("isAdmin"),this.router.navigate(["/auth/login"])},t.prototype.getJwtToken=function(){var t=new http_2.Headers({"Content-Type":"application/json"}),e=new http_2.RequestOptions({headers:t});return this.http.post("/api/v1/authenticate",{email:this.values.authenticate.email,password:this.values.authenticate.password},e).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.getTimezones=function(){var t=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),e=new http_2.RequestOptions({headers:t});return this.http.get("/api/v1/system/users/timezones",e).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.getDavisUser=function(){var t=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),e=new http_2.RequestOptions({headers:t});return this.http.get("/api/v1/system/users/"+this.values.authenticate.email,e).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.getDavisUsers=function(){var t=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),e=new http_2.RequestOptions({headers:t});return this.http.get("/api/v1/system/users",e).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.updateDavisUser=function(t){var e=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),s=new http_2.RequestOptions({headers:e});return this.http.put("/api/v1/system/users/"+t.email,t,s).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.addDavisUser=function(t){var e=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),s=new http_2.RequestOptions({headers:e});return this.http.post("/api/v1/system/users/"+t.email,t,s).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.removeDavisUser=function(t){var e=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),s=new http_2.RequestOptions({headers:e});return this.http.delete("/api/v1/system/users/"+t,s).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.getDynatrace=function(){var t=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),e=new http_2.RequestOptions({headers:t});return this.http.get("/api/v1/system/config/dynatrace",e).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.connectDynatrace=function(){var t=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),e=new http_2.RequestOptions({headers:t});return this.http.put("/api/v1/system/config/dynatrace",this.values.dynatrace,e).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.validateDynatrace=function(){var t=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),e=new http_2.RequestOptions({headers:t});return this.http.get("/api/v1/system/config/dynatrace/validate",e).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.connectAlexa=function(){var t=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),e=new http_2.RequestOptions({headers:t});return this.http.put("/api/v1/system/users/"+this.values.user.email,{alexa_ids:this.values.user.alexa_ids},e).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.getSlack=function(){var t=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),e=new http_2.RequestOptions({headers:t});return this.http.get("/api/v1/system/config/slack",e).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.connectSlack=function(){var t=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),e=new http_2.RequestOptions({headers:t});return this.http.put("/api/v1/system/config/slack",this.values.slack,e).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.startSlack=function(){var t=new http_2.Headers({"Content-Type":"application/json","x-access-token":this.token}),e=new http_2.RequestOptions({headers:t});return this.http.post("/api/v1/system/config/slack/start",{},e).toPromise().then(this.extractData).catch(this.handleError)},t.prototype.extractData=function(t){var e=t.json();return e||{}},t.prototype.handleError=function(t){var e;if(t instanceof http_1.Response){var s=t.json()||"",n=s.error||JSON.stringify(s);e=t.status+" - "+(t.statusText||"")+" "+n}else e=t.message?t.message:t.toString();return console.error(e),Promise.reject(e)},t.prototype.windowLocation=function(t){window.location.assign(t)},t.prototype.windowOpen=function(t){window.open(t)},t.prototype.addToChrome=function(){chrome.webstore.install("https://chrome.google.com/webstore/detail/kighaljfkdkpbneahajiknoiinbckfpg",this.addToChomeSuccess,this.addToChomeFailure)},t.prototype.addToChomeSuccess=function(){},t.prototype.addToChomeFailure=function(t){window.open("https://chrome.google.com/webstore/detail/kighaljfkdkpbneahajiknoiinbckfpg")},t.prototype.clickElem=function(t){document.getElementById(t).click()},t.prototype.getTimezone=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},t}();DavisService=__decorate([core_1.Injectable(),__metadata("design:paramtypes",[http_1.Http,router_1.Router])],DavisService),exports.DavisService=DavisService;
//# sourceMappingURL=../../maps/app/shared/davis.service.js.map
