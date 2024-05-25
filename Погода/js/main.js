const APIKEY='e1d1e56f53d4af1f302a370a536843b4'

const $cardsBox = document.getElementById('cards_box')
const $locationForm = document.getElementById('location_form')
const $locationInput = document.getElementById('location_form_input')
let currentCard=null

async function getWeatherData(location){
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`)

  const data = await response.json()

  return data
}

function getNewCard(){
    const $card=document.createElement('div')
    $card.classList.add('card')

    $card.innerHTML=`                      
                        <div class="card_iner">
                        <div class="card_head">
                          <div class="card_head_left">
                            <div class="card_icon"></div>
                            <div class="card_head_left_title">
                              <h3 class="card_title"></h3>
                              <span class="card_desc"></span>
                            </div>
                          </div>
                          <div class="card_head_right card_param">
                            <svg class="card_param_icon" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" >
                              <path 
                                d="M12 15.9998C11.4477 15.9998 11 16.4475 11 16.9998C11 17.5521 11.4477 17.9998 12 17.9998C12.5523 17.9998 13 17.5521 13 16.9998C13 16.4475 12.5523 15.9998 12 15.9998ZM12 15.9998V12M12 16.9998L12.0071 17.0069M16 16.9998C16 19.209 14.2091 20.9998 12 20.9998C9.79086 20.9998 8 19.209 8 16.9998C8 15.9854 8.37764 15.0591 9 14.354L9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V14.354C15.6224 15.0591 16 15.9854 16 16.9998Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span class="card_param_text">
                              <span class="card_param_value card_param_value_temp"></span>
                              <sup>o</sup>C
                            </span>
                          </div>
                        </div>
                        <div class="card_footer">
                            <div class="card_footer_left card_param">
                              <svg class="card_param_icon card_param_icon_footer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><title>wind</title>
                                <path 
                                d="M616.67,442h-550a31,31,0,1,0,0,62h550A85.67,85.67,0,1,1,531,589.67V573a31,31,0,0,0-62,0v16.67c0,81.42,66.24,147.66,147.67,147.66s147.66-66.24,147.66-147.66S698.09,442,616.67,442Z"/>
                                
                                <path d="M66.67,404h550c81.42,0,147.66-66.24,147.66-147.67A148.21,148.21,0,0,0,616.67,108.67C535.24,108.67,469,174.91,469,256.33V273a31,31,0,0,0,62,0V256.33A85.52,85.52,0,1,1,616.67,342h-550a31,31,0,0,0,0,62Z"/>
                                <path 
                                d="M66.67,304H310.33A120.67,120.67,0,1,0,189.67,183.33V196a31,31,0,0,0,62,0V183.33A58.67,58.67,0,1,1,310.33,242H66.67a31,31,0,0,0,0,62Z"/>
                              </svg>
                              <span class="card_param_text_footer">
                                <span class="card_param_value card_param_value_wind"></span>м/c
                              </span>
                            </div>

                          <div class="card_footer_right card_param">
                            <svg class="card_param_icon card_param_icon_footer" viewBox="0 0 800 800">
                              <path 
                              d="M88.63,228.84c1.68.66,41.45,16.31,69.62,24.26a298.1,298.1,0,0,0,81.65,11.31c60.5,0,115.67-17.65,169.55-34.88,71.53-22.89,139.1-44.5,215.47-23,25.1,7.08,63.21,22.07,63.7,22.27a31,31,0,0,0,22.76-57.68c-1.68-.66-41.46-16.31-69.63-24.26-94.31-26.61-174.07-1.1-251.2,23.57-71.53,22.89-139.1,44.5-215.47,23-25.14-7.09-63.32-22.12-63.71-22.27a31,31,0,0,0-22.74,57.68Z"/>
                              
                              <path d="M711.37,371.16c-1.68-.66-41.45-16.31-69.62-24.26-94.31-26.61-174.07-1.1-251.2,23.57-71.53,22.89-139.11,44.5-215.47,23-25.14-7.09-63.33-22.12-63.71-22.27a31,31,0,1,0-22.74,57.68c1.68.66,41.45,16.31,69.62,24.26a298.1,298.1,0,0,0,81.65,11.31c60.51,0,115.67-17.65,169.54-34.88,71.54-22.89,139.12-44.5,215.48-23,25.1,7.08,63.22,22.08,63.71,22.27a31,31,0,0,0,22.74-57.68Z"/>
                              <path 
                              d="M711.37,571.16c-1.68-.66-41.45-16.31-69.62-24.26-94.31-26.61-174.07-1.1-251.2,23.57-71.53,22.89-139.1,44.5-215.47,23-25.14-7.09-63.33-22.12-63.71-22.27a31,31,0,1,0-22.74,57.68c1.68.66,41.45,16.31,69.62,24.26a298.1,298.1,0,0,0,81.65,11.31c60.51,0,115.67-17.65,169.54-34.88,71.54-22.89,139.12-44.5,215.48-23,25.1,7.08,63.22,22.08,63.71,22.27a31,31,0,0,0,22.74-57.68Z"/>
                            </svg>
                            <span class="card_param_text_footer">
                              <span class="card_param_value card_param_value_humidity"></span>%
                            </span>
                          </div>
                        </div>
                        </div>                 
    `

    return {
        $card,
        $icon: $card.querySelector(".card_icon"),
        $title: $card.querySelector(".card_title"),
        $temp: $card.querySelector(".card_param_value_temp"),
        $desc: $card.querySelector(".card_desc"),
        $wind: $card.querySelector(".card_param_value_wind"),
        $humidity: $card.querySelector(".card_param_value_humidity"),
    }
}

$locationForm.addEventListener('submit', function(event) {
    event.preventDefault()

     const newCard = getNewCard()

     const location = $locationInput.value.trim()
     $locationInput.value = ''

     $cardsBox.prepend(newCard.$card)

    setTimeout(async function() {
        newCard.$card.classList.add("loading")

        const data = await getWeatherData(location)

        newCard.$icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`

        newCard.$title.textContent = data.name
        newCard.$desc.textContent = data.weather[0].description
        newCard.$temp.textContent = data.main.temp
        newCard.$wind.textContent = data.wind.speed
        newCard.$humidity.textContent = data.main.humidity

        console.log(data);

        setTimeout(function(){
           //поднятие в верх
          document.querySelector('.app_container').classList.add('.app_container-top')
          // смена фона
          document.body.style.backgroundImage = `url(img/bg/${data.weather[0].icon}.jpeg)`
          // if (){

          // }
          //добавление карты
          if(currentCard!= null){
            currentCard.$card.classList.add("glass")
          }
          currentCard=newCard

          newCard.$card.classList.remove("loading")
          newCard.$card.classList.add("full") 
        
        }, 800)
         

    }, 30)
    
})