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

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const BookList = ({ list, onDelete }) => {
    return <div className="kartice">
        {list.map((row) => (
            <Card key={row.id} sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {row.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {row.author}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {row.publishDate}
                    </Typography>
                    <Typography variant="body2">
                        {row.rating}
                        <br />
                        <button>
                            <TableDropdown text="..."
                                items={
                                    [
                                        { text: "Прегледај", link: true, path: `/book/${row.id}/view` },
                                        { text: "Измени", link: true, path: `/book/${row.id}/edit` },
                                        { text: "Обриши", link: false, action: () => onDelete(row.id) }
                                    ]
                                }
                            />
                        </button>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Детаљније</Button>
                </CardActions>
            </Card>
        ))}
    </div>;
}

export default BookList;