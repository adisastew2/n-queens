/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  //make an empty matrix
  /*var makeNewMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };
  debugger;
  var solutionMatrix = makeNewMatrix(n);

  //check rooks placed
  var rooksPlaced = 0;
  if (n === 1) {
    solutionMatrix = [[1]];
    rooksPlaced++;
  } else {
    //debugger;
    var columnsUsed = [];
    for (var i = 0; i < solutionMatrix.length; i++) {    
    
      for (var j = 0; j < solutionMatrix[i].length; j++) {
        var rooksInRow = solutionMatrix[i].reduce( (rooks, square) => rooks + square);
        if (rooksInRow === 0 && rooksPlaced < n) {
          if (!columnsUsed.includes(j)) {
            solutionMatrix[i].splice(j, 1, 1);
            columnsUsed.push(j);
            rooksPlaced++;         
          }         
        }
      }
    }
  }*/
  var solutionCount = 0;

  var board = new Board({ n: n});

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
      }
    }
  }

  solution = board.rows();
  

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var factorial = function (num) {
    if (num === 0) {
      return 1;
    }
    return num * factorial(num - 1);
  };
  var solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  var board = new Board({ n: n});
  //queens placed equals zero
  var queensPlaced = 0;

  for (var i = 0; i < n; i++) {
    
    for (var j = 0; j < n; j++) {
      //try place a piece for every possible index => recursive(0, j)
      board.togglePiece(i, j);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(i, j);
        //increment queens places
        queensPlaced++;
        //if queens placed equals n, increase solution count, and solution equals board
        if (queensPlaced = n) {
          solution = board.rows();
        }
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
