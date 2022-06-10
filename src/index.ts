export interface User {
  name: string
  favoriteColor: string
  age: number
  id?: string
}

export class UserAPI {
  private _users: { [key: string]: { name: string, favoriteColor: string, age: number, id: string } }

  constructor(users: { [key: string]: { name: string, favoriteColor: string, age: number, id: string } } = {}) {
    this._users = { ...users }
  }

  addUser(user: User) {
    const id = Date.now().toString()
    let copyOfAPIUsers = { ...this._users }
    if (user.hasOwnProperty("id")) {
      throw new Error("Id incorrectly provided by input user")
    }
    Object.values(copyOfAPIUsers).map((userObj) => {
      if (userObj.name.toLowerCase() === user.name.toLowerCase() && userObj.favoriteColor.toLowerCase() === user.favoriteColor.toLowerCase() && userObj.age === user.age) {
        throw new Error("User with these properties already exists")
      }
    })
    const newUser = { ...user, id: id }
    copyOfAPIUsers[id] = { ...newUser }
    this._users = { ...copyOfAPIUsers }
    return { ...newUser }
  }

  getUserById(id: string) {
    if (this._users[id]) {
      return { ...this._users[id] }
    } else {
      throw new Error("User was not found")
    }
  }

  getUsers() {
    if (!this._users) {
      throw new Error("There is an issue with the users object")
    } else {
      return Object.values({ ...this._users })
    }
  }

  deleteUserById(id: string) {
    if (!this._users[id]) {
      throw new Error("User was not found")
    } else {
      const userToDelete = { ...this._users[id] }
      const updatedArray = { ...this._users }
      delete updatedArray[id]
      this._users = { ...updatedArray }
      return userToDelete
    }
  }

  searchUserByName(name: string) {
    const copyOfUsers = { ...this._users }
    const userResult = Object.values(copyOfUsers).filter(x => x["name"].toLowerCase() === name.toLowerCase())
    if (userResult.length) {
      return [...userResult]
    } else {
      throw new Error("User(s) not found")
    }
  }

  searchUsersByFavoriteColor(color: string) {
    const copyOfUsers = { ...this._users }
    const userResult = Object.values(copyOfUsers).filter(x => x["favoriteColor"].toLowerCase() === color.toLowerCase())
    if (userResult.length) {
      return [...userResult]
    } else {
      throw new Error("User(s) not found")
    }
  }
}
