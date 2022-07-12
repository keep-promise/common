import { Observable, Subject } from 'rxjs';

export default class MsgService {

  private static subject = new Subject<any>();

  static getObserver(): Observable<any> {
    return this.subject.asObservable();
  }

  static send(data: any) {
    this.subject.next(data);
  }

}


MsgService.getObserver().subscribe((data: any) => {
  console.log('msgService', data);
});

MsgService.getObserver().subscribe((data: any) => {
  console.log('msgService', data);
});

MsgService.send('发送数据');
