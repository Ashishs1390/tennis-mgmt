import moment from 'moment';
export function getDateYYYYMMDD(date) {
    return moment(date).format('YYYY-MM-DD');
}