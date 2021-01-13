// HTML body
const divContainer = document.getElementById("container");

divContainer.appendChild(applicationPondA.view);
divContainer.appendChild(applicationScore.view);
divContainer.appendChild(applicationPondB.view);

// Holder to store the shrimps
let shrimpsPondA = [];
let shrimpsPondB = [];

// Game timer
const gameTimeInterval = setInterval(() => {
    timeMessage.text = `${gameConfig.gameTime.getTextValue()}`;
    timeMessage.x =
        (applicationScore.renderer.view.width - timeMessage.width) / 2;
    if (
        gameConfig.gameStatus === GAME_START &&
        gameConfig.gameMusic.introMusic.isPlayable &&
        !gameConfig.gameMusic.introMusic.isPlaying
    ) {
        gameConfig.gameMusic.introMusic.play();
    }

    if (gameConfig.gameTime.value === 0) {
        endGame();
        //clearInterval(gameTimeInterval); // break the loop
    }

    if (gameConfig.gameStatus === GAME_PLAY) {
        gameConfig.gameTime.value--;
    }

    if (gameConfig.gameStatus === GAME_PLAY) {
        gameConfig.gameMusic.introMusic.stop();
        gameConfig.gameMusic.endMusic.stop();
        if (
            gameConfig.gameMusic.playMusic.isPlayable &&
            !gameConfig.gameMusic.playMusic.isPlaying
        ) {
            gameConfig.gameMusic.playMusic.play();
        }
    }
}, 1000);

function endGame() {
    gameConfig.gameStatus = GAME_END;
    gameConfig.gameMusic.playMusic.stop();
    if (
        gameConfig.gameMusic.endMusic.isPlayable &&
        !gameConfig.gameMusic.endMusic.isPlaying
    ) {
        gameConfig.gameMusic.endMusic.play();
    }

    containerPondA.visible = false;
    containerPondB.visible = false;
    startScreen.visible = true;

    // Show Score
    resultsText.text = getResultsContent();
    resultsScreen.visible = true;
}

startButton.on("pointerdown", onClickStartButton);

function onClickStartButton() {
    gameConfig.gamePlayer.nick = playerInput.text;
    playerMessage.text = gameConfig.gamePlayer.getTextValue();
    playerMessage.x =
        (gameConfig.scoreScreenResolution.width - playerMessage.width) / 2;
    playerMessage.y = playerTitle.y + 50;
    // Start the game
    playGame();
}

function playGame() {
    startScreen.visible = false;
    containerPondA.visible = true;
    instructionsScreen.visible = false;
    resultsScreen.visible = false;
    containerPondB.visible = true;

    let additionalFilter = false;
    const pondBFilter = new PIXI.filters.GodrayFilter();
    applicationPondB.stage.filters = [pondBFilter];

    // Easter Egg -> Retro Mode
    if (gameConfig.gamePlayer.getTextValue().toLowerCase() === "shrimpy") {
        additionalFilter = new PIXI.filters.PixelateFilter(3);
    } else if (gameConfig.gamePlayer.getTextValue().toLowerCase() === "mike") {
        additionalFilter = new PIXI.filters.CRTFilter({
            lineWidth: 3,
            lineContrast: 0.3,
            noise: 0.2,
            time: 0.5,
        });
    }

    if (additionalFilter) {
        applicationPondA.stage.filters = [additionalFilter];
        applicationScore.stage.filters = [additionalFilter];
        applicationPondB.stage.filters = [pondBFilter, additionalFilter];
    } else {
        applicationPondA.stage.filters = [];
        applicationScore.stage.filters = [];
    }

    initializeGameLogic();
}

function initializeGameLogic() {
    gameConfig.gameStatus = GAME_PLAY;
    gameConfig.gameTime.value = gameConfig.gameTime.initialValue;
    gameConfig.gameScore.numericValue = 0;

    shrimpsPondA.forEach((shrimp) => {
        containerPondA.removeChild(shrimp);
    });
    shrimpsPondA.length = 0;
    shrimpsPondB.forEach((shrimp) => {
        containerPondB.removeChild(shrimp);
    });
    shrimpsPondB.length = 0;
    gameConfig.gameScore.fancyCount = 0;

    // Populate pond
    for (let i = 0; i < gameConfig.initialShrimpsCount; i++) {
        const shrimpPondA = createShrimp(containerPondA);
        shrimpPondA.on("pointerdown", onClickNormalShrimp);
        shrimpsPondA.push(shrimpPondA);
        containerPondA.addChild(shrimpPondA);

        function onClickNormalShrimp() {
            if (gameConfig.gameMusic.harvestSound.isPlayable) {
                gameConfig.gameMusic.harvestSound.play({ loop: false });
            }

            gameConfig.gameScore.updateNumericValue(
                shrimpPondA.shrimpType.scorePoints,
                scoreAddition
            );
            shrimpPondA.visible = false;

            const shrimpPondB = createShrimp(containerPondB, {
                scale: shrimpPondA.scale,
                tint: shrimpPondA.tint,
                shrimpType: shrimpPondA.shrimpType,
                interactive: false,
                buttonMode: false,
            });

            shrimpsPondB.push(shrimpPondB);
            containerPondB.addChild(shrimpPondB);
            setTimeout(
                transformInFancyShrimp,
                gameConfig.fancyTransformDelay * 1000,
                shrimpPondB
            );
        }
    }
}

function transformInFancyShrimp(shrimp) {
    if (
        getRandomInt(1, 10) <= shrimp.shrimpType.fancyProb &&
        shrimp.visible &&
        gameConfig.gameStatus === GAME_PLAY
    ) {
        if (gameConfig.gameMusic.fancyShrimpSound.isPlayable) {
            gameConfig.gameMusic.fancyShrimpSound.play({ loop: false });
        }

        gameConfig.gameScore.fancyCount++;
        shrimp.isFancy = true;
        shrimp.tint = FANCY_COLOR;
        const glowFilter = new PIXI.filters.GlowFilter(15, 2, 0, 0xffffff, 0.5);
        const rgbFilter = new PIXI.filters.RGBSplitFilter(
            [-10, 0],
            [0, 0],
            [0, 0]
        );

        shrimp.filters = [glowFilter, rgbFilter];

        shrimp.interactive = true;
        shrimp.buttonMode = true;
        shrimp.cursor = "hover";

        gameConfig.gameScore.updateNumericValue(
            -1 * shrimp.shrimpType.scorePoints,
            scoreAddition
        );

        shrimp.on("pointerdown", onClickFancyShrimp);

        function onClickFancyShrimp() {
            if (gameConfig.gameMusic.harvestSound.isPlayable) {
                gameConfig.gameMusic.harvestSound.play({ loop: false });
            }
            shrimp.visible = false;
            gameConfig.gameScore.fancyCount--;
        }
    }
}

const shrimpBoundsPondA = createShrimpBounds(containerPondA);
const shrimpBoundsPondB = createShrimpBounds(containerPondB);

applicationPondA.ticker.add(() => {
    updateShrimpPosition(shrimpsPondA, shrimpBoundsPondA);
});
applicationPondA.ticker.add(() => {
    overlayPondA.tilePosition.x += 1;
    overlayPondA.tilePosition.y += 1;
});

applicationPondB.ticker.add(() => {
    updateShrimpPosition(shrimpsPondB, shrimpBoundsPondB);
    const fancyShrimps = shrimpsPondB.filter(
        (shrimp) => shrimp.isFancy && shrimp.visible
    );
    const normalShrimps = shrimpsPondB.filter(
        (shrimp) => !shrimp.isFancy && shrimp.visible
    );
    for (let i = 0; i < fancyShrimps.length; i++) {
        for (let j = 0; j < normalShrimps.length; j++) {
            if (
                collisionUtil.hitTestRectangle(
                    fancyShrimps[i],
                    normalShrimps[j]
                ) &&
                gameConfig.gameTime.value > 0
            ) {
                gameConfig.gameScore.updateNumericValue(
                    -1 * normalShrimps[j].shrimpType.scorePoints,
                    scoreAddition
                );
                normalShrimps[j].visible = false;
                if (gameConfig.gameMusic.fancyShrimpDamageSound.isPlayable) {
                    gameConfig.gameMusic.fancyShrimpDamageSound.play({
                        loop: false,
                    });
                }
            }
        }
    }
});
applicationPondB.ticker.add(() => {
    overlayPondB.tilePosition.x -= 1;
    overlayPondB.tilePosition.y -= 1;
});

applicationScore.ticker.add(() => {
    scoreMessage.text = gameConfig.gameScore.getTextValue();
    scoreMessage.x =
        applicationScore.renderer.view.width / 2 - scoreMessage.width / 2;
    gameConfig.gameScore.fancyCount <= 0
        ? (fancyAlert.text = "")
        : (fancyAlert.text = "!");
});
