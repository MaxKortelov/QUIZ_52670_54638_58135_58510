import {getUsers} from "../api";
import {ICustomRequest, IUser, IUserData} from "../models/user";
import {NextFunction, Response} from "express";

export async function findUser(userData: IUserData): Promise<IUser> {
  // const user = await getUsers().then(({data: users}) => {
  //   return users.find(user => user.email === userData.email && user.password === userData.password)
  // });
  return {
    id: "123",
    email: userData.email,
    roles: [],
    apiKey: "123",
    password: "123",
    profile: {
      "name": "Max",
      "company": "Test",
      "dob": "123",//Date
      "address": "123",
      "location": {
        "lat": 123,
        "long": 123,
      },
      password: "123",
      username: "123",
      createdAt: "123",// Date
      updatedAt: "123",// Date
    }
  } 
  // if (user) {
  //   return user
  // }
  // throw new Error("User doesn't exist")
}

export async function verifyToken(req: ICustomRequest, res: Response, next: NextFunction) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const user = await getUsers().then(({data: users}) => {
      // @ts-ignore
      return users.find(user => user.apiKey === req.headers.authorization.split(' ')[1])
    })
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401)
        .send({
          message: 'No user found'
        });
    }
  } else {
    res.status(401)
      .send({
        message: 'No auth data'
      });
  }
}