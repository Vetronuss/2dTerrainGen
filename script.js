var n = []
var seaLevel = 100;
var steep = 5;
var contrast = 300
var sandLevel = 4
var sandBlend = 0;
var w
var h
var d
var s
var sl
function setup() {
  createCanvas(windowWidth, windowHeight);
  noiseDetail(4,0.5);
  noiseSeed(0)
  noStroke()
  genNoise()
	n = colorize();
	w = createSlider(0,50,1,0.5)
	w.position(10,430)
	h = createSlider(0,255,1,0.5)
	h.position(10,450)
	d = createSlider(0,255,100,1)
	d.position(10,470)
	h.style('color', '#ff0000');
	h.style('background-color', '#ff0000');
	s = createSlider(0,1,0.5,0.01)
	s.position(200,430)
	sl = createSlider(0,20,4,0.5)
	sl.position(200,450)
}

function draw() {
  background(200);
	steep = w.value()
	seaLevel = d.value();
	sandBlend = s.value();
	sandLevel = sl.value();
  genNoise()
	
	
	n = colorize();
  for (var i = 0; i < 100; i++)
  {
    
    for (var o = 0; o < 100; o++)
    {
      
				
      fill(color(n[i][o]))
      rect(i*4,o*4,4,4)
    }
  }
  
}

function colorize()
{
	var b = []
	for (var i = 0; i < n.length; i++)
	{
		b.push([])
		for (var o = 0; o < n[i].length; o++)
		{
			try{

				if (n[i][o] < seaLevel)
				{
					b[i].push(lerpColor(color(n[i][o]),color('blue'),0.35))
				}else if (abs(n[i][o+1] - n[i][o]) > steep||
				abs(n[i][o-1] - n[i][o]) > steep||
				abs(n[i+1][o] - n[i][o]) > steep||
				abs(n[i-1][o] - n[i][o]) > steep)
				{
					b[i].push(n[i][o])
				}else if (n[i][o] < h.value())
				{
					if (n[i][o] < seaLevel+sandLevel)
					{
						var lvl = sandBlend
						b[i].push(lerpColor(color(n[i][o]),color('yellow'),lvl))
					}else{
						b[i].push(lerpColor(color(n[i][o]),color('green'),0.5));
					}
				}else
				{
					b[i].push(n[i][o]);
				}
			}catch(a)
			{
				//give up
				b[i].push(n[i][o]);
			}
		}
	}

	//a second pass over for blending and extra detail
	/*
	for (var i = 0; i < b.length; i++)
	{
		for (var o = 0; o < b[i].length; o++)
		{
			
		}
	}*/
	return b;
	
}

function genNoise()
{
  n = [];
  for (var i = 0; i < 100; i++)
  {
    n.push([])
    for (var o = 0; o < 100; o++)
    {
      n[i].push(noise(i/17,o/17)*contrast)
    }
  }
}