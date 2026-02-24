import Joi, { ObjectSchema } from 'joi';

import { NextFunction, Response, Request } from 'express';
import { CreateIUser, UpdateIUser } from '../models/User';
import { IBook, UpdateIBook } from '../models/Book';

export function ValidateSchema(schema: ObjectSchema, property:string) {
  return async (req:Request, res:Response, next:NextFunction) => {
    try {
      switch(property) {
        case 'query':
          await schema.validateAsync(req.query);
          break;
        case 'params':
          await schema.validateAsync(req.params);
          break;
        default:
          await schema.validateAsync(req.body);
      }
      next();
    } catch (error) {
      res.status(422).json({message: "Object validation failed, please include a valid object"});
    }
  }
}

export const Schemas = {
  user: {
    create: Joi.object<CreateIUser>({
      type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
      password: Joi.string().required()
    }),
    login: Joi.object<{email:string, password:string}>({
      email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
      password: Joi.string().required()
    }),
    userId: Joi.object<{userId:string}>({
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    update: Joi.object<UpdateIUser>({
      _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
      password: Joi.string()
    })
  },
  book: {
    create: Joi.object<IBook>({
      barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required(),
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().required(),
      description: Joi.string().required(),
      subjects: Joi.array().required(),
      publicationDate: Joi.date().required(),
      publisher: Joi.string().required(),
      pages: Joi.number().required(),
      genre: Joi.string().required()
    }),
    update: Joi.object<UpdateIBook>({
      _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required(),
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().required(),
      description: Joi.string().required(),
      subjects: Joi.array().required(),
      publicationDate: Joi.date().required(),
      publisher: Joi.string().required(),
      pages: Joi.number().required(),
      genre: Joi.string().required()
    }),
    delete: Joi.object<{barcode:string}>({
      barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required()
    })
  }
}