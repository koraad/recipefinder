
const recipeContainer = document.querySelector('.recipe-container')
const search = document.getElementById('search-btn')
const foodList = document.querySelector('.menu-container')
// const categories = document.querySelector('.categories')

// fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
// .then(res => res.json())
// .then(data => {
//     console.log(data)

// })

// categories.innerText = 

search.onclick = ()=> {

    const userInput = document.getElementById('input').value.trim();

    if(userInput !== '') {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`)
        .then(res => res.json())
        .then(data => {
            if(data.meals) {
                foodList.innerHTML = ''
                data.meals.forEach(meal => {
              
                    foodList.innerHTML += `<div class="card" id="${meal.idMeal}">
                                                <div class="img-bg">
                                                    <img src="${meal.strMealThumb}" alt="" class="product-img">
                                                </div>
                                                
                                                <div class="content-bg">
                                                    <h3 class="name">${meal.strMeal}</h3>
                                                    <button class="card-btn">View Recipe</button>
                                                </div>
                                                
                                            </div>`
                    
                })
                
            } else {

                foodList.innerHTML = ''
                
                let emptyMessage = document.createElement('p')
                emptyMessage.innerText = 'We cannot find any food related to that'
        
                foodList.append(emptyMessage)
            }

        })
    }

    document.getElementById('input').value = ''       
}

foodList.onclick = viewRecipe;

function viewRecipe(e) {
    
    if (e.target.classList.contains('card-btn')) {
        let card = e.target.parentElement.parentElement
        recipeContainer.style.display = 'flex'

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${card.id}`)
        .then(response => response.json())
        .then(data => {

            // console.log(data.meals[0])

            renderContent(data.meals[0])
            
        })
        
    }
}


function renderContent(meal) {
    // console.log(meal)

    let ingredient;
    let measure;
    let ingredients = []

    for(let num=1; num<21;num++) {
        ingredient =`strIngredient${num}`;
        measure = `strMeasure${num}`;
        

        if((meal[ingredient] !== '') && ((meal[measure] !== ' ') || (meal[measure] !== '')) ) {
            console.log(meal[ingredient])
            ingredients += `${meal[ingredient]} :- ${meal[measure]}, `
        }

    }
    
    let html =
        `
        <img src="${meal.strMealThumb}" alt="" class="product-img">
                
        <div class="content">
        
            <h3 class="name">${meal.strMeal}</h3>
            <span>${meal.strCategory}</span><h4>Origin: ${meal.strArea}</h4>
            <h3>Ingredients</h3>
            <p>${ingredients}</p>
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
        </div>


        <i class="bi bi-x-square-fill" id="recipe-close"></i>
        `

        recipeContainer.innerHTML = html;


        const recipeClose = document.getElementById('recipe-close')

        recipeClose.onclick = ()=> {
            recipeContainer.style.display = 'none'
        }
    

    // if(meal.ingredient !== '') {
        
    // }
}