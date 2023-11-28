'use server'
import Joi from "joi"
import axios from "axios";
import { revalidatePath } from 'next/cache'
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const BASEURL = process.env.NEXT_PUBLIC_BACKEND_API;

const schema = Joi.object({
    bestCandidate: Joi.string().required().error(errors => {
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
    worstCandidate: Joi.string().required().error(errors => {
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
        bestCandidate: formData.get('bestCandidate'), 
        bestCDescription: formData.get('bestCDescription'), 
        worstCandidate: formData.get('worstCandidate'),
        worstCDescription: formData.get('worstCDescription'), 
        email: formData.get('email'), 
        media: formData.get('media'), 
    
    }, {abortEarly: false});
    value.bestCandidate = Number(value.bestCandidate)
    value.worstCandidate = Number(value.worstCandidate)


    if (error) {
        return {
            type: 400,
            error: error.details
        }
    }

    
    try {
        const objectSend = value

        await axios.post(`${BASEURL}votes`, objectSend);
        revalidatePath('/')
        
        return {
            type: 200, 
            message: 'Se guardó su voto',
            error: []
        }
    } catch (er) {
      
        return {
            type: er.response.data.statusCode,
            message: er.response.data.message,
            error: er.response.error
        }
    }
    

}