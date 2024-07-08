import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import { ApiResponseTask, ITask, Task } from './model/task';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  taskList: ITask[] = [];
  taskObj: Task = new Task();

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.loadAllTask();
  }

  loadAllTask() {
    this.masterService.getAllTaskList().subscribe((res: ApiResponseTask) => {
      this.taskList = res.data;
    });
  }
  addAnNewTask() {
    this.masterService.addNewTask(this.taskObj).subscribe(
      (res: ApiResponseTask) => {
        if (res.result) {
          alert('New Task added Success');
          this.loadAllTask();
          this.taskObj = new Task();
        } else {
          alert('Failed to ad');
        }
      },
      (error) => {
        alert('Api Error');
      }
    );
  }

  onEdit(item: Task) {
    this.taskObj = item;
    setTimeout(() => {
      const dat = new Date(this.taskObj.dueDate);

      let day = ('0' + dat.getDate()).slice(-2);
      let month = ('0' + (dat.getMonth() + 1)).slice(-2);
      let year = dat.getFullYear();

      const today = `${year}-${month}-${day}`;
      const dateInput = document.getElementById(
        'task-date'
      ) as HTMLInputElement;

      if (dateInput) {
        dateInput.value = today;
      }
    }, 2000);
  }

  updateTask() {
    this.masterService.updateTask(this.taskObj).subscribe(
      (res: ApiResponseTask) => {
        if (res.result) {
          alert('Task Updated');
          this.loadAllTask();
          this.taskObj = new Task();
        } else {
          alert('Failed to Update');
        }
      },
      (error) => {
        alert('Api Error');
      }
    );
  }

  deleteTaskById(id: any) {
    const isConfirmd = confirm('Are you Sure?You want to delete?');
    if (isConfirmd) {
      this.masterService.DeleteTask(id).subscribe(
        (res: ApiResponseTask) => {
          if (res.result) {
            alert('Task Deleted');
            this.loadAllTask();
            this.taskObj = new Task();
          } else {
            alert('Failed to Delete');
          }
        },
        (error) => {
          alert('Api Error');
        }
      );
    }
  }
}
