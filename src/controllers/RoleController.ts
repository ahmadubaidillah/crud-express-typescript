import { Request,Response } from "express";
import Role from "../db/models/Role"

const getRole = async (req:Request, res:Response):Promise<Response> => {
try {
    const roles = await Role.findAll({
        where: {
            active: true
        }
    })
    return res.status(200).send({
        status:200,
        message:'OK',
        data:roles
    })
} catch (error:any) {
    if(error != null && error instanceof Error) {
        return res.status(500).send({
            status:500,
            message:error.message,
            errors:error
        })
    }
    return res.status(500).send({
        status:500,
        message:'internal server error',
        errors:error
    })
}}

const createRole = async (req:Request,res:Response):Promise<Response> => {
    try {
        const {roleName} = req.body
        const role = await Role.create({roleName,active:true})

        return res.status(201).send({
            status: 201,
            message: 'Role created successfully',
            data: role
        })
    } catch (error:any) {
        if(error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                error: error
            })
    }
    return res.status(500).send({
        status:500,
        message:'Internal Server Error',
        error: error
    })
}}

const updateRole = async (req:Request,res:Response):Promise<Response> => {
    try {
        const {id} = req.params
        const {roleName} = req.body
        const role = await Role.findByPk(id)

        if(!role) {
            return res.status(404).send({
                status:404,
                message: 'Data not found',
                data:null
            })
        }
        if (roleName !== undefined) {
            role.roleName = roleName;
        }        
        await role.save()

        return res.status(200).send({
            status:200,
            message: 'Role Updated successfully',
            data:role
        })
    } catch (error:any) {
        if(error != null && error instanceof Error){
            return res.status(500).send({
                status:500,
                message: error.message,
                error: error
            })
        }
        return res.status(500).send({
            status:500,
            message:'internal server error',
            error: error
        })
    }
    
}

const deleteRole = async (req:Request,res:Response):Promise<Response> => {
    try {
        const {id}=req.params
        const role = await Role.findByPk(id)

        if(!role) {
            return res.status(404).send({
                status:404,
                message: 'Role not found'
            })
        }
        await role.destroy()   

        return res.status(200).send({
            status:200,
            message:'Role deleted successfully',
            data:null
        })
     } catch (error:any) {
        if(error != null && error instanceof Error){
            return res.status(500).send({
                status:500,
                message:error.message,
                error:error
            })
    }
    return res.status(500).send({
        status:500,
        message:'Internal Server Error',
        error:error
    })
}}


export default {getRole,createRole,updateRole,deleteRole}