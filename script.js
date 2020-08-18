const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();


let ticketPrice = +movieSelect.value;



const setMovieData = (movieIndex,moviePrice) =>{
localStorage.setItem('movieSelectedIndex',movieIndex);
localStorage.setItem('movieSElectedPrice',moviePrice);
}


function updatedSelectedCount() {
    const seatsSelected = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = seatsSelected.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice ;

    const seatIndexs = [...seatsSelected].map(function(seat){
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('selectedSeats',JSON.stringify(seatIndexs))
}

  
function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
               
            }
        })
    }
    const selectedMoviesIndex = localStorage.getItem('movieSelectedIndex');
    if(selectedMoviesIndex !== null){
        movieSelect.selectedIndex = selectedMoviesIndex
    }
}
container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updatedSelectedCount();
    }
})

movieSelect.addEventListener('change',(e) => {
    ticketPrice = +e.target.value;
     updatedSelectedCount();
     setMovieData(e.target.selectedIndex,e.target.value);

})
 
updatedSelectedCount();