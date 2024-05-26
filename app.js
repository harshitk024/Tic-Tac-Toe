document.addEventListener("DOMContentLoaded",()=>{

   const main  = document.querySelector(".main")
   main.style.display = "none"
   
   const start = document.querySelector(".start-game")
   const quit = document.querySelector("#quit-button")


   quit.onclick = ()=>{

    main.style.display = "none"
    start.style.display = "block"
    clearGrid()
    GameBoard.clearBoard()
    body.style.opacity = 1
    dialog.close()

  }

   const x = document.querySelector("#x")
   const o = document.querySelector("#o")

   let selectedP1 = ""
   let selectedP2 = ""

   x.addEventListener("click",()=>{
     
     document.querySelector("#o-symbol").style.stroke = "white"
     o.style.backgroundColor = ""


     let color = x.style;
     let symbol = document.querySelector("#x-symbol")
     if(color.backgroundColor == "white"){
        selectedP1 = ""
        symbol.style.fill = "white"
        color.backgroundColor = ""
     }
     else{
        selectedP1 = "x"
        symbol.style.fill = "#172554"
        color.backgroundColor = "white"
     }
     console.log(selectedP1);

   })

   o.addEventListener("click",()=>{


    document.querySelector("#x-symbol").style.fill = "white"
    x.style.backgroundColor = ""

    
    let color = o.style;
    let symbol = document.querySelector("#o-symbol")
    if(color.backgroundColor == "white"){
       selectedP1 = "x"
       symbol.style.stroke = "white"
       color.backgroundColor = ""
    }
    else{
       selectedP1 = "o"
       symbol.style.stroke = "#172554"
       color.backgroundColor = "white"
    }
   
    console.log(selectedP1);

  })



  const startButton = document.querySelector("#start")

  startButton.addEventListener("click",()=>{

    if(selectedP1 == ""){
        const message = document.querySelector("#error-message")
        message.textContent = "Please Select the Symbol"
    }
    else{
     start.style.display = "none"

     main.style.display = "flex"
     if(selectedP1 == "o"){
        selectedP2 = "x"
      }
      else{
        selectedP2 = "o"
      }


     p1smb.textContent = selectedP1.toUpperCase()
     p2smb.textContent  = selectedP2.toUpperCase()

    
    }
     
  })


  const grid = document.querySelector("#grid")
  const squares = Array.from(grid.children)

  const p1 = Player(selectedP1)
  const p2 = Player(selectedP2)

  const p1smb = document.querySelector("#p1")
  const p2smb = document.querySelector("#p2")


  let p1Score = document.querySelector("#p1-score")
  let p2Score = document.querySelector("#p2-score")
  let tie = document.querySelector("#tie")
  
  let currentMove = "x"
  let score = 0
  squares.forEach(element => {
   
     element.onclick = ()=> {

        let r = parseInt(element.dataset.index[0])
        let c = parseInt(element.dataset.index[1])

        let board = GameBoard.getBoard()

        if(board[r][c] == 0){


        if(currentMove == "x"){
           element.innerHTML = `<svg  width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path id = "x-symbol" style = "fill : #172554" d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"/>
          </svg>`
          GameBoard.updateBoard(r,c,currentMove);
          currentMove = "o"
        }
        else{

            element.innerHTML = `<svg  width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path id = "o-symbol" style= "stroke : #172554" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> `

            GameBoard.updateBoard(r,c,currentMove);
            currentMove = "x"
        }

        let status = Game.getGameStatus(GameBoard.getBoard())
        console.log(status)

       
        let tie_count = parseInt(tie.textContent) || 0


        if (status === "x" || status === "o") {
            clearGrid();
            GameBoard.clearBoard();

            const winner = status === selectedP1 ? p1 : p2;
            score = winner.updateScore();

            if (winner === p1) {
                p1Score.textContent = score;
            } else {
                p2Score.textContent = score;
            }
        }

        if(status == "Draw"){
            clearGrid()
            GameBoard.clearBoard()
            tie.textContent = ++tie_count
        }
    }
    }

  })

  const end = document.querySelector("#end-button")
  const dialog = document.querySelector("#result-dialog")
  const body = document.querySelector("body")
  end.onclick = ()=>{
    dialog.showModal()
    body.style.opacity = 0.3;

    const winner = document.querySelector("#winner-name")
    let name
    if(parseInt( document.querySelector("#p1-score").textContent) > parseInt( document.querySelector("#p2-score").textContent)){
        name = "Winner : Player 1"
    }
    else if(parseInt(document.querySelector("#p1-score").textContent) > parseInt( document.querySelector("#p2-score").textContent)){
        name = "Winner : Player 2"
    }
    else{
        name = "Draw"
    }

    winner.textContent = name;
  }

  const newGame = document.querySelector("#back-button")

  newGame.onclick = ()=>{
     clearGrid()
     GameBoard.clearBoard()
     body.style.opacity = 1;

     p1Score.textContent = 0
     p2Score.textContent = 0
     tie.textContent = 0
     score  = 0
     p1.resetScore()
     p2.resetScore()
     dialog.close()
  }

  
  const reset = document.querySelector("#restart")

  reset.onclick = ()=>{
    clearGrid()
    GameBoard.clearBoard()
  }

  function clearGrid(){
    squares.forEach(element =>{
        element.innerHTML = ""
    })
  }

})


const GameBoard  = (function(){

    const board = [
        [ 0,0,0 ],
        [ 0,0,0 ],
        [ 0,0,0 ]
    ]

    function updateBoard(r,c,symbol){
        
        if(board[r][c] == "o" || board[r][c] == "x"){
            return -1
        }
        board[r][c] = symbol;
    }

    function display(){
        for(let i = 0;i<board.length;i++){
            console.log(board[i]);
        }
    }

    function getBoard(){
        return board.map(row => row.slice())
    }

    function clearBoard(){
      for(let i = 0;i<board.length;i++){
        for(let j = 0;j<board[i].length;j++){
            board[i][j] = 0;
        }
      }
    }
    return {updateBoard,display,clearBoard,getBoard}
})()


function Player(choosedSymbol){
   const symbol = choosedSymbol
   let score = 0

   function playMove(r,c){
     GameBoard.updateBoard(r,c,symbol)
   }

   function updateScore(){
     score++
     return score
   }

   function resetScore(){
     score = 0
   }
   return {playMove,symbol,updateScore,resetScore}
}


const Game = (function(){


    // for playing the Game On terminal 

    function start(){
        const symbol = prompt("Choose a Symbol (x or o): ")

        const p1 = Player(symbol)
        let p2 = undefined
        if(symbol == "o"){
            p2 = Player("x")
        }
        else{
            p2 = Player("o")
        }

        console.log(`Player 1 Symbol ${p1.symbol}`)
        console.log(`Player 2 Symbol ${p2.symbol}`);

        playRound(p1,p2)

    }

    function playRound(Player1,Player2){
        let status = getGameStatus(GameBoard.board)
        while(status == null){
          let p1_r = prompt("Row Dimension for Player 1 : ")
          let p1_c = prompt("Column Dimension for Player 1 : ")
          Player1.playMove(p1_r,p1_c)

          status = getGameStatus(GameBoard.board)
          if(status != null){
            break;
          }

          let p2_r = prompt("Row Dimension for Player 2 : ")
          let p2_c = prompt("Column Dimension for Player 2 : ")

          Player2.playMove(p2_r,p2_c)

          GameBoard.display()

        }

        console.log(status)
        
    }
    
    // Getting game current status 

    function getGameStatus(board){
        for (let row = 0; row < 3; row++) {
            if (board[row][0] === board[row][1] && board[row][1] === board[row][2] && board[row][0] !== 0) {
                return board[row][0];
            }
        }
    
        // Check columns
        for (let col = 0; col < 3; col++) {
            if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== 0) {
                return board[0][col];
            }
        }
    
        // Check main diagonal
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== 0) {
            return board[0][0];
        }
    
        // Check anti-diagonal
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== 0) {
            return board[0][2];
        }
    
        // Check for draw or ongoing game
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === 0) {
                    return null;  // The game is still ongoing
                }
            }
        }
    
        return 'Draw';
    }

    return {start,getGameStatus}

})()
