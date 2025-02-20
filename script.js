const header = document.querySelector('.calendar h3')
const dates = document.querySelector('.dates')
const navs = document.querySelectorAll('#prev, #next')


//const minListe = ['John', 'Doe', 'Jane', 'Doe']
//localStorage.setItem('plan', JSON.stringify(minListe))
//const liste = JSON.parse(localStorage.getItem('plan'))
//console.log(liste )



const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

let date = new Date()
let month = date.getMonth()
let year = date.getFullYear()
const dateNoteCon = document.getElementById('dateNoteCon')

function setEvent(e) {
    dateSelected = e.textContent
    const dateNoteTitle = document.querySelector('#dateNoteCon h2')
    dateNoteTitle.innerHTML = dateSelected
    dateNoteCon.style.display = "flex"

    document.getElementById('dateNote').value = localStorage.getItem(dateSelected)

    document.getElementById("saveNote").addEventListener("click", function () {
        let dateNote = document.getElementById('dateNote').value
        localStorage.setItem(dateSelected, dateNote)
        dateNoteCon.style.display = "none"
        console.log("funket")
    }, false)

}
function renderCalendar() {

    const start = new Date(year, month, 1).getDay()
    const endDate = new Date(year, month + 1, 0).getDate()
    const end = new Date(year, month, endDate).getDay()
    const endDatePrev = new Date(year, month, 0).getDate()

    let datesHtml = ""
    for (let i = start; i > 0; i--) {
        datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`
    }

    for (let i = 1; i <= endDate; i++) {
        let className = ""
        if (i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            className = ' class="today"'
        } else {
            className = ""
        }
        datesHtml += `<li${className} onClick="setEvent(this)">${i}</li>`
    }
    for (let i = end; i < 6; i++) {
        datesHtml += `<li class="inactive">${i - end + 1}</li>`
    }

    dates.innerHTML = datesHtml
    header.textContent = `${months[month]} ${year}`
}
navs.forEach(function(nav){
    nav.addEventListener('click', (e) => {
        const btnId = e.target.id

        if (btnId === "prev" && month === 0) {
            year--
            month = 11
        } else if (btnId === "next" && month === 11) {
            year++
            month = 0
        } else {
            if (btnId === "next") {
                month = month + 1;
            } else {
                month = month - 1;
            }
        }

        date = new Date(year, month, new Date().getDate())
        year = date.getFullYear()
        month = date.getMonth()

        renderCalendar()
    })
})
renderCalendar()

document.getElementById("save").addEventListener("click", function () {
    let notes = document.getElementById('notes').value
    localStorage.setItem('notes', notes)
    console.log("funket")
}, false)



window.onload = function () {
    document.getElementById('notes').value = localStorage.getItem('notes')
    console.log("lastet inn")
}

