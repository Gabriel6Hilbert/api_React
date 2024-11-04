import React, { useState } from 'react';
import './EmpresaForm.css';

function EmpresaForm({empresaData}) {
    const [formData, setFormData] = useState ({
        nome: empresaData.nome || "",
        cnpj: empresaData.cnpj || "",
        situacao: empresaData.situacao || "",
        abertura: formatarData(empresaData.abertura) || "",
        naturezaJuridica: empresaData.natureza_juridica || "",
        cep: empresaData.cep || "",
        logradouro: empresaData.logradouro || "",
        numero: empresaData.numero || "",
        municipio: empresaData.municipio || "",
        uf: empresaData.uf || "",
        capitalSocial: empresaData.capital_social || "",
        status: empresaData.status || "",
        atividadePrincipal: empresaData.atividade_principal
            ? empresaData.atividade_principal.map(a => `${a.code} - ${a.text}`).join(", ")
            : "",
        atividadeSecundaria: empresaData.atividades_secundarias
            ? empresaData.atividades_secundarias.map(a => `${a.code} - ${a.text}`).join(", ")
            : ""
    })

    function formatarData(data) {
        if(data) {
            const [dia, mes, ano ] = data.split('/');
            return `${ano}-${mes}-${dia}`
        }
        return "";
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]:value});
    }


    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/empresa/salvar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Empresa salva com sucesso!");
            } else {
                alert("Falha ao salvar a empresa.");
            }
        } catch (error) {
            console.error("Erro ao salvar a empresa:", error);
            alert("Ocorreu um erro ao salvar a empresa.");
        }
    }


    return (
        <div className="container mt-4 p-4 rounded form-background">
        <h3 className="text-center mb-4">Dados da Empresa</h3>
        <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
            {[
                { label: "Nome da Empresa", name: "nome" },
                { label: "CNPJ", name: "cnpj" },
                { label: "Situação", name: "situacao" },
                { label: "Data de Abertura", name: "abertura", type: "date" },
                { label: "Natureza Jurídica", name: "naturezaJuridica" },
                { label: "CEP", name: "cep" },
                { label: "Logradouro", name: "logradouro" },
                { label: "Número", name: "numero" },
                { label: "Município", name: "municipio" },
                { label: "UF", name: "uf" },
                { label: "Capital Social", name: "capitalSocial" },
                { label: "Status", name: "status" },
                { label: "Atividade Principal", name: "atividadePrincipal" },
                { label: "Atividades Secundárias", name: "atividadeSecundaria" }
            ].map(({ label, name, type = "text" }) => (
                <div className="col-md-6" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                    />
                </div>
            ))}
            <div className="col-12">
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Salvar Empresa
                </button>
            </div>
        </form>
    </div>
    );

}

export default EmpresaForm;