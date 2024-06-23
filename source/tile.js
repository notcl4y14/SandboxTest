class Tile {
	static list = {};
	static id = null;
	constructor (id) {
		this.x = 0;
		this.y = 0;
		this.color = this.getColor();
		this.shadow = 0;
		this.chunk = null;
		
		Tile.list[id] = this;
	}

	getColor () {
		let r = 255;
		let g = 0;
		let b = 255;

		// r = 200 + Math.cos((this.x + this.y) / 5) * 50;
		// b = 200 + Math.cos((this.x + this.y) / 5) * 50;

		let color1 = "#000000";
		// let color2 = "#ff00ff";
		let color2 = `rgb(${r},${g},${b})`;

		let val = this.x + this.y;

		if (val % 2 == 0) {
			return color1;
		}

		return color2;
	}

	updateTile () {
		let index = this.chunk.toIndex(this.x, this.y - 1);
		this.shadow = 0;

		if (this.chunk.grid[index] != null) {
			this.shadow += 1 + this.chunk.grid[index].shadow;
		}
	}

	update () {}
	
	draw (offsetX = 0, offsetY = 0, color = {r: 0, g: 0, b: 0}) {
		let tileColor = strToRGB(this.color);
		
		tileColor.r += color.r;
		tileColor.g += color.g;
		tileColor.b += color.b;

		tileColor.r -= this.shadow;
		tileColor.g -= this.shadow;
		tileColor.b -= this.shadow;

		let x = this.x + offsetX;
		let y = this.y + offsetY;

		context.fillStyle = `rgb(${tileColor.r},${tileColor.g},${tileColor.b})`;
		context.fillRect(x, y, 1, 1);
	}
}

class TileStone extends Tile {
	static id = "stone";
	constructor () {
		super("stone");
	}

	getColor () {
		let max = 150;
		let min = 75;
		let val = Math.floor(Math.random() * (max - min) + min);
		let color1 = `rgb(${val},${val},${val}`;

		return color1;
	}
}

class TileDirt extends Tile {
	static id = "dirt";
	constructor (isGrass = true) {
		super("dirt");
		this.isGrass = isGrass;
	}

	getColor () {
		let r = this.isGrass ? 29 : 133;
		let g = this.isGrass ? 122 : 88;
		let b = this.isGrass ? 45 : 58;
		
		let val = Math.floor(Math.random() * 50);
		let color1 = `rgb(${r - val},${g - val},${b - val}`;

		return color1;
	}
}