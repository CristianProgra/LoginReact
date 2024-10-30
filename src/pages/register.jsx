import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';

export default function Register() {
  let {register, handleSubmit, watch, formState: {errors}}= useForm ();
  let contra = watch("contrasena")
  let navigate = useNavigate();
  
  let onsubmited = async (data) => {
    console.log("Datos del formulario", data);
    try {
      let respuesta = await axios.post("http://localhost/loginApi/register", {
        nombre: data.nombre,
        correo: data.correo,
        contrasena: data.contrasena
      });
      alert(respuesta.data.message);      
      navigate("/Login");
      console.log("Respuesta del servidor", respuesta);
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-sm-12'>
            <h1 className='text-center text-primary my-5'>Formulario de Registro</h1>            
          </div>
          <div className='col-sm-6'>
            <form onSubmit={handleSubmit(onsubmited)} className='bg-primary-subtle p-3 rounded'>
              <div className="mb-3">
                <label className="form-label">Nombre de Usuario</label>
                <input {...register("nombre", {required: true})}
                  type="text" className="form-control" aria-describedby="TextHelp" />
                {errors.nombre && <p className='text-danger'>Debes escribir un Nombre de Usuario</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input {...register("correo", {required: true})}
                  type="email" className="form-control" aria-describedby="emailHelp" />
                {errors.correo && <p className='text-danger'>Debes escribir un correo</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input {...register("contrasena", {required: true})}
                  type="password" className="form-control" />
                {errors.contrasena && <p className='text-danger'>La contraseña es obligatoria</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar Password</label>
                <input type="password"
                  {...register("confirmar_contrasena", {
                    required: "Por favor digita la misma contraseña",
                    validate: (value) => value === contra || "La contraseña no es igual"
                  })}
                  className="form-control" />
                {errors.confirmar_contrasena && <p className='text-danger'>{errors.confirmar_contrasena.message}</p>}
              </div>              
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
