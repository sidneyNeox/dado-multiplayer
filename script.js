let images = ["dice-01.png",
    "dice-02.png",
    "dice-03.png",
    "dice-04.png",
    "dice-05.png",
    "dice-06.png"];
let dice1 = document.querySelector('#dice-1');
let dice2 = document.querySelector('#dice-2');
let resultDice1 = document.querySelector('#resultDice1');
let resultDice2 = document.querySelector('#resultDice2');
let buttonPlayer1 = document.querySelector('#buttonPlayer1');
let buttonPlayer2 = document.querySelector('#buttonPlayer2');
let buttonRestart = document.querySelector('#buttonRestart');
let firstPlayerPoints = 0;
let secondPlayerPoints = 0;
let diceFirstValue = 0;
let iceSecondValue = 0;
let round = 0;

const setButtonFirst = () => {
    buttonPlayer1.disabled = true;
    buttonPlayer1.classList= ''
    buttonPlayer1.classList.add('offline')
    buttonPlayer2.disabled = false;
    buttonPlayer2.classList= ''
    buttonPlayer2.classList.add('online')
    buttonRestart.disabled = false;
}

const setButtonSecond = () => {
    buttonPlayer1.disabled = false;
    buttonPlayer1.classList= ''
    buttonPlayer1.classList.add('online')
    buttonPlayer2.disabled = true;
    buttonPlayer2.classList= ''
    buttonPlayer2.classList.add('offline')
    buttonRestart.disabled = false;
}

const setButtonReset = () => {
    buttonPlayer1.disabled = true;
    buttonPlayer1.classList= ''
    buttonPlayer1.classList.add('offline')
    buttonPlayer2.disabled = true;
    buttonPlayer2.classList= ''
    buttonPlayer2.classList.add('offline')
    buttonRestart.disabled = false;
}

const setButtonRestart = () =>{
    buttonPlayer1.disabled = false;
    buttonPlayer1.classList= ''
    buttonPlayer1.classList.add('online')
    buttonPlayer2.disabled = true;
    buttonPlayer2.classList= ''
    buttonPlayer2.classList.add('offline')
    buttonRestart.disabled = false;
}

const roll = () => {
    return Math.floor(Math.random() * 6);
}

const DiceRoll= (elemento, classe, result, diceValue) => {
    elemento.classList.add(classe);
    setTimeout(() => {
        elemento.classList.remove(classe);
        elemento.setAttribute("src", `imgs/${images[diceValue]}`);
        result.innerHTML = `${diceValue + 1}`
    }, 1000);
}

buttonPlayer2.disabled = true
buttonPlayer2.classList.add('offline')

buttonPlayer1.addEventListener('click', () => {
    diceFirstValue = roll();
    console.log(`O primeiro valor é: ${diceFirstValue}`)
    DiceRoll(dice1, 'rolling', resultDice1, diceFirstValue);
    setButtonFirst()
    document.querySelector('#round').innerHTML = round + 1;
});

buttonPlayer2.addEventListener('click', () => {
    diceSecondValue = roll();
    console.log(`O segundo valor é: ${diceSecondValue}`)
    DiceRoll(dice2, 'rolling', resultDice2, diceSecondValue);
    setTimeout(() => {
        verifyRoundWin()
    }, 1000);
    setButtonSecond()
});

const verifyRoundWin = () =>{
    if (diceFirstValue > diceSecondValue){
        firstPlayerPoints++;
        round++;
    }else if ( diceSecondValue > diceFirstValue){
        secondPlayerPoints++
        round++;
    }else{
        round++;
    }
    verifyGame()
}

const verifyGame = () => {
    if (round === 10){
        if (firstPlayerPoints > secondPlayerPoints){
            document.querySelector('#result').innerHTML = `Jogador 1 venceu o jogo!`;
            setButtonReset();
        }else if ( secondPlayerPoints > firstPlayerPoints){
            document.querySelector('#result').innerHTML = `Jogador 2 venceu o jogo!`;
            setButtonReset();
        }else{
            document.querySelector('#result').innerHTML = `Empatou o jogo!`;
            setButtonReset();
        }
    }
}

const resetGame = () =>{
    firstPlayerPoints = 0;
    secondPlayerPoints = 0;
    round = 0
    setButtonRestart()
    document.querySelector('#resultDice1').innerHTML = `1`
    document.querySelector('#resultDice2').innerHTML = `1`
    document.querySelector('#round').innerHTML = ``
    document.querySelector('#winnerText').innerHTML = `Inicie o jogo`
    document.querySelector('#result').innerHTML = `Quem será que vai vencer?`
    dice1.setAttribute("src", `imgs/dice-01.png`);
    dice2.setAttribute("src", `imgs/dice-01.png`);
}

buttonRestart.addEventListener('click', () => {
    resetGame();
});
