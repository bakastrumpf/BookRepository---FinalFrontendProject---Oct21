import React, {useState} from "react";
import { usePagedCustomerList, deleteCustomer} from "./accessHooks";
import CustomerList from "./CustomerList";
import TablePagination from '@mui/material/TablePagination';
import { Button } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';

import {useAuth} from './useAuth';

const AllCustomersPage = () => {
    const [
        list,
        location,
        loading,
        error,
        pages,
        page,
        forward,
        back,
        goToPage,
        length,
        pageSize,
        setPageSize,
        reload
    ] = usePagedCustomerList(10);
    const [login] = useAuth();
    if(loading){
        return <h3>Loading...</h3>;
    }else{
        return <div>
            <Button component={RouterLink} to="/customer/new" variant="contained">Додај</Button>
            <CustomerList list={list} onDelete={(id) => {
                deleteCustomer(id, login);
                reload();
                }}/>
            <TablePagination
                component="div"
                count={length}
                page={page-1}
                onPageChange={(e, p) => goToPage(p)}
                rowsPerPage={pageSize}
                onRowsPerPageChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                }}
                labelDisplayedRows={({from, to, count, page}) => `Prikazujem stranicu ${page+1} (${from}-${to+1} od ukupno ${count})`}
                labelRowsPerPage="Redova po stranici: "
            />
        </div>
    }
}

export default AllCustomersPage;