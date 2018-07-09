import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { GoogleMaterialModule } from './/google-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { WalletComponent } from './wallet/wallet.component';
import { ImportWalletComponent } from './import-wallet/import-wallet.component';
import { BalanceInfoComponent} from './balance-info/balance-info.component'; 
import { AccountInfoComponent } from './account-info/account-info.component';
import { SubmitTransactionComponent } from './submit-transaction/submit-transaction.component'
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';
import { BlockInfoComponent } from './block-info/block-info.component';
import { ChxTransferComponent } from './actions/chx-transfer/chx-transfer.component';
import { AssetTransferComponent } from './actions/asset-transfer/asset-transfer.component';
import { SubmitTransactionInfoComponent } from './submit-transaction-info/submit-transaction-info.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HttpClientModule } from '@angular/common/http'
import { GlobalErrorHandler } from './services/global.error.handler';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AddressAccountInfoComponent } from './address-account-info/address-account-info.component';
import { GenerateAccountComponent } from './generate-account/generate-account.component';

@NgModule({
  entryComponents : [ SubmitTransactionInfoComponent, ErrorDialogComponent],
  declarations: [
    AppComponent,
    WalletComponent,
    ImportWalletComponent,
    BalanceInfoComponent,
    AccountInfoComponent,
    SubmitTransactionComponent,
    TransactionInfoComponent,
    BlockInfoComponent,
    ChxTransferComponent,
    AssetTransferComponent,
    SubmitTransactionInfoComponent,
    HomeScreenComponent,
    ErrorDialogComponent,
    AddressAccountInfoComponent,
    GenerateAccountComponent
  ],
  imports: [
    BrowserModule,
    GoogleMaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide : ErrorHandler,
      useClass : GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }