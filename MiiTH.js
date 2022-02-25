export var MIITH = {
	Game: function(config) {
		this.config = config;
	
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = this.config.width;
		this.canvas.height = this.config.height;
		this.canvas.style.background = this.config.background;

		this.rects = [];
		this.physicsRects = [];

		this.movementKeysDown = {
			w: false,
			a: false,
			s: false,
			d: false,
			up: false,
			left: false,
			down: false,
			right: false
		};
	
		this.init = function() {
			document.body.appendChild(this.canvas);
			document.body.style.margin = 0;
			console.log('%c %c %c %c MiiTH.js', 'background: #ff0000', 'background: #00ff00', 'background: #0000ff', 'background: #000000');
			if (this.config.width === window.innerWidth && this.config.height === window.innerHeight) {
				document.body.style.overflow = 'hidden';
				window.addEventListener('resize', () => {
					this.canvas.width = window.innerWidth;
					this.config.width = window.innerWidth;
					this.canvas.height = window.innerHeight;
					this.config.height = window.innerHeight;
				});
			}
			this.config["create"]();
			document.addEventListener("keydown", (e) => {
				if (e.keyCode === 87) {
					this.movementKeysDown.w = true;
				} else if (e.keyCode === 65) {
					this.movementKeysDown.a = true;
				} else if (e.keyCode === 83) {
					this.movementKeysDown.s = true;
				} else if (e.keyCode === 68) {
					this.movementKeysDown.d = true;
				} 
				if (e.keyCode === 38) {
					this.movementKeysDown.up = true;
				} else if (e.keyCode === 37) {
					this.movementKeysDown.left = true;
				} else if (e.keyCode === 40) {
					this.movementKeysDown.down = true;
				} else if (e.keyCode === 39) {
					this.movementKeysDown.right = true;
				}
			});
			document.addEventListener("keyup", (e) => {
				if (e.keyCode === 87) {
					this.movementKeysDown.w = false;
				} else if (e.keyCode === 65) {
					this.movementKeysDown.a = false;
				} else if (e.keyCode === 83) {
					this.movementKeysDown.s = false;
				} else if (e.keyCode === 68) {
					this.movementKeysDown.d = false;
				} 
				if (e.keyCode === 38) {
					this.movementKeysDown.up = false;
				} else if (e.keyCode === 37) {
					this.movementKeysDown.left = false;
				} else if (e.keyCode === 40) {
					this.movementKeysDown.down = false;
				} else if (e.keyCode === 39) {
					this.movementKeysDown.right = false;
				}
			});
			setInterval(() => {
				this.update();
			}, 50);
		}
	
		this.update = function() {
			this.ctx.fillStyle = this.config.background;
			this.ctx.fillRect(0, 0, this.config.width, this.config.height);
			for (this.i = 0; this.i < this.rects.length; this.i++) {
				this.ctx.fillStyle = this.rects[this.i].color;
				this.ctx.fillRect(this.rects[this.i].x, this.rects[this.i].y, this.rects[this.i].width, this.rects[this.i].height);
			}
			if (this.config.physics === 'platformer') {
				for (this.i = 0; this.i < this.physicsRects.length; this.i++) {
					if (this.physicsRects[this.i].movekeys === 'wasd') {
						console.log('this.movePlatformerWASD();');
					} else if (this.physicsRects[this.i].movekeys === 'arrows') {
						console.log('this.movePlatformerArrows();');
					}
					this.physicsRects[this.i].y -= this.config.gravity;
				}
			} else if (this.config.physics === 'side-scroller') {
				for (this.i = 0; this.i < this.physicsRects.length; this.i++) {
					if (this.physicsRects[this.i].movekeys === 'wasd') {
						this.moveSideWASD(this.physicsRects[this.i]);
					} else if (this.physicsRects[this.i].movekeys === 'arrows') {
						this.moveSideArrows(this.physicsRects[this.i]);
					}
				}
			}
			for (this.i = 0; this.i < this.physicsRects.length; this.i++) {
				this.ctx.fillStyle = this.physicsRects[this.i].color;
				this.ctx.fillRect(this.physicsRects[this.i].x, this.physicsRects[this.i].y, this.physicsRects[this.i].width, this.physicsRects[this.i].height);
			}
			this.config["update"]();
		}

		this.addRect = function(x, y, width, height, color) {
			this.newRect = {
				x: x,
				y: y,
				width: width,
				height: height,
				color: color
			}
			this.rects.push(this.newRect);
		}
		this.addPhysicsRect = function(x, y, width, height, color, speed, movekeys) {
			this.newRect = {
				x: x,
				y: y,
				vy: 0,
				width: width,
				height: height,
				color: color,
				speed: speed,
				movekeys: movekeys
			}
			this.physicsRects.push(this.newRect);
		}

		this.moveSideWASD = function(object) {
			if (this.movementKeysDown.w === true) {
				object.y -= object.speed;
			}
			if (this.movementKeysDown.a === true) {
				object.x -= object.speed;
			}
			if (this.movementKeysDown.s === true) {
				object.y += object.speed;
			}
			if (this.movementKeysDown.d === true) {
				object.x += object.speed;
			}
		}
		this.moveSideArrows = function(object) {
			if (this.movementKeysDown.up === true) {
				object.y -= object.speed;
			}
			if (this.movementKeysDown.left === true) {
				object.x -= object.speed;
			}
			if (this.movementKeysDown.down === true) {
				object.y += object.speed;
			}
			if (this.movementKeysDown.right === true) {
				object.x += object.speed;
			}
		}
		
		this.movePlatformerWASD = function(object) {
			if (this.movementKeysDown.w === true) {
			}
		}
	}
}