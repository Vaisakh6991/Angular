import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../model/form.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  id: number;
  editMode: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;

      this.initForm();
    });
  }

  onAddMember() {
    (<FormArray>this.form.get('members')).push(
      new FormGroup({
        mname: new FormControl(null, Validators.required),
        mobile: new FormControl(null, [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ]),
        occupation: new FormControl(null),
      })
    );
  }

  onDeleteMember(index: number) {
    (<FormArray>this.form.get('members')).removeAt(index);
  }

  get memberControls() {
    return (this.form.get('members') as FormArray).controls;
  }

  private initForm() {
    let name = '';
    let address = '';
    let age: number;
    let houseMembers = new FormArray([]);

    if (this.editMode) {
      const user = this.dataService.getUser(this.id);
      name = user.name;
      address = user.address;
      age = user.age;

      if (user['members']) {
        for (let u of user.members) {
          houseMembers.push(
            new FormGroup({
              mname: new FormControl(u.mname, Validators.required),
              mobile: new FormControl(u.mobile, Validators.required),
              occupation: new FormControl(u.occupation, Validators.required),
            })
          );
        }
      }
    }

    this.form = new FormGroup({
      name: new FormControl(name, Validators.required),
      address: new FormControl(address, Validators.required),
      age: new FormControl(age, Validators.required),
      members: houseMembers,
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Hmm.. Nice Try !!');
    }
    if (this.editMode) {
      this.dataService.updateUser(this.id, this.form.value);
    } else {
      this.dataService.addUser(this.form.value);
    }
    this.form.reset();
    this.router.navigate(['']);
  }

  onDeleteUser(index: number) {
    this.dataService.deleteUser(index);
    this.router.navigate(['']);
  }
}
