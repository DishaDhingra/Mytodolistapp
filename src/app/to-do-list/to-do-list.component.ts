import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ToDoListComponent implements OnInit {
  toDoList: AngularFirestoreCollection<any>;
  toDoListArray: Observable<any[]>;
  constructor(
    private firebasedb: AngularFireDatabase,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.toDoList = this.db.collection('titles');
    this.toDoListArray = this.toDoList.valueChanges({ idField: 'id' });
  }

  onAdd(itemTitle) {
    this.toDoList.add({
      title: itemTitle.value,
      isChecked: false,
    });
    itemTitle.value = null;
  }

  alterCheck(key: string, isChecked) {
    this.db.collection('titles/').doc(key).update({ isChecked: !isChecked });
  }

  onDelete(key: string) {
    this.db.collection('titles/').doc(key).delete();
  }
}
