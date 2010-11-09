var MOVING = 1;
var EMPTY = 0;
var NOT_MOVING = 2;

var RATING_STEP = 10;

var DEFAULT_COLOR = '#FFFFFF';
var NOT_MOVING_COLOR = '#E4E4E4';
var SHAPE_COLORS = ['#D40000', '#00FF00', '#EA32FF'];

var TICK_INTERVAL = 500;

var ROWS = 15;
var COLUMNS = 21;
var CELL_BORDER = 1;
var CELL_HEIGHT = CELL_WIDTH = 10;
var WINDOW_WIDTH = COLUMNS * (CELL_WIDTH + (CELL_BORDER*2));
var WINDOW_HEIGHT = ROWS * (CELL_HEIGHT + (CELL_BORDER*2));

var timer = null;
var rating = 0;

// Main class
function Jetrix() {

   // drawing
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  var container = new Container();
  

  var shape = new Shape(container);
  shape.reflect_to_container();
  container.show_cells();

  container.show_borders();

  this.tick = function() {    
    if(shape.can_move({to: 'bottom'})) {
      shape.move({direction: 'down'});      
    } else {
      shape.freeze();
      container.check_full_rows();
      if(document.getElementById('rating')) {
        document.getElementById('rating').innerHTML = rating;
      }
      //if(container.could_shape_be_issued()) {
        shape = new Shape(container);
      //}
    }
  }

  timer = setInterval(this.tick, TICK_INTERVAL);

  window.onkeypress = function(e) {
    if ( e.keyCode == 107 ) {
      if(shape.can_move({to: 'left'})) {
        shape.move({direction: 'left'});
      }
    } else if ( e.keyCode == 108 ) {
      if(shape.can_move({to: 'right'})) {
        shape.move({direction: 'right'});
      }
    } else if ( e.keyCode == 32 ) {
      shape.rotate();
    }
  }
}
