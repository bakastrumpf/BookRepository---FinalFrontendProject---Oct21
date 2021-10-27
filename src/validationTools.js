import * as yup from 'yup';
import { DateTime } from 'luxon';


export const customerYupSchema = yup.object().shape({
    id: yup.mixed().nullable(true).default(null),
    firstName: yup.string().ensure().required("Mora se uneti ime"),
    lastName: yup.string().ensure().required("Mora se uneti prezime"),
    birthday: yup.date().max(DateTime.now(), "Ne može datum skoriji od danas"),
    joinDay: yup.date().max(DateTime.now(), "Ne može datum skoriji od danas"),
    email: yup.string().email("Mora biti formatirano kao adresa elektronske pošte").required("Mora se uneti adresa elektronske pošte"),
    address: yup.string().required("Adresa je neophodno polje")
});

export const toStandardTime = (time) => {
    return time.toFormat("y-MM-dd");
}