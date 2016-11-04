"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var wizard_service_1 = require('../wizard.service');
var Step2Component = (function () {
    function Step2Component(wizardService, router) {
        this.wizardService = wizardService;
        this.router = router;
        this.submitted = false;
        this.passwordsMatch = true;
    }
    Step2Component.prototype.doSubmit = function () {
        var _this = this;
        if (this.wizardService.values.user.password === this.wizardService.values.user.passwordConfirmation) {
            this.passwordsMatch = true;
            this.wizardService.addDavisUser()
                .then(function (result) {
                _this.wizardService.steps[1].status = 'success';
                _this.router.navigate(['wizard/src/step3']);
            }, function (error) {
                console.log(error);
                _this.wizardService.steps[1].status = 'failure';
            });
            this.submitted = true;
        }
        else {
            this.passwordsMatch = false;
            this.wizardService.values.user.password = null;
            this.wizardService.values.user.passwordConfirmation = null;
            this.wizardService.steps[1].status = 'failure';
        }
    };
    Step2Component.prototype.ngOnInit = function () {
    };
    Step2Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'step2',
            templateUrl: './step2.component.html',
            styleUrls: ['./step2.component.css']
        }), 
        __metadata('design:paramtypes', [wizard_service_1.WizardService, router_1.Router])
    ], Step2Component);
    return Step2Component;
}());
exports.Step2Component = Step2Component;
//# sourceMappingURL=step2.component.js.map