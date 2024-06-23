class Camera {
	constructor (x = 0, y = 0, zoom = 1, context) {
		this.x = x;
		this.y = y;
		this.zoom = zoom;
		this.controls = false;

		this.context = null;
	}

	get pivotX () {
		return window.innerWidth / 2;
	}

	get pivotY () {
		return window.innerHeight / 2;
	}

	translate (context = this.context) {
		let x = (this.x * this.zoom) - this.pivotX;
		let y = (this.y * this.zoom) - this.pivotY;
		context.translate(-x, -y);
	}

	scale (context = this.context) {
		context.scale(this.zoom, this.zoom);
	}

	apply (context = this.context) {
		this.translate(context);
		this.scale(context);
	}

	drawScheme (context = this.context) {
		let pivotX = this.pivotX;
		let pivotY = this.pivotY;

		context.strokeStyle = "#000000";
		context.beginPath();
		context.moveTo(pivotX, 0);
		context.lineTo(pivotX, window.innerHeight);
		context.closePath();

		context.stroke();
		
		context.beginPath();
		context.moveTo(0, pivotY);
		context.lineTo(window.innerWidth, pivotY);
		context.closePath();

		context.stroke();

		context.fillStyle = "#000000";
		context.fillText(`Position: ${this.x}; ${this.y}`, pivotX, pivotY);
		context.fillText(`Zoom: ${this.zoom}`, pivotX, pivotY - 10);
	}
}