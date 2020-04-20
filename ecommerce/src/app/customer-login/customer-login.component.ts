import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import { Customer } from '../models/customer';
import {Observable} from 'rxjs';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {


  phoneNo:number;
  customer:any;
  submitted:false;
  customers:Observable<Customer[]>;
  message:any;
  password:any;
  temp:any;

  constructor(private route:ActivatedRoute,private router:Router,private loginService:CustomerService) { }


  ngOnInit(): void {
  
  }
  checkLogin() {
 //   if(this.customer.phoneNo!=null)
   // this.router.navigate(['customer']);
   let resp= this.loginService.FindCustomer(this.phoneNo);
      resp.subscribe(data => {
        console.log(data)
        this.customer = data; 
      }, error => console.log(error));

    if(this.customer!=null){
      this.authenticate(this.customer.phoneNo,this.customer.password)
    }

    this.message=this.customer.emailId;
   // this.temp=btoa("qwerty");


  }

  authenticate(phoneNo,password){
    if(password==btoa(this.password))
    {
      this.temp="login successfully";
      sessionStorage.setItem('phoneNo',phoneNo)
      return true;
      

    }
    else
    {
      this.temp="Invalid Password";
      return false;
      
    }
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('phoneNo')
    console.log(!(user===null))
    return !(user===null);
  }

  logOut(){
    sessionStorage.removeItem('phoneNo');
  }

}