interface Person {
  readonly id: string
  readonly name: string
  readonly age?: number
  readonly favoriteColor?: string
}

interface UserFormMeta {
  readonly name: string
  readonly age?: number
  readonly favoriteColor?: string
}

export default class UserAPI {
  list: Record<string, Person>
  constructor(users: Record<string, Person>) {
    this.list = users || {}
  }

  randomId = (): string => {
    return Math.random().toString(24).slice(2)
  }

  addUser(user: UserFormMeta): Person {
    if (!user.name) {
      throw new Error("you need to at least have a name to add a user")
    }
    const id = this.randomId()
    const newUser = { id, ...user }
    this.list = { ...this.list, [id]: newUser }
    return newUser
  }

  getUserById(id: string): Person {
    // const targetUser = this.list.find(user => user.id === id)
    if (!targetUser) {
      throw new Error("There are no users found with that id.")
    }
    return targetUser
  }

  updateUserById(id: string, updatedUser: Partial<UserFormMeta>): Person {
    if (!id) {
      throw new Error("We can not update a user without an id")
    }
    // const updatedList = this.list.map(user => {
    //   if (user.id === id) {
    //     return { ...user, ...updatedUser }
    //   }
    //   return user
    // })
    // this.list = updatedList
    return this.getUserById(id)
  }

  getUsers(): ReadonlyArray<Person> | [] {
    let usersArray: Array<Person> = []
    for (let id in this.list) {
      usersArray.push(this.list[id])
    }
    return usersArray
  }

  deleteUserById(id: string): Person {
    // const deletedUser = this.getUserById(id)
    // const newUsersList = this.list.filter(user => user.id !== id)
    // this.list = newUsersList
    // return deletedUser
  }

  searchUserByName(name: string): ReadonlyArray<Person> | [] {
    // const filteredUserArray = this.list.filter(user => {
    //   if (user.name.toLowerCase().includes(name.toLowerCase())) {
    //     return user
    //   }
    // })
    // return filteredUserArray
  }
}
