const months = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
}

export function formatDate(date) {
    let teste = date.split(' ');
    let month = teste[1]
    let day = teste[2]
    let year = teste[3]

    return `${day}/${months[month]}/${year}`
}