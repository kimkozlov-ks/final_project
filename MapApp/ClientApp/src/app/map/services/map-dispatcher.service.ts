import {Injectable} from '@angular/core';
import {MapAction} from '../enums/MapAction';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapDispatcherService {
  get $mapAction(): BehaviorSubject<MapAction> {
    return this._$mapAction;
  }

  private _$mapAction: BehaviorSubject<MapAction> = new BehaviorSubject<MapAction>(MapAction.NONE);

  constructor() { }
}
