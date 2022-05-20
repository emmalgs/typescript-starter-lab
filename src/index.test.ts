// @ts-nocheck
import UserAPI from "./index"
import {
  mockUsers,
  userObject,
  updatingUserObject,
  updatingUserObjectError,
  updatingUserObjectErrorWithId,
} from "./mockdata"

describe("Tests will go here!", () => {
  let users

  beforeEach(() => {
    users = new UserAPI(mockUsers)
  })

  afterEach(() => {
    users = null
  })

  it("should make an instance of the UserAPI class and add a user, new user object should have an id.", () => {
    const newUser = users.addUser(userObject)

    expect(users.list).toHaveLength(5)
    expect(newUser).toEqual({ id: expect.any(String), ...userObject })
    try {
      users.addUser({})
    } catch (err) {
      expect(err.message).toEqual(
        "you need to at least have a name to add a user"
      )
    }
  })

  it("should get the correct user that matches their id and throw an error if there is no one with that id", () => {
    const targetUser1 = users.getUserById("1")
    const targetUser2 = users.getUserById("3")

    expect(targetUser1).toEqual({
      age: 23,
      favoriteColor: "black",
      id: "1",
      name: "ted",
    })

    expect(targetUser2).toEqual({
      id: "3",
      name: "tim",
      age: 27,
      favoriteColor: "red",
    })

    try {
      users.addUser({})
    } catch (err) {
      expect(err.message).toEqual(
        "you need to at least have a name to add a user"
      )
    }
  })

  it("should get a list of all the users, or an empty array other wise", () => {
    const emptyusers = new UserAPI()
    // NEED HELP: it seems like test 1 is affecting this test. its adding one more user using the user object. its happening on line 18.
    expect(users.getUsers()).toHaveLength(5)
    expect(emptyusers.getUsers()).toEqual([])
  })

  it("should update the users but return an error if user is not found or if the object doesn't have an id ", () => {
    const updatedUser = users.updateUserById(updatingUserObject)

    expect(updatedUser).toEqual({
      id: "0",
      name: "minoka",
      age: 100,
      favoriteColor: "red",
    })
    try {
      users.updateUserById(updatingUserObjectError)
    } catch (err) {
      expect(err.message).toEqual("We can not update a user without an id")
    }
    try {
      users.updateUserById(updatingUserObjectErrorWithId)
    } catch (err) {
      expect(err.message).toEqual("There are no users found with that id.")
    }
  })

  it("should be able to delete a user, and it should return the delete user.", () => {
    expect(users.list).toHaveLength(5)

    const deletedUser = users.deleteUserById("3")

    expect(deletedUser).toEqual({
      age: 27,
      favoriteColor: "red",
      id: "3",
      name: "tim",
    })

    expect(users.list).toHaveLength(4)

    try {
      users.deleteUserById("3")
    } catch (err) {
      expect(err.message).toEqual("There are no users found with that id.")
    }
  })
})
