var SHAPES = [ 
  [[0,10], [0,11], [0,12]], 
  
  [[0,10],[1,10],[1,11],[1,12],[2,12]],
   
  [[0,10],[0,11],[1,10],[1,11]],
  
  [[0,10],[1,10],[2,10],[3,10],[4,10]]
]

function ShapeGenerator(){

  this.get_shape = function() {
    var color = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)];
    var shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    var arr = [];

    for(var i = 0; i < shape.length; i++) {
      var cell = shape[i];
      arr.push(new Cell(cell[0], cell[1], color, MOVING));
    }

    return arr;
  }

}
