function drawBgText (text, x, y, textStyle = "#ffffff", bgStyle = "rgba(0,0,0,0.5)") {
	let measure = context.measureText(text);
	let width = measure.width;
	let height = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;
	context.fillStyle = bgStyle;
	context.fillRect(x, y, width, height);
	context.fillStyle = textStyle;

	context.save();
	context.textBaseline = "top";
	context.fillText(text, x, y);
	context.restore();
}

// https://stackoverflow.com/a/10971090/22146374
function strToRGB (str) {
	let rgb = str.replace(/[^\d,]/g, '').split(',');
	return {
		r: parseInt(rgb[0]),
		g: parseInt(rgb[1]),
		b: parseInt(rgb[2]),
		a: parseInt(rgb[3]) || 1
	};
}