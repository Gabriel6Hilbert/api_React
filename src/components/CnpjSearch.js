import React, { useState } from 'react';
import EmpresaForm from './EmpresaForm';

function formatarCnpj(cnpj) {
    return cnpj.replace(/[^\d]/g, "");
}

function CnpjSearch() {
    const [cnpj, setCnpj] = useState('');
    const [empresaData, setEmpresaData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const cnpjFormatado = formatarCnpj(cnpj);
            if (!cnpjFormatado) {
                setError("Por favor, insira um CNPJ válido.");
                return;
            }
            
            const response = await fetch(`http://localhost:8080/empresa/cnpj/${cnpjFormatado}`);
            if (!response.ok) throw new Error("Empresa não encontrada");

            const data = await response.json();
            setEmpresaData(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setEmpresaData(null);
        }
    };

    return (
        <div>
            <h2>Buscar Empresa por CNPJ</h2>
            <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="Digite o CNPJ"
            />
            <button onClick={handleSearch}>Buscar</button>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {empresaData && <EmpresaForm empresaData={empresaData} />}
        </div>
    );
}

export default CnpjSearch;
