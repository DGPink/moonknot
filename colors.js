


const posColors = {
  0: [135,255,220],
  10: [175,245,140],
  20: [215,235,140],
  30: [255,215,140],
  40: [255,195,170],
  50: [255,165,200],
}
const negColors = {
  '-0': [150,250,255],
  '-10': [180,220,255],
  '-20': [190,200,255],
  '-30': [200,180,255],
  '-40': [210,160,255],
  '-50': [220,140,255],
}

const rgbaString = ([r,g,b], a=1) => "rgb(x,y,z,a)".replace(/x/,r).replace(/y/,g).replace(/z/,b).replace(/a/,a);
const intercolor = (colors) => Object.values(colors)
  .map((e,i,r)=> i
    ? Array(10).fill(0)
      .map((a,k)=> e
        .map((f,j)=> f - (9-k)*(f-r[i-1][j])/10))
    : [e]).flat();

const posTempColor = intercolor(posColors);
const negTempColor = intercolor(negColors);
const colors = {};

posTempColor.forEach((e,i)=> colors[i] = e);
negTempColor.forEach((e,i)=> colors["-"+i] = e);
const colorjson = JSON.stringify(colors);

const windblade = rgbaString([215,255,255], 0.75);

// <script type="text/javascript" src="main.js"></script>
const purplerain = rgbaString([185,125,205], 1);
const whiterain = rgbaString([245,255,245], 1);
const purplesnow = rgbaString([255,245,255], 1);
const whitesnow = rgbaString([215,255,255], 1);


const darkmoon = rgbaString([40,60,80], 1);
const litemoon = rgbaString([195,210,210], 1);
const mornsun = "pink"; //TODO
const noonsun = "yellow"; //TODO
const evensun = "#f9cb9c"; //TODO
const cloudcolor = rgbaString([245,255,255],1);
