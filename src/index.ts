class User {
  name: string
  favoriteColor: string
  age: number
  id: number

  constructor(name: string, favoriteColor: string, age: number, id: number) {
    this.name = name;
    this.favoriteColor = favoriteColor;
    this.age = age;
    this.id = id;
  }
}

class UserAPI {
  users: Array<User>

  constructor() {
    this.users = [];
  }

  assignId() {

  }

  addUser(user: User) {

  }

  getUserById(id: number) {

  }

  getUsers() {

  }

  deleteUserById(id: number) {

  }

  searchUserByName(name: string) {

  }
}
