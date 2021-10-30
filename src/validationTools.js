import * as yup from 'yup';
import { DateTime } from 'luxon';


export const bookYupSchema = yup.object().shape({
    id: yup.mixed().nullable(true).default(null),
    title: yup.string().ensure().required("Књига мора имати наслов!"),
    author: yup.string().ensure().required("Аутор је обавезно поље."),
    publishDate: yup.date().max(DateTime.now(), "Не може датум скорији од данас."),
    isbn: yup.string().max((13), "ИСБН се састоји од 13 цифара."),
    rating: yup.string().number("Рејтинг књиге на скали 1-5."),
    genre: yup.string().required("Жанр је обавезно поље."),
    available: yup.boolean().required("Књига може бити доступна или недоступна"),
    pages: yup.number().required("Морате унети број страна."),
});

export const toStandardTime = (time) => {
    return time.toFormat("y-MM-dd");
}