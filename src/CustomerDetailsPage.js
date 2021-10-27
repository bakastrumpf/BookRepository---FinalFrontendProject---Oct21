import React from 'react';
import { useParams } from 'react-router-dom';
import { useCustomer, updateCustomer } from './accessHooks';
import CustomerDetails from './CustomerDetails';
import { useAuth } from './useAuth';
import { CircularProgress } from '@mui/material';

const CustomerDetailsPage = () => {
    const {cid, operation} = useParams();
    const [customer, loading] = useCustomer(cid);
    const [login] = useAuth();
    if(loading){
        return <CircularProgress/>
    }else{
        return <CustomerDetails 
            customer={customer} 
            startingMode={operation}
            action={(operation === "edit") ? (customer) => updateCustomer(customer, login) : undefined}
        />
    }
};

export default CustomerDetailsPage;