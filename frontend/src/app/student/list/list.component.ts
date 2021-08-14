import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ListComponent implements OnInit {
  studentDialog: boolean = false;
  subjectNameSubmitted: boolean = false;
  marksSubmitted: boolean = false;
  addSubjectAndMark: boolean = false;
    formGroup:FormGroup;

    products: any = [];
    checkFilter: any = ['student_id.firstName','student_id.lastName'];
    students: any = [];

    product: any = [];
    student: any = [];
    studentData: any = [];

    selectedProducts: any = [];

    submitted: boolean = false;

    statuses: any =[];
    filterBy: any =[];

  constructor(
      private studentService: StudentService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private fb:FormBuilder
    ) {
        this.formGroup = this.fb.group({
            firstName: ['',Validators.compose([Validators.required])],
            lastName: ['',Validators.compose([Validators.required])],
            class: ['',Validators.compose([Validators.required])],
            subject_Names: this.fb.array([
                this.fb.control('', [Validators.required]), 
            ]),
            marks: this.fb.array([
                this.fb.control('', [Validators.required]), 
            ])
        })
     }

  ngOnInit() {
    this.studentService.getProducts().then(data => this.products = data);

    this.statuses = [
        {label: 'INSTOCK', value: 'instock'},
        {label: 'LOWSTOCK', value: 'lowstock'},
        {label: 'OUTOFSTOCK', value: 'outofstock'}
    ];

    this.filterBy = [
        {label: 'Filter by Class', value: 'class'},
        {label: 'Filter by Subject', value: 'subject'} 
    ];

    this.handleTogetStudents();

  }

  /**
   * Function to get subject_Name formarray
   */
   get subject_Names(): FormArray {
    return this.formGroup.get('subject_Names') as FormArray;
  }

  /**
   * Function to handle subject_Name form errors
   */
   hSubject_Names(i:any){
    return (<FormArray>this.formGroup.get('subject_Names')).controls[i];
  } 

  /**
   * Function to add subject_Names option
   */ 
   addsubject_NamesOption(event:any){
    event.preventDefault();   
    var co = this.subject_Names.push(this.fb.control('', [Validators.required]));
  }  

  /**
   * Function to remove subject_Names option
   */  
  removesubject_NamesOption(optId:number){
    var removeOpt:any = document.getElementById(`subject_NamesOptGroup${optId}`);
    removeOpt.remove();
    this.subject_Names.removeAt((optId-1));
  }  

  /**
   * Function to get subject_Name formarray
   */
   get marks(): FormArray {
    return this.formGroup.get('marks') as FormArray;
  }

  /**
   * Function to handle subject_Name form errors
   */
   hMarks(i:any){
    return (<FormArray>this.formGroup.get('marks')).controls[i];
  } 

  /**
   * Function to add marks option
   */ 
   addmarksOption(event:any){
    event.preventDefault();   
    var co = this.marks.push(this.fb.control('', [Validators.required]));
  }  

  /**
   * Function to remove marks option
   */  
  removemarksOption(optId:number){
    var removeOpt:any = document.getElementById(`marksOptGroup${optId}`);
    removeOpt.remove();
    this.marks.removeAt((optId-1));
  }

  addSubjectAndMarks(event:any){
    event.preventDefault();   
    this.marks.push(this.fb.control('', [Validators.required]));
    this.subject_Names.push(this.fb.control('', [Validators.required]));
  }

  removeSubjectMarks(optId:number){
    this.removemarksOption(optId)
    this.removesubject_NamesOption(optId)
  }

  handleTogetStudents(){
      this.studentService.getStudents().subscribe(response =>{
          console.log("data ",response)
          this.students = response.data;
      })
  }

  openNew() {
    this.student = {};
    this.submitted = false;
    this.studentDialog = true;
    this.addSubjectAndMark = true;
}

deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter((val:any) => !this.selectedProducts.includes(val));
            this.selectedProducts = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

 
   

editStudent(student: any) {
    this.submitted = false;
    this.studentData = student;
    this.subject_Names.clear(); 
    this.marks.clear(); 
    this.studentDialog = true;
    this.addSubjectAndMark = false;
    this.formGroup.patchValue({
        firstName:student.student_id.firstName,
        lastName:student.student_id.lastName,
        class:student.student_id.class,
        subject_Names:this.subject_Names.push(this.fb.control(student.subject_Name)), 
        marks:this.marks.push(this.fb.control(student.marks))
    })  
    
}
 

deleteStudent(studentId:number) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.studentService.deleteStudent(studentId).subscribe(response =>{
                if(response.status = 'success'){
                    this.students = this.students.filter((val:any) => val.student_id._id !== studentId);
                    this.student = {};
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Student Deleted', life: 3000});
                }else{
                    this.messageService.add({severity:'error', summary: 'Error', detail: response.message, life: 3000}); 
                }
            });
            
        }
    });
}

hideDialog() {
    this.studentDialog = false;
    this.submitted = false;
}

saveStudent() {   
    if(this.addSubjectAndMark){
        this.createStudent();
    }else{
        this.updateStudent();
    }     
}

createStudent(){
    this.submitted = true;
    const data = {
        firstName : this.formGroup.value.firstName,
        lastName : this.formGroup.value.lastName,
        class : this.formGroup.value.class,
        subjects : this.formGroup.value.subject_Names,
        marks : this.formGroup.value.marks,
    }

    this.studentService.saveStudent(data).subscribe(response =>{
        if(response.status == 'success'){
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Student Created', life: 3000});
            this.handleTogetStudents()
        }else{
            this.messageService.add({severity:'error', summary: 'Error', detail: response.message, life: 3000});
        }
    }) 
    this.studentDialog = false;   
}

updateStudent(){

    
    // this.submitted = true;
    const data = {
        firstName : this.formGroup.value.firstName,
        lastName : this.formGroup.value.lastName,
        class : this.formGroup.value.class,
        student_id: this.studentData.student_id._id,
        subject_Name : this.formGroup.value.subject_Names[0],
        marks : this.formGroup.value.marks[0],
    }
    console.log("data ",data) 
    this.studentService.updateStudent(this.studentData._id,data).subscribe(response =>{
        if(response.status == 'success'){
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Data Updated', life: 3000});
            this.handleTogetStudents()
        }else{
            this.messageService.add({severity:'error', summary: 'Error', detail: response.message, life: 3000});
        }
    }) 
    this.studentDialog = false;
}

handleFilter(event:any){
    var eventValue = event.value; 
    if(eventValue == 'class'){
        console.log("event ",eventValue);
        this.checkFilter = ['student_id.class']; 
    }else if(eventValue == 'subject'){ 
        console.log("event ",eventValue);
        this.checkFilter = ['subject_Name'];
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}



}
