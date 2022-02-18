import { HttpClient, HttpErrorResponse, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChildActivationStart, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  id: any;
  localUser: any;
  parsedUser: any;
  constructor(private http: HttpClient,
    private router: Router) {
    this.localUser = localStorage.getItem('user');
    this.parsedUser = JSON.parse(this.localUser);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDgyOTAzLCJleHAiOjE2NDU2ODc3MDN9.hS1liQfKeMmVzbPt0aY60dI_UkKp_9FFDLnj8A9UbSQ'
    })
  };


  getAllPosts() {
    return this.http.get<any>('http://localhost:1337/api/posts?filters[isPublished][$eq]=true&populate=*', this.httpOptions);
  }
  getPostById(id : number){
    return this.http.get<any>(`http://localhost:1337/api/posts?filters[id][$eq]=${id}&populate=*`, this.httpOptions);
  }
  getMyPosts() {
    let localStorageUser = localStorage.getItem('user');
    if (localStorageUser) {
      let parsedUser = JSON.parse(localStorageUser);
      if (parsedUser) {
        let userid = parsedUser?.user['id'];
        return this.http.get<any>(`http://localhost:1337/api/posts?filters[author][id][$eq]=${userid}&populate=*`, this.httpOptions);
      }
      else {
        return new Observable<[]>();
      }
    }
    else {
      return new Observable<[]>();
    }

  }
  deletePost(id: number) {
    const deleteOptions = this.httpOptions;
    deleteOptions.headers = deleteOptions.headers.set('Authorization', 'Bearer ' + this.parsedUser.jwt);
    return this.http.delete<any>(`http://localhost:1337/api/posts/${id}`, deleteOptions);
  }
  updatePost(body: any) {
    const post = {
      data: body,
      meta: {}
    };
    const updateOptions = this.httpOptions;
    updateOptions.headers = updateOptions.headers.set('Authorization', 'Bearer ' + this.parsedUser.jwt);
    return this.http.put<any>(`http://localhost:1337/api/posts/${body.data['id']}`, updateOptions);
  }

  createPost(body: any) {
    const createOptions = this.httpOptions;
    createOptions.headers = createOptions.headers.set('Authorization', 'Bearer ' + this.parsedUser.jwt);
    return this.http.post<any>('http://localhost:1337/api/posts/', body, createOptions);
  }
  async uploadImage(file: any, blog: any) {
    // const uploadOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'multipart/form-data; ',
    //     'Authorization': 'Bearer '+this.parsedUser.jwt
    //   })
    // };
    // (file);
    // const formData= new FormData();
    // formData.append('files', file, file.name);
    // (formData);
    //   // uploadOptions.headers = uploadOptions.headers.set('Authorization', 'Bearer '+this.parsedUser.jwt);
    //   return this.http.post<any>('http://localhost:1337/api/upload',formData, uploadOptions);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", 'Bearer '+this.parsedUser.jwt);

    var formdata = new FormData();
    formdata.append("files", file, file.name);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    fetch("http://localhost:1337/api/upload", requestOptions)
      .then(response => response.json())
      .then(result => {
        const postBody = blog;
        postBody.image = result[0]?.id;
        postBody.author = this.parsedUser.user.id;
        this.createPost({
          'data' : postBody
        }).subscribe(res =>{
           console.log('after post', res)
           this.router.navigate(['/myblogs'])
        })
      })
      .catch(error => console.log('error', error));
  }

//edit
editPost(body: any) {
  console.log(body);
  const createOptions = this.httpOptions;
  createOptions.headers = createOptions.headers.set('Authorization', 'Bearer ' + this.parsedUser.jwt);
  return this.http.put<any>(`http://localhost:1337/api/posts/${body.data.id}`, body, createOptions);
}
async editUploadImage(file: any, blog: any) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", 'Bearer '+this.parsedUser.jwt);

  var formdata = new FormData();
  formdata.append("files", file, file.name);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
  };

  fetch("http://localhost:1337/api/upload", requestOptions)
    .then(response => response.json())
    .then(result => {
      const postBody = blog;
      postBody.image = result[0]?.id;
      postBody.author = this.parsedUser.user.id;
      this.editPost({
        'data' : postBody
      }).subscribe(res =>{
         console.log('after post', res)
         this.router.navigate(['/myblogs'])
      })
    })
    .catch(error => console.log('error', error));
}
}

