// Score Canvas
const SCORE_BORDER = "0px solid black";
const applicationScore = new PIXI.Application({ width: 240, height: 480 }); // Score Size
applicationScore.renderer.backgroundColor = 0xffffff; // Score Background
applicationScore.renderer.view.style.border = SCORE_BORDER; // Score Border
applicationScore.renderer.view.style.borderWidth = "10px 0px 10px 0px";

// Time Section
let timeTitle = new PIXI.Text(
    gameConfig.gameTime.TITLE,
    new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 40,
        fontWeight: "bold",
        fill: "lime",
    })
);
timeTitle.x = (applicationScore.renderer.view.width - timeTitle.width) / 2;
timeTitle.y = 30;

let timeMessageStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 45,
    fill: "black",
    stroke: "lime",
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});
let timeMessage = new PIXI.Text(gameConfig.gameTime.getTextValue(), timeMessageStyle);
timeMessage.x = (applicationScore.renderer.view.width - timeMessage.width) / 2;
timeMessage.y = timeTitle.y + 50;

// Score Section
let scoreTitle = new PIXI.Text(
    gameConfig.gameScore.TITLE,
    new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 40,
        fontWeight: "bold",
        fill: "blue",
    })
);
scoreTitle.x = (applicationScore.renderer.view.width - scoreTitle.width) / 2;
scoreTitle.y = timeMessage.y + 90;

let scoreMessageStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 80,
    fill: "white",
    stroke: "blue",
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});
let scoreMessage = new PIXI.Text(gameConfig.gameScore.getTextValue(), scoreMessageStyle);
scoreMessage.x =
    (applicationScore.renderer.view.width - scoreMessage.width) / 2;
scoreMessage.y = scoreTitle.y + 50;

let scoreAddition = new PIXI.Text(
    "",
    new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 30,
        fontWeight: "bold",
        fill: "black",
    })
);
scoreAddition.x =
    (applicationScore.renderer.view.width - scoreAddition.width) / 2 + 65;
scoreAddition.y = 270;

let fancyAlert = new PIXI.Text(
    "!",
    new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 80,
        fill: "red",
        stroke: "limegreen",
        strokeThickness: 4,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
    })
);
fancyAlert.x =
    (applicationScore.renderer.view.width - fancyAlert.width) / 2 - 95;
fancyAlert.y = scoreMessage.y;

// Player Section
let playerTitle = new PIXI.Text(
    gameConfig.gamePlayer.TITLE,
    new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 40,
        fontWeight: "bold",
        fill: "yellow",
    })
);
playerTitle.x = (applicationScore.renderer.view.width - playerTitle.width) / 2;
playerTitle.y = scoreMessage.y + 125;

let playerMessageStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 45,
    fill: "black",
    stroke: "gold",
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});
let playerMessage = new PIXI.Text(gameConfig.gamePlayer.getTextValue(), playerMessageStyle);
playerMessage.x =
    (applicationScore.renderer.view.width - playerMessage.width) / 2;
playerMessage.y = playerTitle.y + 50;

const backgroundScore = PIXI.Sprite.from("images/wood-background-03.jpg");
backgroundScore.width = 240;
backgroundScore.height = 480;

applicationScore.stage.addChild(backgroundScore);
applicationScore.stage.addChild(timeMessage);
applicationScore.stage.addChild(scoreMessage);
applicationScore.stage.addChild(playerMessage);
applicationScore.stage.addChild(fancyAlert);
applicationScore.stage.addChild(scoreAddition);

const timeTitleImg = PIXI.Sprite.from("images/time-text.png");
timeTitleImg.x = (applicationScore.renderer.view.width - 101) / 2;
timeTitleImg.y = 30;

const scoreTitleImg = PIXI.Sprite.from("images/harvest-text.png");
scoreTitleImg.x = (applicationScore.renderer.view.width - 230) / 2;
scoreTitleImg.y = timeMessage.y + 90;

const playerTitleImg = PIXI.Sprite.from("images/player-text.png");
playerTitleImg.x = (applicationScore.renderer.view.width - 193) / 2;
playerTitleImg.y = scoreMessage.y + 125;

applicationScore.stage.addChild(timeTitleImg);
applicationScore.stage.addChild(scoreTitleImg);
applicationScore.stage.addChild(playerTitleImg);