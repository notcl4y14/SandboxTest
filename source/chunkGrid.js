class ChunkGrid {
	constructor (width, height) {
		this.width = width;
		this.height = height;
		this.grid = [];
	}

	get area () {
		return this.width * this.height;
	}

	toPos(index) {
		let x = index % this.width;
		let y = Math.floor(index / this.height);

		return { x, y };
	}

	toIndex(x, y, removeCap = false) {
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
		let chunkX = x / this.grid[0].width;
		let chunkY = y / this.grid[0].height;
		let chunkIndex = this.toIndex(chunkX, chunkY);
		console.log(chunkX);
		let chunk = this.grid[chunkIndex];

		return chunk.getTile(x - this.grid[0].width, y - this.grid[0].height);
	}
	
	update () {}

	draw () {
		for (let i = 0; i < this.grid.length; i++) {
			if (!this.grid[i]) continue;
			this.grid[i].draw();
		}
	}
}