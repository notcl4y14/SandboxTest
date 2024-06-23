class Chunk {
	constructor (width, height) {
		this.width = width;
		this.height = height;
		this.grid = [];
		this.x = 0;
		this.y = 0;

		this.chunkGrid = null;
	}

	get area () {
		return this.width * this.height;
	}

	toPos(index) {
		let x = index % this.width;
		let y = Math.floor(index / this.height);

		return { x, y };
	}

	toIndex(x, y, removeCap = true) {
		if (!removeCap) {
			let outOfBoundsX = x < 0 || x > this.width - 1;
			let outOfBoundsY = y < 0 || y > this.height - 1;
			
			if (outOfBoundsX || outOfBoundsY) {
				return -1;
			}
		}
		
		return y * this.width + x;
	}

	getTile (x, y) {
		if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
			let chunkGridWidth = this.chunkGrid.width;
			let chunkGridHeight = this.chunkGrid.height;
			return this.chunkGrid.getTile(
				chunkGridWidth * this.width - this.x * this.width - x,
				chunkGridHeight * this.height - this.y * this.height - y
			);
		}

		let index = this.toIndex(x, y);

		return this.grid[index];
	}

	generate (fillTile = TileStone) {
		let area = this.area;

		for (let i = 0; i < area; i++) {
			let pos = this.toPos(i);
			let tile = new fillTile();
			tile.x = pos.x;
			tile.y = pos.y;
			tile.color = tile.getColor();
			tile.chunk = this;

			this.grid.push(tile);
		}
	}

	async generateGround (dirtLevelStart = 2, dirtLevelEnd = 6, stoneLevelStart = 11, stoneLevelEnd = 15) {
		let area = this.area;

		for (let i = 0; i < area; i++) {
			let pos = this.toPos(i);

			let tile = new TileDirt();

			if (pos.y >= stoneLevelEnd) {
				tile = new TileStone();
			} else if (pos.y >= dirtLevelEnd && pos.y < stoneLevelStart) {
				tile = new TileDirt(false);
			} else if (pos.y >= stoneLevelStart) {
				let rand = Math.floor(Math.random() * 2);

				if (rand == 1) {
					tile = new TileDirt(false);
				} else {
					tile = new TileStone();
				}
			} else if (pos.y >= dirtLevelStart) {
				let rand = Math.floor(Math.random() * 2);

				if (rand == 1) {
					tile = new TileDirt(false);
				} else {
					tile = new TileDirt(true);
				}
			}

			tile.x = pos.x;
			tile.y = pos.y;
			tile.color = tile.getColor();
			tile.chunk = this;

			this.grid.push(tile);

			// if (i % this.width == 0) {
			// 	await new Promise(resolve => setTimeout(resolve, 1));
			// }
		}

		for (let i = 0; i < area; i++) {
			this.grid[i].updateTile();

			// if (i % this.width == 0) {
			// 	await new Promise(resolve => setTimeout(resolve, 1));
			// }
		}
	}
	
	update () {}

	draw () {
		for (let i = 0; i < this.grid.length; i++) {
			if (!this.grid[i]) continue;
			// let pos = this.toPos(i);
			// let color = {r: -pos.y, g: -pos.y, b: -pos.y};
			this.grid[i].draw(this.x, this.y);
		}

		// this.drawBorder();
	}

	drawBorder (color = "#ffffff") {
		context.strokeStyle = color;
		context.save();
		context.lineWidth = 0.3;
		context.strokeRect(this.x, this.y, this.width, this.height);
		context.restore();
	}
}