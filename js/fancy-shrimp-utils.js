// Game status
const GAME_START = "START";
const GAME_PLAY = "PLAY";
const GAME_TIME_OVER = "TIME_OVER";
const GAME_END = "END";

// Game params
const gameConfig = {
    initialShrimpsCount: 300, // Initial Shrimps
    shrimpSpriteImage: "images/shrimp-sprite-white.png",
    shrimpWidth: 64,
    shrimpHeight: 64,
    fancyTransformDelay: 3,
    pondScreenResolution: {
        width: 640,
        height: 480,
    },
    pondBorder: "10px solid black",
    scoreScreenResolution: { width: 240, height: 480 },
    gamePlayer: {
        TITLE: "PLAYER",
        nick: "_______",
        getTextValue: function () {
            let _nick = this.nick.substring(0, 8);
            if (!_nick) {
                _nick = "Player 1";
            }
            return `${_nick}`;
        },
    },
    gameTime: {
        TITLE: "TIME",
        initialValue: 60,
        value: 60,
        getTextValue: function () {
            return `${this.value}`;
        },
    },
    gameScore: {
        TITLE: "SCORE",
        numericValue: 0,
        getTextValue: function () {
            return `${this.numericValue}`;
        },
        updateNumericValue: function (points, pointsLabel) {
            pointsLabel.text = (points >= 0 ? "+" : "") + `${points}`;
            this.numericValue += points;
            setTimeout(() => {
                pointsLabel.text = "";
            }, 1000);
        },
        fancyCount: 0,
        fancyAlivePoints: 0,
    },
    gameMusic: {
        introMusic: PIXI.sound.Sound.from({
            url: "sounds/game-intro.mp3",
            preload: true,
            singleInstance: true,
            volume: 0.1,
        }),
        playMusic: PIXI.sound.Sound.from({
            url: "sounds/game-play.mp3",
            preload: true,
            singleInstance: true,
            volume: 0.1,
        }),
        endMusic: PIXI.sound.Sound.from({
            url: "sounds/game-end.mp3",
            preload: true,
            singleInstance: true,
            volume: 0.1,
        }),
        harvestSound: PIXI.sound.Sound.from({
            url: "sounds/harvest.mp3",
            preload: true,
            volume: 1,
        }),
        fancyShrimpSound: PIXI.sound.Sound.from({
            url: "sounds/arrive-fancy-shrimp.mp3",
            preload: true,
            volume: 1,
        }),
        fancyShrimpDamageSound: PIXI.sound.Sound.from({
            url: "sounds/fancy-shrimp-damage.mp3",
            preload: true,
            volume: 0.8,
        }),
    },
    gameStatus: GAME_START,
};

// Shrimp types
const BLUE_SHRIMP = {
    colorCode: 0x0000ff,
    scorePoints: 10,
    fancyProb: 4,
};

const GREEN_SHRIMP = {
    colorCode: 0x00ff00,
    scorePoints: 5,
    fancyProb: 2,
};

const VIOLET_SHRIMP = {
    colorCode: 0x9400d3,
    scorePoints: 3,
    fancyProb: 1,
};

const ORANGE_SHRIMP = {
    colorCode: 0xffa500,
    scorePoints: 1,
    fancyProb: 0,
};

const FANCY_COLOR = 0xff0000;

const SHRIMP_TYPES = [BLUE_SHRIMP, GREEN_SHRIMP, VIOLET_SHRIMP, ORANGE_SHRIMP];

// Pond A Canvas
const applicationPondA = new PIXI.Application(gameConfig.pondScreenResolution); // Pond A Size
applicationPondA.renderer.view.style.border = gameConfig.pondBorder; // Pond A Border
applicationPondA.renderer.plugins.interaction.cursorStyles.default =
    "url('images/mouse-pointer-net-small-32.png'),auto";
applicationPondA.renderer.plugins.interaction.cursorStyles.hover =
    "url('images/mouse-pointer-net-small-32.png'),auto";

// Pond B Canvas
const applicationPondB = new PIXI.Application(gameConfig.pondScreenResolution); // Pond B Size
applicationPondB.renderer.view.style.border = gameConfig.pondBorder; // Pond B Border
applicationPondB.renderer.plugins.interaction.cursorStyles.default =
    "url('images/mouse-pointer-net-small-32.png'),auto";
applicationPondB.renderer.plugins.interaction.cursorStyles.hover =
    "url('images/mouse-pointer-net-small-32.png'),auto";

// Create Shrimp
function createShrimp(container, properties) {
    const shrimp = PIXI.Sprite.from(gameConfig.shrimpSpriteImage);
    shrimp.width = gameConfig.shrimpWidth;
    shrimp.height = gameConfig.shrimpHeight;

    const shrimpType = SHRIMP_TYPES[getRandomInt(0, SHRIMP_TYPES.length - 1)];
    shrimp.shrimpType = shrimpType;

    // set the anchor point so the texture is centerd on the sprite
    shrimp.anchor.set(0.5);

    // set a random scale for the shrimp
    //shrimp.scale.set(0.3 + Math.random() * 0.3);

    // finally lets set the shrimp to be at a random position..
    shrimp.x = Math.random() * container.width;
    shrimp.y = Math.random() * container.height;

    //shrimp.tint = Math.random() * 0xffffff;
    shrimp.tint = shrimpType.colorCode;

    // create some extra properties that will control movement :
    // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
    shrimp.direction = Math.random() * Math.PI * 2;

    // this number will be used to modify the direction of the shrimp over time
    shrimp.turningSpeed = Math.random() - 0.8;

    // create a random speed for the shrimp between 2 - 4
    shrimp.speed = 2 + Math.random() * 2;

    shrimp.interactive = true;
    shrimp.buttonMode = true;
    shrimp.cursor = "hover";

    if (properties) {
        shrimp.scale = properties.scale;
        shrimp.tint = properties.tint;
        shrimp.shrimpType = properties.shrimpType;
        shrimp.interactive = properties.interactive;
        shrimp.buttonMode = properties.buttonMode;
    }

    return shrimp;
}

// Collision util
const collisionUtil = new Bump(PIXI);

// Random util
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a bounding box for shrimps
function createShrimpBounds(container) {
    const shrimpBoundsPadding = 100;
    return new PIXI.Rectangle(
        -shrimpBoundsPadding,
        -shrimpBoundsPadding,
        container.width + shrimpBoundsPadding * 2,
        container.height + shrimpBoundsPadding * 2
    );
}

// Update shrimp position per frame
function updateShrimpPosition(shrimps, shrimpBounds) {
    // iterate through the shrimps and update their position
    for (let i = 0; i < shrimps.length; i++) {
        const shrimp = shrimps[i];
        shrimp.direction += shrimp.turningSpeed * 0.01;
        shrimp.x += Math.sin(shrimp.direction) * shrimp.speed;
        shrimp.y += Math.cos(shrimp.direction) * shrimp.speed;
        shrimp.rotation = -shrimp.direction - Math.PI / 2;

        // wrap the shrimps by testing their bounds...
        if (shrimp.x < shrimpBounds.x) {
            shrimp.x += shrimpBounds.width;
        } else if (shrimp.x > shrimpBounds.x + shrimpBounds.width) {
            shrimp.x -= shrimpBounds.width;
        }

        if (shrimp.y < shrimpBounds.y) {
            shrimp.y += shrimpBounds.height;
        } else if (shrimp.y > shrimpBounds.y + shrimpBounds.height) {
            shrimp.y -= shrimpBounds.height;
        }
    }
}

function getResultsContent() {
    return `
Harvest points = ${gameConfig.gameScore.numericValue}

Time remaining = ${gameConfig.gameTime.value}

TOTAL SCORE = ${gameConfig.gameScore.numericValue + gameConfig.gameTime.value}
`;
}
