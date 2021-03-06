import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVacants, updateVacant } from '../redux/actions/vacant'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import '../styles/dashboard.css'
import ReactQuill from 'react-quill'
import { useHistory } from 'react-router-dom'
import { setAlert } from '../redux/actions/alert'

const DashboardEditVacant = ({match}) => {

    const { errors, handleSubmit, register, control } = useForm()

    const id = match.params.id

    const [vacant, setVacant] = useState({
        title: '',
        description: '',
        job_functions: ''
    });
    const dispatch = useDispatch();
    const history = useHistory();

    const getVacant = async () => {
        const res = await axios.get(`http://3.120.185.254:8090/api/vacant/find/${id}`)
        setVacant({
            title: res.data.data.title,
            description: res.data.data.description,
            job_functions: res.data.data.job_functions
        })
    }
    useEffect(()=>{
        getVacant();
    },[])

    const sendSubmit = (data, e) => {
        const formData = new FormData();
        formData.append('vacant_id',id)
        formData.append('title', data.title);
        formData.append('job_functions',data.job_functions)
        formData.append('description',data.description)

        if (formData) {
            dispatch(updateVacant(formData))
            setTimeout(() => {
                history.push('/administrador/vacantes')
                dispatch(setAlert("Noticia editada correctamente","", 4000))
                dispatch(getVacants(100,1));
            }, 2000);
        }
        e.target.reset();
    }

    return (
        <div className="content-ds-fluid">
            <div className="title-content-ds">
                <h6>Agregar una nueva noticia</h6>
            </div>
            <div className="content-form">
                <div className="">
                    <form onSubmit={handleSubmit(sendSubmit)}>
                        <div className="form-grid">
                            <div>
                                <div className="input-ds">
                                    <div>
                                        <label>Título</label>
                                    </div>
                                    <input
                                        type="text"
                                        defaultValue={vacant.title}
                                        name="title"
                                        ref={
                                            register({
                                                required: {
                                                    value: true,
                                                    message: 'Ingrese el título de la noticia'
                                                }
                                            })
                                        }
                                    />
                                    <div className="error-ds">
                                        {errors.title && errors.title.message}
                                    </div>
                                </div>
                                <div className="input-ds">
                                    <div>
                                        <label>Link de la vacante en compu trabajo</label>
                                    </div>
                                    <input
                                        type="text"
                                        name="job_functions"
                                        defaultValue={vacant.job_functions}
                                        ref={
                                            register({
                                                required: {
                                                    value: true,
                                                    message: 'Ingrese el link de la vacante'
                                                }
                                            })
                                        }
                                    />
                                    <div className="error-ds">
                                        {errors.job_functions && errors.job_functions.message}
                                    </div>
                                </div>
                                <div className="input-ds">
                                    <div><label>Descripción</label></div>

                                    <Controller
                                        control={control}
                                        name="description"
                                        rules={{
                                            validate: "Enter at least 10 words in the description",
                                            required: {
                                                value: true,
                                                message: "Escriba la descripción"
                                            }
                                        }}
                                        error={errors.description}
                                        render={({ onChange, value }) => (
                                            <ReactQuill
                                                style={{height: "450px", color: "#fff"}}
                                                theme="snow"
                                                onChange={(description) => onChange(description)}
                                                value={value || vacant.description}
                                            />
                                        )}
                                    />
                                    <div className="error-ds" style={{ marginTop: "60px" }}>
                                        {errors.description && errors.description.message}
                                    </div>
                                </div>
                                <button style={{ marginTop: "10px" }} type="submit">Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DashboardEditVacant;