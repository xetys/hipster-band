import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { VERSION } from 'app/app.constants';
import { AccountService, Account, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from '../profiles/profile.service';
import { AppSwitchService } from 'app/kloud/app-switch.service';
import { App } from 'app/kloud/models/app.model';
import { NavEntry } from 'ktelizer';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;

  myApplications: App[];
  account: Account;

  topNaviLeft: NavEntry[] = [{ title: 'K-TEL', url: 'https://www.ktel.de', icon: 'fa-comments' }];
  topNaviRight: NavEntry[] = [];

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private appSwitchService: AppSwitchService,
    private eventManager: JhiEventManager
  ) {
    this.version = VERSION ? 'v' + VERSION : '';
    this.isNavbarCollapsed = true;
  }

  ngOnInit() {
    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });

    this.registerAuthenticationSuccess();
    this.registerDeauthenticationSuccess();

    this.accountService
      .identity()
      .then(user => {
        if (user) {
          this.account = user;
          this.buildRightNavi();
        }
      })
      .catch(() => {
        this.buildRightNavi();
      });
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
        this.buildRightNavi();
      });
    });
  }

  registerDeauthenticationSuccess() {
    this.eventManager.subscribe('deauthenticationSuccess', message => {
      this.account = null;
      this.buildRightNavi();
    });
  }

  buildRightNavi() {
    if (this.account) {
      this.topNaviRight = [
        {
          title: this.account.firstName + ' ' + this.account.lastName,
          icon: 'fa-user',
          children: [{ title: 'Abmelden', icon: 'fa-lock', onClick: () => this.logout() }]
        },
        {
          title: '',
          icon: 'fa-sign-out',
          onClick: () => this.logout()
        }
      ];

      this.appSwitchService.getMyApplications().subscribe(apps => {
        this.myApplications = apps;
      });
    } else {
      this.topNaviRight = [{ title: 'Anmelden', icon: 'fa-lock', onClick: () => this.login() }];
      this.myApplications = [];
    }
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  logout() {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl() {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
  }
}
