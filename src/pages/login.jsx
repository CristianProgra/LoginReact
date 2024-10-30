
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login({onLogin}) {
    let {register, handleSubmit, formState: {errors}}= useForm ();
    let navigate = useNavigate();
    let onsubmited = async (data)=>{
        console.log("Datos del formulario");
        console.log(data);
        try {
            let respuesta = await axios.post("http://localhost/loginApi/login",data);
            alert("Bienvenido " +respuesta.data.nombre);
            onLogin(respuesta.data.nombre);
            navigate("/Dashboard");
            console.log("Respuesta del servidor");
            console.log(respuesta);
            
        } catch (error) {
            console.log(error);
            alert("El usuario y/o contraseña es incorrecto")
            
        }
    }
  return (
    <>
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-sm-12'>
                <h1 className='text-center text-primary my-5'>INGRESAR</h1>            
            </div>
            <div className='col-sm-6'>
            <form onSubmit={handleSubmit(onsubmited)} className='bg-primary-subtle p-3 rounded'>
                <div className="mb-3" >
                    <label className="form-label">Correo</label>
                    <input {...register("correo", {required:true})}
                     type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    {errors.correo && <p className='text-danger'>Debes escribir un correo</p>}

                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input {...register("contrasena", {required:true})}
                     type="password" className="form-control" id="exampleInputPassword1"/>
                     {errors.contrasena && <p className='text-danger'>La contraseña es obligatoria</p>}
                </div>                
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}
