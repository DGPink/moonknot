

/////////
//
//  LUNARFLUID


//////////////////////////////////////////////////////////////////

paint();




///////////////////////////////////////////////////////////////////////////////

//       PAINT                        ////////////////////////////

//////////////////////////////////////


function paint(){

  let moons = [];
  let frame = 0;
  let loops = 2;

  const canvas = document.createElement('canvas');
  canvas.id = "moon";
  const body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);
  const ctx = canvas.getContext('2d', { alpha: false });
  const w = 720;
  //const h = window.innerHeight;
  ctx.canvas.width  = w;
  ctx.canvas.height = w;

  // set background
  ctx.fillStyle = "482424"//"#dff8df";
  ctx.fillRect(0, 0, w, ctx.canvas.height);



///////////////////////////////////////////////////////////////////////////////
  let runtime = 900; //8 sec, 32 fps?
  for (let p = 0; p<=runtime; p++){
    //console.log(p,runtime);
    makemoon(30, p/runtime); // number of tubes = number of pahse / 2
  }

  //console.log(moons);
  loop();


  // stomp that stamp right onto the canvas
  function stomp(stamp) {
    // set background
    ctx.fillStyle = "482424"//"#dff8df";
    ctx.fillRect(0, 0, w, ctx.canvas.height);

    let path = new Path2D(stamp.path);
    ctx.translate(stamp.x, stamp.y);
    ctx.rotate(stamp.theta);
    //ctx.scale(120,120);

    if (stamp.style.gradient){
      console.log("ned gad mad");// todo: ctx.createLinearGradient();
    };

    if (stamp.style.shadow){
      //console.log("shad mad");
      for (let [typ,sty] of Object.entries(stamp.style.shadow)) {
        ctx[typ] = sty;
      }
    };

    if (stamp.style.line){
      ctx.lineWidth = stamp.style.line.width; // Nb: pixelminutes
      ctx.lineCap = stamp.style.line.cap;
      ctx.strokeStyle = stamp.style.line.color;
      ctx.lineJoin = stamp.style.line.join;
      ctx.setLineDash(stamp.style.line.dash);
      ctx.lineDashOffset = stamp.style.line.dashOffset;
      ctx.stroke(path);
    };

    if (stamp.style.fill){
      ctx.fillStyle = stamp.style.fill.fillStyle;
      ctx.fill(path);
    };

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }


  /////////
  // ANIMATION
  /////////////////////


  // prints solutions from flipboard into DOM grid
  // when done stays true, loop stops
  function stamper(){
    let done = true; //asserts true
    let l = moons.length;
    if (loops > 0){
      frame = (frame+1)%(l);
      if (frame === 0){
        loops -= 1;
      }
      stomp(moons[frame]);
      done = false; // if still running, set false
    }
    return done;
  }

  // when solve = true, loop runs
  // after timeout, runs flipthem, on loop, until flipthem return false
  function loop(){
    if(!stamper()){
      setTimeout(loop, 1000/32); //40 times per second
    }
  }


  /////////////////////////////////////////////

  function makemoon(n, phase) {
    let color = litemoon; //[darkmoon, litemoon][(Math.sign(d) + 1)/2]; //
    let moon = {
      x: 90,
      y: 90,
      theta: 0,
      path: moonknot,
      style: style(color, color, phase),
    }
    moons.push(moon)
    //stomp(moon);
  }


  // style of arc
  function style(fillcolor, linecolor, phase) {
    return {
      gradient: false,
      line: {
        width: 12,
        cap: "round" || "butt" || "square" ,
        join:  "round" || "miter" || "bevel",
        color: linecolor,
        dash: [9600, 9600], //[156,156]@n=59, 23.71@n=8
        dashOffset: 9600 * 2 * phase, //[156,156]312
      },//*/
      fill: false,/*{
        fillStyle: fillcolor,
      }, *///false,
      shadow:{
        shadowColor: fillcolor,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 32,
      },
    }
  }
} // end of paint












///
