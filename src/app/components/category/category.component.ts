import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  parentList:any[]=[]
  mainCategories:CategoryModel[]= [];
  parentCategories:CategoryModel[]= [];
  category:CategoryModel= new CategoryModel();
  parentCategoryId:string=""
constructor(private http:HttpService){
  this.GetAllMainCategory()
}

GetAllMainCategory(){
  this.http.get("Categories/GetAllMainCategory", (res) => {
    this.mainCategories=res.categories
  });
}
GetByCategoryId(event: Event)
{ 
  this.parentList=[]
  const selectElement = event.target as HTMLSelectElement;
  const categoryId = selectElement.value;
  console.log(categoryId);
 this.category.id=categoryId
 if (categoryId!=="") {
  this.http.post("Categories/GetAllCategory",   this.category, (res)=> {
    this.parentCategories=res.categories
    this.parentList.push(this.parentCategories)
    console.log(this.parentList);
  });
 }
}
getByParentCategoryId(id:string,categoryIndex:any){
  this.parentCategoryId=id;
  this.category.id=id   
  console.log(categoryIndex)
  if (categoryIndex !== -1) {
    this.parentList = this.parentList.slice(0, categoryIndex + 1);
  }
  this.http.post("Categories/GetAllCategory",   this.category, (res)=> {
    this.parentCategories=res.categories
    this.parentList.push(this.parentCategories)
    console.log(res);
  });
console.log(id)
}

}
