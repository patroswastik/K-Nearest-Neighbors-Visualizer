var dataPoints = []
var initiateKNN = false;
var pointerColor = "red";
var gap1, gap2, gap3, ht;

function drawPoints(){
  for(let p = 0; p < dataPoints.length; p++){
    if(dataPoints[p].color === "red") fill(255, 0, 0);
    else if(dataPoints[p].color === "green") fill(0, 255, 0);
    else fill(0, 0, 255);
    ellipse(dataPoints[p].points.x, dataPoints[p].points.y, 10, 10);
  }
}

function switchButton(){
  fill(255);
  ellipse(30, 30, 20, 20);
}

function ColorButtons(){
  
  let gaps = width / 4;
  ht = height - 30;
  gap1 = gaps * 1;
  gap2 = gaps * 2;
  gap3 = gaps * 3;

  fill(255, 0, 0);
  ellipse(gap1, ht, 20, 20);
  fill(0, 255, 0);
  ellipse(gap2, ht, 20, 20);
  fill(0, 0, 255);
  ellipse(gap3, ht, 20, 20);

}

function addPoints(){
  if(!initiateKNN){
    for(let i=0; i<7; i++){
      dataPoints.push({points: createVector(Math.floor(-50 + mouseX + Math.random() * 100), -50 + mouseY + Math.floor(Math.random() * 100)), color: pointerColor});
    }
    dataPoints.push({points: createVector(mouseX, mouseY), color: pointerColor});
  }
}

function mousePressed(){
  if(10 < mouseX && mouseX < 50 && 10 < mouseY && mouseY < 50){
    initiateKNN = !initiateKNN;
  }else if(!initiateKNN && gap1-20 < mouseX && mouseX < gap1+20 && ht-20 < mouseY && mouseY < ht+20){
    pointerColor = "red";
  }else if(!initiateKNN && gap2-20 < mouseX && mouseX < gap2+20 && ht-20 < mouseY && mouseY < ht+20){
    pointerColor = "green";
  }else if(!initiateKNN && gap3-20 < mouseX && mouseX < gap3+20 && ht-20 < mouseY && mouseY < ht+20){
    pointerColor = "blue";
  }else{
    addPoints();
  }
}

function checkCondition(red, green, blue){
  if(red == 0 && green == 0 && blue == 0) return "";
  else if(red == 1 && green == 1 && blue == 1) return "Draw";
  else if(red > 1) return "Red";
  else if(green > 1) return "Green";
  else if(blue > 1) return "Blue";
}

function trackMouse(){
  let red_c = 0, green_c = 0, blue_c = 0;
  fill(255);
  ellipse(mouseX, mouseY, 10, 10);
  if(dataPoints.length > 2){
    for(let i=0; i<3; i++){
      switch (dataPoints[i].color) {
        case "red":
          red_c++;
          break;
        case "green":
          green_c++;
          break;
        case "blue":
          blue_c++;
          break;
        default:
          break;
      }
      let ans = checkCondition(red_c, green_c, blue_c);
      textSize(32);
      stroke(255);
      strokeWeight(2);
      text(ans, width / 2, height - 50);
      line(mouseX, mouseY, dataPoints[i].points.x, dataPoints[i].points.y);
      noStroke();
    }
    
  }
}

function sortFunctionComparator(coord_a, coord_b){
  let mouse = createVector(mouseX, mouseY);
  let mag_1 = p5.Vector.sub(mouse,coord_a.points).mag();
  let mag_2 = p5.Vector.sub(mouse,coord_b.points).mag();
  return mag_1 - mag_2;
}

function calculateKNN(){
  dataPoints = dataPoints.sort(sortFunctionComparator);
  trackMouse();
}

function setup(){
  createCanvas(screen.availWidth * 0.95, screen.availHeight * 0.80);
}


function draw(){
  background(0);
  switchButton();
  ColorButtons();
  drawPoints();
  if(initiateKNN){
    calculateKNN();
  }
}