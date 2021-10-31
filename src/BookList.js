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
import { ListRounded } from "@mui/icons-material";

const BookList = ({ list, onDelete }) => {
    return <div className="kartice">
        {list.map((kartice) => (
            <Card key={kartice .id} sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {kartice.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {kartice.author}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {kartice.publishDate}
                    </Typography>
                    <Typography variant="body2">
                        {kartice.rating}
                        <br />
                        <button>
                            <TableDropdown text="..."
                                items={
                                    [
                                        { text: "Прегледај", link: true, path: `/book/${kartice.id}/view` },
                                        { text: "Измени", link: true, path: `/book/${kartice.id}/edit` },
                                        { text: "Обриши", link: false, action: () => onDelete(kartice.id) }
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