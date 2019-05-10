import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

import { WalletInfo } from '../models/wallet-info.model';
import { Tx, TxEnvelope } from '../models/submit-transactions.model';

declare var ownBlockchainSdk: any;

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  public generateWallet(): Observable<WalletInfo> {
    const wallet = ownBlockchainSdk.crypto.generateWallet();
    return of(wallet);
  }

  public getAddressFromKey(privateKey: string): Observable<any> {
    const address = ownBlockchainSdk.crypto.addressFromPrivateKey(privateKey);
    return of(address);
  }

  public signTransaction(privateKey: string, tx: Tx): Observable<TxEnvelope> {
    const rawTx = ownBlockchainSdk.crypto.utf8ToHex(JSON.stringify(tx));
    const signature = ownBlockchainSdk.crypto.signMessage(environment.networkCode,privateKey, rawTx);
    return of({
      tx: ownBlockchainSdk.crypto.encode64(rawTx),
      signature: signature
    });
  }

  public signMessage(privateKey: string, message: string): Observable<string> {
    return of(ownBlockchainSdk.crypto.signPlainText(privateKey, message));
  }

  public verifySignature(signature: string, message: string): Observable<string> {
    return of(ownBlockchainSdk.crypto.verifyPlainTextSignature(signature, message));
  }

  public deriveHash(address: string, nonce: number, txActionNumber: number): string {
    return ownBlockchainSdk.crypto.deriveHash(address, nonce, txActionNumber);
  }
}
