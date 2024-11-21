import React, { useState, useEffect } from 'react';
//import { fetchCompanies } from '../services/api';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        setCompanies([
            { _id: '1', name: 'Acme Corp', industry: 'Technology', revenue: 1000000, description: 'Tech solutions provider' },
            { _id: '2', name: 'Healthify', industry: 'Healthcare', revenue: 200000, description: 'Healthcare startup' },
        ]);
    }, []);
    

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Companies
            </Typography>
            <Grid container spacing={3}>
                {companies.map((company) => (
                    <Grid item xs={12} sm={6} md={4} key={company._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{company.name}</Typography>
                                <Typography>Industry: {company.industry}</Typography>
                                <Typography>Revenue: ${company.revenue?.toLocaleString()}</Typography>
                                <Typography>{company.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Companies;
