////////////////////////////////////////////////////////////////////////////////////////////////////////
// Start screen
const startScreen = new PIXI.Container();
const gameLogo = PIXI.Sprite.from("images/fancy-shrimp-multi-text.png");
gameLogo.scale.set(0.7);
gameLogo.x = (applicationPondA.renderer.view.width - 218) / 2;
gameLogo.y = 20;

const startButton = PIXI.Sprite.from("images/start-red.png");
startButton.scale.set(0.5);
startButton.x = (applicationPondA.renderer.view.width - 166.5) / 2;
startButton.y = applicationPondA.renderer.view.height - 100;
startButton.interactive = true;
startButton.buttonMode = true;
startButton.cursor = 'hover';

let playerInput = new PIXI.TextInput({
    input: {
        fontSize: "36px",
        padding: "12px",
        width: "200px",
        color: "#26272E",
        textAlign: "center",
        display: "block",
    },
    box: { fill: 0xe8e9f3, rounded: 16, stroke: { color: 0xcbcee0, width: 4 } },
});
playerInput.placeholder = "Nick...";
playerInput.x = (applicationPondA.renderer.view.width - playerInput.width) / 2;
playerInput.y = 220;

const backgroundStartScreen = PIXI.Sprite.from(
    "images/start-background-02.jpg"
);
backgroundStartScreen.width = gameConfig.pondScreenResolution.width;
backgroundStartScreen.height = gameConfig.pondScreenResolution.height;
startScreen.addChild(backgroundStartScreen);
startScreen.addChild(gameLogo);
startScreen.addChild(playerInput);
startScreen.addChild(startButton);

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Instructions screen
const instructionsScreen = new PIXI.Container();
const backgroundInstructionsScreen = PIXI.Sprite.from(
    "images/start-background-directions-colours.jpg"
);
backgroundInstructionsScreen.width = gameConfig.pondScreenResolution.width;
backgroundInstructionsScreen.height = gameConfig.pondScreenResolution.height;
/*const instructionsTitle = PIXI.Sprite.from("images/instructions-text.png");
instructionsTitle.x = (applicationPondB.renderer.view.width - 534) / 2;
instructionsTitle.y = 30;

const instructions = 
`
    - Harvest the most shrimp from the left pond. 
    Each shrimp's color has a score.

    - Depending on the shrimp's color, 
    it could transform into a fancy shrimp.

    - Fancy shrimp kills good shrimps.

    - ¡Catch the fancy shrimp before 
    they finish off with your harvest!

        +--------------+--------+------------+
        | Shrimp Color | Points | Fancy Prob |
        +==============+========+============+
        | Blue         |     10 | 40%        |
        | Green        |      5 | 20%        |
        | Violet       |      3 | 10%        |
        | Orange       |      1 | 0%         |
        +--------------+--------+------------+
`;
let instructionsText = new PIXI.Text(
    instructions,
    new PIXI.TextStyle({
        fontFamily: "Courier",
        fontSize: 16,
        fontWeight: "bold",
        fill: "black",
    })
);
instructionsText.x = (applicationPondB.renderer.view.width - instructionsText.width) / 2;
instructionsText.y = 85;
*/
instructionsScreen.addChild(backgroundInstructionsScreen);
//instructionsScreen.addChild(instructionsTitle);
//instructionsScreen.addChild(instructionsText);

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Results screen
const resultsScreen = new PIXI.Container();
const backgroundResultsScreen = PIXI.Sprite.from(
    "images/start-background-01.jpg"
);
backgroundResultsScreen.width = gameConfig.pondScreenResolution.width;
backgroundResultsScreen.height = gameConfig.pondScreenResolution.height;
const resultsTitle = PIXI.Sprite.from("images/results-text.png");
resultsTitle.x = (applicationPondB.renderer.view.width - 377) / 2;
resultsTitle.y = 50;

let resultsText = new PIXI.Text(
    getResultsContent(),
    new PIXI.TextStyle({
        fontFamily: "Courier",
        fontSize: 35,
        fontWeight: "bold",
        fill: "black",
    })
);
resultsText.x = (applicationPondB.renderer.view.width - resultsText.width) / 2;
resultsText.y = 135;

resultsScreen.addChild(backgroundResultsScreen);
resultsScreen.addChild(resultsTitle);
resultsScreen.addChild(resultsText);