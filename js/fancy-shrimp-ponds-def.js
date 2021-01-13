// Container Pond A
const backgroundPondA = PIXI.Sprite.from("images/pond-background.jpg");
backgroundPondA.width = gameConfig.pondScreenResolution.width;
backgroundPondA.height = gameConfig.pondScreenResolution.height;
const overlayPondA = new PIXI.TilingSprite(
    PIXI.Texture.from("images/pond-overlay.png"),
    gameConfig.pondScreenResolution.width,
    gameConfig.pondScreenResolution.height
);
const containerPondA = new PIXI.Container();
containerPondA.addChild(backgroundPondA);
containerPondA.addChild(overlayPondA);
containerPondA.visible = false;
startScreen.visible = true;

applicationPondA.stage.addChild(containerPondA);
applicationPondA.stage.addChild(startScreen);

// Container Pond B
const backgroundPondB = PIXI.Sprite.from("images/pond-background.jpg");
backgroundPondB.width = gameConfig.pondScreenResolution.width;
backgroundPondB.height = gameConfig.pondScreenResolution.height;
const overlayPondB = new PIXI.TilingSprite(
    PIXI.Texture.from("images/pond-overlay.png"),
    gameConfig.pondScreenResolution.width,
    gameConfig.pondScreenResolution.height
);
const containerPondB = new PIXI.Container();
containerPondB.addChild(backgroundPondB);
containerPondB.addChild(overlayPondB);
containerPondB.visible = false;
resultsScreen.visible = false;
instructionsScreen.visible = true;

applicationPondB.stage.addChild(containerPondB);
applicationPondB.stage.addChild(instructionsScreen);
applicationPondB.stage.addChild(resultsScreen);