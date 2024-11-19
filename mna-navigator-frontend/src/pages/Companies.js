import React, { useState, useEffect } from 'react';
import { fetchCompanies } from '../services/api';

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const getCompanies = async () => {
            try {
                const response = await fetchCompanies();
                console.log('API Response:', response.data); // Debug here
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };
    
        getCompanies();
    }, []);
    return (
        <div>
            <h2>Companies</h2>
            <ul>
                {companies.map((company) => (
                    <li key={company._id}>
                        <h3>{company.name}</h3>
                        <p>Industry: {company.industry}</p>
                        <p>Revenue: ${company.revenue?.toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Companies;

