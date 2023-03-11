const boxes = document.querySelectorAll(".box");//boxes me sare element aa gaye jiske class ka nam box hai (which are 9)
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [//ye sare pair hai jo win wale
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];



// let's create a function to initialise the game
function initGame() {//is function se har chij start hota hai
    currentPlayer = "X";//starting me X dikhe in side of current player that's why we write this
    gameGrid = ["","","","","","","","",""];//starting me sare box empty ho isliye "" har index pe hai 
    
    boxes.forEach((box, index) => {//UI pr empty bhi karna padega boxes ko ,opar vale se box empty ho jata hai but dikhta ni ui me empty so ui pe bhi empty ho jay isliye ye line likhe
        box.innerText = "";//box ke innertext me empty krna hoga
        boxes[index].style.pointerEvents = "all";//yani pointer event kam karne lagega i.e cursor pointer me change ho jayga
       
        box.classList = `box box${index+1}`; //one more thing is missing, initialise box with css properties again
    });
    newGameBtn.classList.remove("active");//we add here active clas in classlist of newGameBtn , yani hamne newGameBtn ko invisible kar diya
    gameInfo.innerText = `Current Player - ${currentPlayer}`;//gameInfo ke innerText me:= Current Player - ${currentPlayer} , i.e Current Player - X
}

initGame();//is function ko hamne call kr dia

function swapTurn() {//ye function bas turn change karta hai,agar x hai to 0 kardega and vice versa
    if(currentPlayer === "X") {//agar currentPlayer Xhai tb
        currentPlayer = "O";//0 kardo
    }
    else {
        currentPlayer = "X";//agar currentPlayer 0 hai to X kar do
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;//jab turn change kar diye tab ui pe bhi update karna hoga so we write this line
}

function checkGameOver() {//ye function check karta hai ki game over hoa ya ni 
    let answer = "";//pehele answer empty hai

    winningPositions.forEach((position) => {//yani har winningPosition ke liye ,position hai as aparameter 
        //all 3 boxes should be non-empty and exactly same in value(YAANI SAREBOX EMPTY ni  HAI ,SARE BOX EQUAL HAI)
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {//agar sab empty ni hai,aur equal bhi hai ek dusre ke tb 

                //check if winner is X
                if(gameGrid[position[0]] === "X") //pehla element X hai tab 
                    answer = "X";//answer is X
                else {//ni to
                    answer = "O";//answer is O
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {//jaise hi winner mila hame ham likhne hi ni denge so   box.style.pointerEvents = "none" yani pointer ab kam hi ni karega
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");//ab winner mil gaya hai hame so boxes[position[0]] ke classList me win likh do i.e first element 
                boxes[position[1]].classList.add("win");//ab winner mil gaya hai hame so boxes[position[1]] ke classList me win likh do i.e second element 
                boxes[position[2]].classList.add("win");//ab winner mil gaya hai hame so boxes[position[1]] ke classList me win likh do i.e third element 
            }
    });
  //  agar yaha tak execute ho gaya line yani hame winner ya looser pata chal gaya hai,
    //it means we have a winner
    if(answer !== "" ) {//agar answer empty ni hai (yani winner hai koi )
        gameInfo.innerText = `Winner Player - ${answer}`;// gameInfo ke innerText me  `Winner Player - ${answer}` dal do
        newGameBtn.classList.add("active");// newGameBtn ke classList me active class ko add kardo i.e  newGameBtn ko dikhado
        return;//ab chuki har chij ho gaya so bhak jao bhak jao 
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;// yaha tak aa gye yani winner ni mila hame it only means draw ho gaya ge(agar winner millta to answer update ho jata to ye if(answer !== "" ) line true hota to osif me jate to vai se return ho jata)
    gameGrid.forEach((box) => {//gameGrid ke har ek box ke liye ,box is parameter 
        if(box !== "" )//agar box empty ni hai tb
            fillCount++;//fillcount ++
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {//agar game draw ho gaya to sara box fill ho gaya hoga,so agar fillCount equal to  then
        gameInfo.innerText = "Game Tied !";//gameInfo ke innerText me Game Tied  ye likh do
        newGameBtn.classList.add("active");//newGameBtn ke classList me active class ko add kardo i.e newGame ko dikha do
    }

}

function handleClick(index) {//isme index is a paameter
    if(gameGrid[index] === "" ) {//gameGrid ka vo index empty hai tb
        boxes[index].innerText = currentPlayer;//boxes[index] ke innerText me currentPlayer dal do
        gameGrid[index] = currentPlayer;//gameGrid[index] me currentPlayer dal do
        boxes[index].style.pointerEvents = "none";//abos box pe pointer na kam kare
        //swap karo turn ko
        swapTurn();//turn ko swap kar do
        //check koi jeet toh nahi gya
        checkGameOver();//checkGame over hoaya ni
    }
}

boxes.forEach((box, index) => {//har ek boxes ke liye (here box ke sathona index bhi dala hamne )
    box.addEventListener("click", () => {//jaise hi box pe click karenge
        handleClick(index);//ye vala function call ho jayga
    })
});
//

newGameBtn.addEventListener("click", initGame);//newGameBtn ispe jaise hi click karenge vaise hi initGame vala unction call ho jayga


