import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WalletRoutes } from '../services/walletroutes.service';
import { PrivatekeyService } from '../services/privatekey.service';
import { WalletRouteInfo } from '../models/wallet-route-info.model';
import { WalletService } from '../services/wallet.service';

@Component({
    selector: 'app-layout',
    templateUrl: './private.component.html',
    styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnDestroy {
    routes: WalletRouteInfo[];
    routesSubscription: Subscription;
    balanceChangeSubscription: Subscription;
    displayBalanceInfo: boolean;
    
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(
        private routeService: WalletRoutes,
        private privateKeyService: PrivatekeyService,
        private walletService: WalletService,
        private breakpointObserver: BreakpointObserver) {        
        this.loadRoutes();

        this.routesSubscription = this.walletService.getMessage()
            .subscribe(msg => {                
                this.reloadBalanceInfo(false);    
        });

        this.balanceChangeSubscription = this.privateKeyService
            .getMessage()
            .subscribe(showBalanceInfo => {                
                this.reloadBalanceInfo(showBalanceInfo);
            });
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.routesSubscription.unsubscribe();
        this.balanceChangeSubscription.unsubscribe();
    }

    private loadRoutes () {
        var walletContext = this.walletService.getWalletContext();
        var walletExits = walletContext.passwordHash != null && walletContext.walletKeystore != null;
        setTimeout(() => {
            this.routes = this.routeService.getRoutes(walletExits);
        })        
    }

    private reloadBalanceInfo(showBalanceInfo) {
        this.loadRoutes(); 
        setTimeout(() => {
            this.displayBalanceInfo = showBalanceInfo;                    
        });          
    }    
}
