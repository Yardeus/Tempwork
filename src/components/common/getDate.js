var options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
}

export const getDate = (str) => {
    var date = new Date(str);
    return date.toLocaleString('ru', options)
}