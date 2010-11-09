function Shape(belongs_to_container) {

  var shape = new ShapeGenerator().get_shape();
  var container = belongs_to_container;

  // container.shape is just an array of cells
  container.shape = shape;
    
  this.move = function(options) {
    this.empty_current_place();
    for(var cell = 0; cell < shape.length; cell++) {
      shape[cell].move({to: options['direction']}); //if can_move :to => options[:direction]
    }

    /*if(!this.can_move({to: 'bottom'})) {
      for(var cell = 0; cell < shape.length; cell++) { shape[cell].not_moving() } 
    }
    */this.reflect_to_container();
  }
  
  this.rotate = function() {
    var window_to_rotate = this.get_dimensions();
        
    if(there_is_no_space_to_rotate_in(window_to_rotate)) {
      return;
    }
    
    this.empty_current_place();
    
    // actually transpond
    for(var i = 0; i < shape.length; i++) {
      var cell = shape[i];

      // calculate relative offset (in rotating window) otherwise we will be transponding in all container
      var offset_row    = cell.row - window_to_rotate['min_row'];
      var offset_column = cell.column - window_to_rotate['min_column'];

      // transpond that offset
      var transponded_offset_row    = offset_column;
      var transponded_offset_column = offset_row;

      cell.row    = window_to_rotate['min_row'] + transponded_offset_row;
      cell.column = window_to_rotate['min_column'] + transponded_offset_column;
    }
   
    this.reflect_to_container();
  }
  
  this.freeze = function() {
    for(var i = 0; i < container.shape.length; i++) {
      var cell = container.shape[i];
      container.at(cell.row, cell.column).mode = NOT_MOVING;
    }
  }

  this.can_move = function(options) {
    switch(options['to']) {
      case 'left':
        for(var i = 0; i < shape.length; i++) {
          var cell = shape[i];
          var cell_at_left = container.at(cell.row, cell.column - 1);

          if(cell_at_left == null || cell_at_left.is_not_moving())
            return false;
        }
        return true
      case 'right':
        for(var i = 0; i < shape.length; i++) {
          var cell = shape[i]; 
          var cell_at_right = container.at(cell.row, cell.column + 1);

          if(cell_at_right == null || cell_at_right.is_not_moving())
            return false;
        }
        return true
      case 'bottom':
        for(var i = 0; i < shape.length; i++) {
          var cell = shape[i];           
          var cell_at_bottom = container.at(cell.row + 1, cell.column);

          if(cell_at_bottom == null || cell_at_bottom.is_not_moving())
            return false;
        }
        return true
    }
  }
  
  this.empty_current_place = function() {
    for(var i = 0; i < shape.length; i++) {
      var cell = container.shape[i];
      //container.replace_cell(new Cell(cell.row, cell.column, DEFAULT_COLOR));
      container.at(cell.row, cell.column).color = DEFAULT_COLOR;
      container.at(cell.row, cell.column).mode = EMPTY;
    }
  }
  
  this.reflect_to_container = function() {
    for(var i = 0; i < shape.length; i++) {
      var cell = shape[i];
      //container.replace_cell(cell);
      container.at(cell.row, cell.column).color = cell.color;
      container.at(cell.row, cell.column).mode = cell.mode;
    }
    container.show_cells();
  }
   
  this.get_dimensions = function() {
    var min_row = shape[0].row
    var max_row = shape[0].row
    var min_column = shape[0].column
    var max_column = shape[0].column

    for(var i = 0; i < shape.length; i++) {
      var cell = shape[i];
      if(cell.row < min_row) min_row = cell.row;      
      if(cell.row > max_row) max_row = cell.row;
      if(cell.column < min_column) min_column = cell.column;
      if(cell.column > max_column) max_column = cell.column;
    }
    
    var abs_row = max_row - min_row;
    var abs_column = max_column - min_column;
            
    if(abs_row > abs_column) {
      var window_to_rotate = {min_column: min_column - abs_row/2, min_row: min_row, max_column: max_column + abs_row/2, max_row: max_row}
    } else if(abs_column > abs_row) {
      var window_to_rotate = {min_column: min_column, min_row: min_row - abs_column/2, max_column: max_column, max_row: max_row + abs_column/2}
    } else {
      var window_to_rotate = {min_column: min_column, min_row: min_row, max_column: max_column, max_row: max_row}
    }

    window_to_rotate['width'] = (max_column - min_column) + 1;
    window_to_rotate['height']= (max_row    - min_row) + 1;
    
    return window_to_rotate;
  }
  
  //private
  var there_is_no_space_to_rotate_in = function(window) {
    for(var row = window['min_row']; row < window['max_row']; row++) {
      for(var column = window['min_column']; column < window['max_column']; column++) {
        if(container.at(row, column).is_not_moving())
          return true;
      }
    }
    return false;
  }
}
