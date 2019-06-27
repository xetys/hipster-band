import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { NavEntry } from 'ktelizer';
import { JhiEventManager } from 'ng-jhipster';
import { AccountService, Account } from 'app/core';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
  loggedInEntries: NavEntry[] = [];

  defaultEntries: NavEntry[] = [
    {
      title: 'Home',
      url: ''
    },
    {
      title: 'Band',
      url: 'band'
    },
    {
      title: 'Song',
      url: 'song'
    },
    {
      title: 'Vote',
      url: 'vote'
    }
    // ktelizer-needle-navbar
  ];

  navEntries: NavEntry[] = [];
  account: Account;

  constructor(
    private titleService: Title,
    private router: Router,
    private eventManager: JhiEventManager,
    private accountService: AccountService
  ) {}

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'demoApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }

      this.registerAuthenticationSuccess();
      this.registerDeauthenticationSuccess();
      this.checkAccountAndRenderNavi();
    });
  }

  private checkAccountAndRenderNavi() {
    if (this.accountService.isAuthenticated()) {
      this.accountService
        .identity()
        .then(account => {
          this.account = account;
          this.renderNavi();
        })
        .catch(() => this.renderNavi());
    } else {
      this.renderNavi();
    }
  }

  renderNavi() {
    if (this.account) {
      this.navEntries = [...this.defaultEntries, ...this.loggedInEntries];
    } else {
      this.navEntries = this.defaultEntries;
    }
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.checkAccountAndRenderNavi();
    });
  }

  registerDeauthenticationSuccess() {
    this.eventManager.subscribe('deauthenticationSuccess', message => {
      this.account = null;
      this.renderNavi();
    });
  }
}
