import React from 'react'
import { Link } from 'react-router-dom'

const Etic = () => {
    return (
        <div className="etic-pro" style={{ background: "#005286", paddingTop: "100px", paddingBottom: "100px" }}>
            <div className="container-grid">
                <div className="info-container">
                    <div className="title-white-container">
                        <h6 style={{ fontSize: "30px" }}>Línea Ética de Carvajal</h6>
                    </div>
                    <p style={{ color: "#fff", marginBottom: "60px" }}>Carvajal ha puesto a su disposición este sitio web para que colaboradores, clientes y proveedores puedan informar de manera segura y confidencial, sobre comportamientos no éticos y violaciones a los principios, valores y políticas de la Organización Carvajal.</p>
                    <div className="btn-access" >
                        <Link to="/">Ingrese aquí</Link>
                    </div>
                </div>
                <div className="post-img-card-rigth etic">
                    <div className="square-img-card right-up">
                    </div>
                    <div className="img-card">
                        <img src={require('../images/img/carbajalempresa.png')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Etic;