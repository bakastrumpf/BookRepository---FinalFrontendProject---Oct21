import React, {useState} from "react";
import { usePagedBookList, deleteBook} from "./accessHooks";
import BookList from "./BookList";
import TablePagination from '@mui/material/TablePagination';
import { Button } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';

import {useAuth} from './useAuth';

const AllBooksPage = () => {
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
    ] = usePagedBookList(10);
    const [login] = useAuth();
    if(loading){
        return <h3>Учитавам...</h3>;
    }else{
        return <div>
            <Button component={RouterLink} to="/books/new" variant="contained">Додај</Button>
            <BookList list={list} onDelete={(id) => {
                deleteBook(id, login);
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
                labelDisplayedRows={({from, to, count, page}) => `Прикаазујем страницу ${page+1} (${from}-${to+1} од укупно ${count})`}
                labelRowsPerPage="Редова по страници: "
            />
        </div>
    }
}

export default AllBooksPage;