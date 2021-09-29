import { Router } from 'express'
const express = require('express')
import { PrismaClient } from '@prisma/client'

const api = Router()
api.use(express.json());

/** GET /api/users > Retrieve all users */
api.get('/', async (_, response) => {
  const prisma = new PrismaClient()
  try {
    response.json({ data: { users: await prisma.user.findMany() } })
  }
  catch(e){
    response.end({e})
  }
})

api.post('/' , async (request, response) => {
  console.log(request.body.email)
  const prisma = new PrismaClient()
  try{
    const user =  await prisma.user.create({
      data: {
        email: request.body.email
      },
    })
    response.sendStatus(200)
  }
  catch(e){
    console.log(e)
    response.end({e})
  }
})

api.delete('/', async (request, response) => {
  console.log(request.body.id)
  const prisma = new PrismaClient()
  try{
    await prisma.user.delete({
      where:{
        id: request.body.id
      }
    })
    response.sendStatus(200)
  }
  catch(e){
    console.log(e)
    response.end({e})
  }
})

api.put('/', async(request, response) => {
  console.log(request.body)
  const prisma = new PrismaClient()
  try{
    const updateUser = await prisma.user.update({
      where: {
        id: request.body.id,
      },
      data: {
        email: request.body.email
      },
    })
  }
  catch(e){
    console.log(e)
    response.send({e})
  }
})

export default api