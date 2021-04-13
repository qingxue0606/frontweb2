
import EXIF from 'exif-js';

export default {
	getOrientation: (file) => {
		return new Promise((resolve) => {
			EXIF.getData(file, function () {
				const orient = EXIF.getTag(this, 'Orientation');
				resolve(orient);
			});
		});
	},

	dataURLtoFile: (dataurl, filename) => {
		const arr = dataurl.split(',');
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: mime });
	},

	rotateImage: (image, width, height) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		ctx.save();
		canvas.width = width;
		canvas.height = height;
		ctx.rotate(0);
		ctx.drawImage(image, 0, 0);
		ctx.restore();
		return canvas.toDataURL('image/jpeg');
	}
};
