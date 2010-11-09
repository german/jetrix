function Container() {
  var shape;
  
  var container = [];
  var rows = ROWS;
  var columns = COLUMNS;

  

  for(var row = 0; row < rows; row++) {
    var cells_container = [];
    for(var column = 0; column < columns; column++) {
      var cell = new Cell(row, column, DEFAULT_COLOR);     
      cells_container.push(cell);
    }
    //console.log(cells_container);
    container.push(cells_container);
  }
   
  this.at = function(row, column) {
    if(row < 0 || row > ROWS || column < 0 || column > COLUMNS) {
      return null;
    } else {
      if(container[row])
        return container[row][column];
      else
        return null;
    }
  }
  
  this.replace_cell = function(cell) {
    container[cell.row][cell.column] = cell;
  }
  
  this.show_cells = function(canvas) {
    for(var row = 0; row < rows; row++) {
      for(var column = 0; column < columns; column++) {
        var cell = container[row][column];

        ctx.beginPath();        
        ctx.rect(cell.column * CELL_WIDTH, cell.row * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
        ctx.fillStyle = cell.color;
        if(!cell.is_not_moving())
          ctx.fill();
      }
    }
    this.show_borders();
  }
   
  this.show_borders = function() {
    ctx.beginPath();
    //ctx.fillStyle = '#D40000';
    ctx.moveTo(0,0);
    ctx.lineTo(CELL_WIDTH * COLUMNS, 0);
    ctx.lineTo(CELL_WIDTH * COLUMNS, CELL_HEIGHT * ROWS);
    ctx.lineTo(0, CELL_HEIGHT * ROWS);
    ctx.closePath();
    ctx.stroke();        
  } 

  this.check_full_rows = function() {
    for(var row = rows - 1; row > 0; row--) {
      var row_is_full = true;
      for(var column = 0; column < columns; column++) {
        if(container[row][column].is_empty()) {
          row_is_full = false;
        }
      }
      if(row_is_full) {
        erase_row(row);
        continue;
      }
    }
  }
  
  this.could_shape_be_issued = function() {
    var height = shape.get_dimensions()['height'];
    for(var row = 0; row < height; row++) {
      for(var column = 0; column < columns; column++) {
        var cell = container[row][column];
        if(cell.mode != EMPTY) {
          return false;
        }
      }
    }
    return true
  }
  
  //private
  var erase_row = function(row_to_erase) {
    for(var column = 0; column < columns; column++) {
      for(var row = row_to_erase - 1; row > 0; row--) {
        container[row + 1][column].mode = container[row][column].mode;
        container[row + 1][column].color = container[row][column].color;
      }      
    }
    window.rating += RATING_STEP;
  }
}
