/* -------------------

Map of junction 

                # C 
                |     
                |     
                |     
              B |                E                 F            G            H            I
 A #------------+----------------#-----------------#------------#------------#------------#
                |                                  |                         |
                |                                  |                         |
                |                                  |                         |
                |                                  |                         |
                |                                  |                         |
                |                                  |                         |
                # D                                # X                       # Y

Legend:
+ - 4-way junction
# - Point
- , | - Road

( Right turn are free, B, F, H have a traffic light )

------------------- */

/**
 *
 * @param {Object} junctions
 * @param {Boolean} redlightmode
 */
var calculate = (junctions, redlightmode) => {
  var result = [];
  for (junctionno in junctions) {
    var roads = junctions[junctionno];

    for (roadno in roads) {
      var road = roads[roadno];
      road.rateofcars = 1 / road.tpc;
      [road.max, road.timer] = [{}, {}];
      road.max.red = road.limit / road.rateofcars + 5;
      road.max.green = Infinity;
    }

    for (roadno in roads) {
      var road = roads[roadno];

      for (roadno2 in roads) {
        var road2 = roads[roadno2];
        if (roadno2 !== roadno) {
          if (road.max.green > road2.max.red)
            road.max.green = road2.max.red + 5;
        }
      }

      if (!redlightmode) {
        road.timer.red = road.max.red - 5;
        road.timer.green = road.max.green - 5;
      } else {
        if (road.cars > road.limit) {
          result.push(
            `Road ${roadno}@${junctionno} has a traffic jam. ${
              road.cars - road.limit
            } cars need to be removed. Would take ${road.max.green} timer`
          );
        }
      }
    }
  }
  return redlightmode ? result : junctions;
};
