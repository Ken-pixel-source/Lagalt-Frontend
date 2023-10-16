import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfilComponent {

  public formData = {
    skills: [],
    portfolio: []
  };

  @Output() saveData = new EventEmitter<any>();

  save() {
    this.saveData.emit(this.formData);
    this.closeModal();
  }



  closeModal() {

  }

}
