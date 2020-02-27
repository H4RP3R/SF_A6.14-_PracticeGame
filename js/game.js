const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

let startBttnClicked = false


function round() {
    // FIXME: надо бы убрать "target" прежде чем искать новый (Done)
    $('.game-field').removeClass('target');
    $('.game-field').removeClass('miss');
    let divSelector = randomDivId();
    $(divSelector).addClass("target");
    // TODO: помечать target текущим номером (Done)
    $(divSelector).text(`${hits+1}`);
    // FIXME: тут надо определять при первом клике firstHitTime (Done)
    if (hits === 1 && !startBttnClicked) {
        firstHitTime = getTimestamp();
    }
    if (hits === maxHits) {
        endGame();
    }
}

function endGame() {
    // FIXME: спрятать игровое поле сначала (Done)
    $('.game-field').hide();
    let totalPlayedMillis = getTimestamp() - firstHitTime;
    let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
    $("#total-time-played").text(totalPlayedSeconds);
    $("#total-misses").text(miss);

    $("#win-message").removeClass("d-none");
}

function handleClick(event) {
    // FIXME: убирать текст со старых таргетов. Кажется есть .text? (Done)
    if ($(event.target).hasClass("target")) {
        hits = hits + 1;
        $(event.target).text('');
        round();
    } else {
        $(event.target).addClass('miss');
        miss++
    }
    // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss (Done)
}

function resetGameState() {
    startBttnClicked = true
    $('.game-field').removeClass('target');
    $('.game-field').text('');
    $('.game-field').show();
    $("#win-message").addClass("d-none");
    hits = 0;
    miss = 0;
    firstHitTime = getTimestamp();

}

function init() {
    // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
    round();

    $(".game-field").click(handleClick);
    $("#button-reload").click(function() {
        location.reload();
    });
    $("#button-start").click(function() {
        resetGameState();
        round();
    });
}

$(document).ready(init);
