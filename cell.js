function Cell(aRow, aColumn, aColor, aMode) {
  //var mode;
  //this.row, column, color;
  
  if( typeof aMode == 'undefined') {
    this.mode = EMPTY;
  } else {
    this.mode = aMode; // MOVING | EMPTY | NOT_MOVING    
  }

  this.row = aRow;
  this.column = aColumn;
  this.color = aColor;
    
  this.is_empty = function() {
    return this.mode == EMPTY;
  }
  
  this.not_moving = function() {
    return this.mode = NOT_MOVING;
  }

  this.is_moving = function() {
    return this.mode == MOVING;
  }
    
  this.is_not_moving = function() {
    return this.mode == NOT_MOVING;
  }
    
  this.move = function(options) {
    switch(options['to']) {
      case 'down':
  	    this.row += 1;
        break;
  	  case 'right':
        this.column += 1;
        break;
      case 'left':
        this.column -= 1
    }
  }
}
