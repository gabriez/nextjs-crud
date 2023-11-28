'use server'
import Joi from "joi"
import axios from "axios";
import { revalidatePath } from 'next/cache'
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const BASEURL = process.env.BACKEND_API;

const schema = Joi.object({
    bestCandidate: Joi.number().required().error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "number.empty":
              err.message = "El campo no puede estar vacío";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    bestCDescription: Joi.string().min(10).max(300).required().error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "string.empty":
              err.message = "El campo no puede estar vacío";
              break;
            case "string.min":
              err.message = `El campo debe tener al menos ${err.local.limit} caracteres`;
              break;
            case "string.max":
              err.message = `El campo debe tener como máximo ${err.local.limit} caracteres`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    worstCandidate: Joi.number().required().error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "number.empty":
              err.message = "El campo no puede estar vacío";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    worstCDescription: Joi.string().min(10).max(300).required().error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "string.empty":
              err.message = "El campo no puede estar vacío";
              break;
            case "string.min":
              err.message = `El campo debe tener al menos ${err.local.limit} caracteres`;
              break;
            case "string.max":
              err.message = `El campo debe tener como máximo ${err.local.limit} caracteres`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    email: Joi.string().email().required().error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "string.empty":
              err.message = "El campo no puede estar vacío";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    media: Joi.string().empty('')
    .default('Not specified')
})


export async function createVote(prevState, formData ) {

    const { error, value } = schema.validate({ 
        bestCandidate: Number(formData.get('bestCandidate')), 
        bestCDescription: formData.get('bestCDescription'), 
        worstCandidate: Number(formData.get('worstCandidate')),
        worstCDescription: formData.get('worstCDescription'), 
        email: formData.get('email'), 
        media: formData.get('media'), 
    
    }, {abortEarly: false});

    if (error) {
        
        return {
            type: 400,
            error: error.details
        }
    }

    
    try {
        const objectSend = value
        console.log(BASEURL)

        await axios.post(`${BASEURL}votes`, objectSend).then(data => data.data).catch(error => console.error(error));
        revalidatePath('/')
        revalidatePath('/admin')
        
        return {
            type: 200, 
            message: 'Se guardó su voto',
            error: []
        }
    } catch (error) {
        return {
            type: 408,
            message: 'Ha ocurrido un error al guardar los datos',
            error: error
        }
    }
    

}