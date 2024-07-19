
// Variables

var k1 = "f";
var k2 = "j";
var k1p = "d";
var k2p = "k";

var left_powered = false;
var right_powered = false;

var defaultBallSpeed = 60;
var ballSpeed = defaultBallSpeed;
var left_score = 0;
var right_score = 0;
var defaultBallJump = 300;
var ballJumpForce = defaultBallJump;

var left_paddle = add([
	sprite("paddle_0"), // Draw paddle
	area(vec2(0, -8), vec2(8, 8)), // Collision
	pos(8, height() / 2), // Positioning
	origin("left"),
	body(), // Makes it so that we can jump
	"paddle"
]);

var right_paddle = add([
	sprite("paddle_0"),
	area(vec2(8, -8), vec2(0, 8)),
	pos(width() - 8, height() / 2),
	scale(-1),
	origin("left"),
	body(),
	"paddle"
]);

var ball = add([
	sprite("ball_0"),
	pos(width() / 2, height() / 2),
	origin("center"),
	body()
]);

var floor = add([
	area(vec2(0, height() + 1000), vec2(width(), height())),
	origin("center"),
	solid(), // Make it collidable
	"floor"
]);

var ceiling = add([
	area(vec2(0, -100), vec2(width(), 0)),
	origin("center"),
	solid(),
	"ceiling"
]);

var left_score_text = add([
	text("0", 8),
	origin("center"),
	pos(vec2(width() / 2 - 16, 16))
]);

var right_score_text = add([
	text("0", 8),
	origin("center"),
	pos(vec2(width() / 2 + 16, 16))
]);

var hint_text = add([
	text("[F / J] = Jump\n[D / K] = Power Hit (-5)", 4),
	color(0.3, 0.3, 0.3),
	origin("center"),
	pos(vec2(width() / 2, height() / 2))
]);

// Functionality

ball.on("update", () => {
	ball.move(ballSpeed, 0);

	if (ball.pos.x > width()) { // Ball goes off right side of the screen
		left_score++;
		left_score_text.text = left_score;
		ball.pos = vec2(width() / 2, height() / 2);
		ballSpeed = defaultBallSpeed;
		ball.spriteID = "ball_0";
		play("jsfxr_youscored");
	}

	if (ball.pos.x < 0) { // Ball goes off left side of the screen
		right_score++;
		right_score_text.text = right_score;
		ball.pos = vec2(width() / 2, height() / 2);
		ballSpeed = defaultBallSpeed;
		ball.spriteID = "ball_0";
		play("jsfxr_youscored");
	}
});

ball.collides("paddle", (paddle) => {
	ballSpeed *= -1; // Flip ball direction
	if (paddle == left_paddle && left_powered) { // Handle power hit
		ballSpeed *= 2;
		ball.spriteID = "ball_1";
		left_powered = false;
		left_paddle.spriteID = "paddle_0";
	}
	if (paddle == right_paddle && right_powered) {
		ballSpeed *= 2;
		ball.spriteID = "ball_1";
		right_powered = false;
		right_paddle.spriteID = "paddle_0";
	}

	// The angle at which the ball shoots off at depends on where
	// it collides on the paddle. The further away from the center
	// it is, the stronger the hit.
	var dy = ball.pos.y - paddle.pos.y;
	ballJumpForce = Math.abs(dy * 50);
	if (ballJumpForce <= 25) {
		ballJumpForce = defaultBallJump;
	}

	// Prevent the ball from colliding multiple times with the paddle
	ball.pos.x = paddle.pos.x + Math.sign(ballSpeed) * 8;

	ball.jump(ballJumpForce * Math.sign(dy));
	play("jsfxr_ballhit");
});

ball.collides("floor", () => {
	ball.jump(ballJumpForce);
	play("jsfxr_ballbounce");
});

keyPress(k1, () => {
	left_paddle.jump(300);
	if (hint_text !== undefined) destroy(hint_text);
});

keyPress(k2, () => {
	right_paddle.jump(300);
	if (hint_text !== undefined) destroy(hint_text);
});

keyPress(k1p, () => {
	if (left_score >= 5 && !left_powered) {
		left_score -= 5;
		left_score_text.text = left_score;
		left_powered = true;
		left_paddle.spriteID = "paddle_1";
		play("jsfxr_powerup");
		if (hint_text !== undefined) destroy(hint_text);
	}
});

keyPress(k2p, () => {
	if (right_score >= 5 && !right_powered) {
		right_score -= 5;
		right_score_text.text = right_score;
		right_powered = true;
		right_paddle.spriteID = "paddle_1";
		play("jsfxr_powerup");
		if (hint_text !== undefined) destroy(hint_text);
	}
});