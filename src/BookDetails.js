import React, { useState } from "react";
import { Formik } from 'formik'
import './BookDetails.css';
import { bookYupSchema, toStandardTime } from "./validationTools";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker'
import { useHistory } from "react-router-dom";


const BookDetails = ({ startingMode, book, action }) => {
    const [mode, setMode] = useState(startingMode);
    const history = useHistory();
    let message = "";
    let inputProps = {}
    let hideID = false;
    if(mode === "view") {
        message = `Преглед ${book.title} аутора ${book.author}`;
        inputProps = { readOnly: true };
    }else if(mode === "edit") {
        message = `Измена ${book.title} аутора ${book.author}`;
    }else if(mode === "create"){
        message = "Унеси нову књигу";
        hideID = true;
    }
    return <div className="formContent">
        <h3>{message}</h3>
        <Formik
            initialValues={book}
            validationSchema={bookYupSchema}
            onSubmit={(values, {setSubmitting}) => {
                const rez = action(values);
                setSubmitting(false);
                history.go(-1);                
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                validateField,
                isSubmitting
            }) => (
            <form onSubmit={handleSubmit}>                
                {hideID || <TextField
                    fullWidth
                    margin="normal"
                    name="id"
                    label="ИД"
                    value={values.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.id && Boolean(errors.id)}
                    helperText={touched.id && errors.id}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                />}
                <TextField
                    fullWidth
                    margin="normal"
                    name="title"
                    label="Назив"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    variant="outlined"
                    InputProps={inputProps}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="author"
                    label="аутор"
                    value={values.author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.author && Boolean(errors.author)}
                    helperText={touched.author && errors.author}
                    variant="outlined"
                    multiline
                    maxRows={4}
                    InputProps={inputProps}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    name="isbn"
                    label="ИСБН"
                    value={values.isbn}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.isbn && Boolean(errors.isbn)}
                    helperText={touched.isbn && errors.isbn}
                    variant="outlined"
                    InputProps={inputProps}
                />

            <DatePicker
                    margin="normal"
                    name="publishDate"
                    label="Објављено:"
                    value={values.publishDate}
                    readOnly={inputProps.readOnly ? true : false}
                    onChange={(e) => {
                        setFieldValue("publishDate", toStandardTime(e));
                        setFieldTouched("publishDate", true, true);
                        validateField("publishDate");
                    }}
                    onBlur={handleBlur}                    
                    renderInput={(params) => <TextField {...params}/>}
                />
                <span>
                    {(touched.publishDate && Boolean(errors.publishDate)) ? errors.birthday : ""}
                </span><br/>
                <TextField
                    fullWidth
                    margin="normal"
                    name="rating"
                    label="Рејтинг:"
                    value={values.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.rating && Boolean(errors.rating)}
                    helperText={touched.rating && errors.rating}
                    
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="genre"
                    label="Жанр:"
                    value={values.genre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.genre && Boolean(errors.genre)}
                    helperText={touched.genre && errors.genre}
                    
                    variant="outlined"
                />
                <TextField
                fullWidth
                margin="normal"
                name="available"
                label="Доступно:"
                value={values.available}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.available && Boolean(errors.available)}
                helperText={touched.available && errors.available}
                
                variant="outlined"
            />
            <TextField
            fullWidth
            margin="normal"
            name="pages"
            label="Број страна:"
            value={values.pages}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.pages && Boolean(errors.pages)}
            helperText={touched.pages && errors.pages}
            variant="outlined"
        />

                {
                    (mode === "view") ? "" : <Button disabled={isSubmitting} 
                        color="primary" variant="contained" fullWidth type="submit">Сними</Button>
                }
            </form>
            )}
            
        </Formik>        
    </div>
};

BookDetails.defaultProps = {
    book: { "id": null, title: "", author: "", publishDate: "", isbn: "", rating: "", genre: "", available: "", pages: "" },
    startingMode: "view"
}

export default BookDetails;