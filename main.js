document.getElementsByClassName("map")[0].innerHTML =
  `<h1>Vector Simulation</h1>

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
                # D                                # X                       # Y           `
    .replaceAll(" ", "&nbsp;")
    .replaceAll("\n", "<br>");

function showLegend() {
  $(".legend").toggleClass("show");
}

var red = false;

function redMode() {
  red ? (red = false) : (red = true);
  $(".control").toggleClass("red");
}

function calc() {
  var error = false;
  var finalObj = {};
  var junctions = Array.from($(".control").children());
  junctions.forEach((junc, i) => {
    finalObj[junc.id] = {};

    var roads = Array.from($(junc).children()).filter((x, i) => i !== 0);
    roads.forEach((road, i) => {
      finalObj[junc.id][road.id] = {};

      parameters = Array.from($(road).children()).filter((x, i) => i !== 0);
      parameters.forEach((param, i) => {
        inputboxes = Array.from($(param).children()).filter((x, i) => i !== 0);
        inputboxes.forEach((input) => {
          if (
            (red && param.id == "cars" && input.value == "") ||
            (!red && param.id !== "cars" && input.value == "")
          ) {
            error = true;
            alert(`${junc.id} > ${road.id} > ${param.id} cannot be empty`);
            throw "Parameter";
          }
          finalObj[junc.id][road.id][param.id] = input.value;
        });
      });
    });
  });

  if (error) return;
  console.log(`---------\n| INPUT |\n---------`);
  console.log(finalObj);
  alert(`Check browser console for result`);

  console.log(`----------\n| OUTPUT |\n----------`);
  var result = calculate(finalObj, red);
  if (!Array.isArray(result)) {
    console.log(`Timers (max & default)`);
    console.log(result);
  } else {
    result.forEach((e) => {
      console.log(e);
    });
  }
}

function test() {
  var junctions = Array.from($(".control").children());
  junctions.forEach((junc, i) => {
    var roads = Array.from($(junc).children()).filter((x, i) => i !== 0);
    roads.forEach((road, i) => {
      parameters = Array.from($(road).children()).filter((x, i) => i !== 0);
      parameters.forEach((param, i) => {
        inputboxes = Array.from($(param).children()).filter((x, i) => i !== 0);
        inputboxes.forEach((input) => {
          if (param.id == "cars")
            input.value = [60, 30, 45][Math.floor(Math.random() * 3)];
          if (param.id == "tpc")
            input.value = [0.5, 1, 0.25][Math.floor(Math.random() * 3)];
          if (param.id == "limit")
            input.value = [40, 30, 50][Math.floor(Math.random() * 3)];
        });
      });
    });
  });
}

function reset() {
  var inputboxes = Array.from($(`input[type=number]`));

  inputboxes.forEach((box) => {
    box.value = "";
  });
}
