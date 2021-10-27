import React, {useState, useMemo, useRef, useEffect} from "react";
import { usePagedBookList, deleteBook, usePagedSearchBookList} from "./accessHooks";
import BookList from "./BookList";
import TablePagination from '@mui/material/TablePagination';
import { Button } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useAuth } from "./useAuth";

const BookSearchPage = () => {
    const [query, setQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("")
    const [login] = useAuth();
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
    ] = usePagedSearchBookList(10, searchQuery);
    if(loading){
        return <h3>Учитавам...</h3>;
    }else{
        return <div>
            <Box sx={{display: "flex", flexDirection:"row", padding: "10px", alignItems: "baseline"}}>
            <Button component={RouterLink} to="/book/new" variant="contained">Dodaj</Button>
            <TextField
                    sx={{flexGrow: 1, marginLeft: "60px"}}
                    margin="normal"
                    name="search"
                    label="Претрага"
                    value={query}
                    onChange={(e) => {
                        const val = e.target.value;
                        setQuery(val);
                    }}
                    variant="outlined"
                />
                <Button sx={{marginLeft: "20px"}} variant="contained" onClick={() => setSearchQuery(query)}>Pokreni pretragu</Button>
                </Box>
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
                labelDisplayedRows={({from, to, count, page}) => `Приказује се страница ${page+1} (${from}-${to+1} од  укупно ${count})`}
                labelRowsPerPage="Редова по страници: "
            />
        </div>
    }
}

export default BookSearchPage;