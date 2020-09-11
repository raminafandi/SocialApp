const getDate = () => {
    let date = new Date();
    date =
        date.getUTCFullYear() +
        '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) +
        '-' +
        ('00' + date.getUTCDate()).slice(-2) +
        ' ' +
        ('00' + date.getUTCHours()).slice(-2) +
        ':' +
        ('00' + date.getUTCMinutes()).slice(-2) +
        ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
    return date;
}

export { getDate }