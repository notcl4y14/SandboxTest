let canvas, context;
let ticks = 0;
let lastTime = 0;
let fps = 0;
let fpsCap = 120;
let fpsTimer = 0;
let fpsTimerMax = 60;

let camera = new Camera(50, 0, 3, context);

let chunks = new ChunkGrid(10, 10);

for (let i = 0; i < 2; i++) {
	let chunk = new Chunk(50, 50);
	chunk.x = i * 50;
	chunk.y = 0;
	chunk.generateGround();
	chunk.chunkGrid = chunks;
	chunks.grid.push(chunk);
}

function createCanvas () {
	let canvasElement = document.createElement("canvas");
	document.body.appendChild(canvasElement);
}

function initGraphics () {
	canvas = document.querySelector("canvas");
	context = canvas.getContext("2d");
}

function resizeCanvas () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.onload = () => {
	createCanvas();
	initGraphics();
	resizeCanvas();

	loop();
}

window.onresize = () => {
	resizeCanvas();
}

function loop () {
	update();
	draw();
	
	fpsTimer += 1;

	if (fpsTimer > fpsTimerMax) {
		let time = performance.now();
		let delta = time - lastTime;
		fps = Math.floor(1000 / delta);
		fpsTimer = 0;
	}
	
	lastTime = performance.now();

	// https://stackoverflow.com/a/39135659/22146374
	setTimeout(() => {requestAnimationFrame(loop)}, 1000 / fpsCap);
}

function update () {
	ticks += 1;
}

function draw () {
	// rgba(0,50,25)
	context.fillStyle = "rgba(0,10,25)";
	// context.fillStyle = "#ffffff";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.save();
	// context.scale(10, 10);
	camera.apply(context);

	// for (const chunk of chunks) {
	// 	chunk.draw();
	// }

	chunks.draw();

	context.restore();
	
	drawBgText("Ticks: " + ticks, 0, 0);
	drawBgText("FPS: " + fps, 0, 10);
}