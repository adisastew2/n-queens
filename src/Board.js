// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // access the row
      // return whether reduces to greater than 1
      return _.reduce(this.get(rowIndex), (acc, item) => {
        return acc + item;
      }, 0) > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      return _.some(this.attributes, (row, i) => this.hasRowConflictAt(i));
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      return _.reduce(this.attributes, (acc, row) => {
        // debugger;
        if (Array.isArray(row)) {
          return acc + row[colIndex];
        } else {
          return acc;
        }
      }, 0) > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //console.log(this.attributes);
      //get n to specifiy length of for-loop
      var n = this.get('n');
      // var hasConflicts = false;
      //iterate up to n
      for (var i = 0; i < n; i++) {
        //call .hasConflictAt for n
        if (this.hasColConflictAt(i)) {
          //if returns true, then return true at end
          // hasConflicts = true;
          return true;
        }
      }
      // return hasConflicts; // fixme
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(element, row, col) {
      var matrix = this.rows();
      //console.log(matrix[row + 1]);
      //console.log(matrix[row + 1][col + 1]);
      //debugger;
      row++;
      col++;
      if (typeof matrix[row][col] === 'number') {
        //if this element is a 1, return true
        if (matrix[row][col] === 1) {
          return true;
        } else {
          this.hasMajorDiagonalConflictAt(matrix[row][col], row, col);
        }        
      }
      
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //debugger;
      var matrix = this.rows();
      //for-loop
      //iterate all rows
      for (var i = 0; i < matrix.length; i++) {  
        //iterate through first row
        for (var j = 0; j < matrix[i].length; j++) {
          //check every element for a 1
          //if element is a 1, call hasMajorDiagnonalConflict
          if (matrix[i][j] === 1) {
            if (this.hasMajorDiagonalConflictAt(matrix[i][j], i, j)) {
              return true;
            }
          }
        }       
      }
      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow, row, col) {
      var matrix = this.rows();
      //if row+1 and i+1 exist
      //console.log(matrix);
      row++;
      col--;
      if (typeof matrix[row][col] === 'number') {
        //if this element is a 1, return true
        if (matrix[row][col] === 1) {
          return true;
        } else {
          this.hasMinorDiagonalConflictAt(matrix[row][col], row, col);
        }        
      }   
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //debugger;
      var matrix = this.rows();
      //for-loop
      //iterate all rows
      for (var i = 0; i < matrix.length; i++) {  
        //iterate through first row
        for (var j = 0; j < matrix[i].length; j++) {
          //check every element for a 1
          //if element is a 1, call hasMinorDiagnonalConflict
          if (matrix[i][j] === 1 && j > 0) {
            if (this.hasMinorDiagonalConflictAt(matrix[i][j], i, j)) {
              return true;
            }
          }
        }       
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
