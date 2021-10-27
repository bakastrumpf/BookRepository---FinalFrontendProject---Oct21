import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab } from "@mui/material";
import { Button } from "@mui/material";
import TableDropdown from "./TableDropdown";


const BookList = ({list, onDelete}) => {
    return <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ИД</TableCell>
            <TableCell>Назив</TableCell>
            <TableCell>Аутор</TableCell>
            <TableCell>ИСБН</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.isbn}</TableCell>
              <TableCell>
                  <TableDropdown text="..."
                  items={
                      [
                        {text: "Прегледај", link: true, path: `/book/${row.id}/view`},
                        {text: "Измени", link: true, path: `/book/${row.id}/edit`},
                        {text: "Бриши", link: false, action: () => onDelete(row.id)}
                      ]
                  }
                  />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
}

export default BookList;