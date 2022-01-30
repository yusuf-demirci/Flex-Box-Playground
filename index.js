// this function creates boxes according to the value of slider
function createBoxes(num) {
    for (let i = 0; i < num; i++) {
        $('.board').append(`<div class="box">${i + 1}</div>`)
    }
}

function resetBoard() {
    $(".board").empty();
}

function resetFlexItems(){
    let inputElements = $("input[type='number']")
    for (let element of inputElements) {
        $(`#${element.id}`).val("")
        $(`#${element.id}`).css(`${element.id}`, "")
    }

    let selectElements = $(".flex-items select")
    for (let element of selectElements) {
        let defaultValue = $(`#${element.id} option`)[0].innerText;
        $(`#${element.id}`).val(defaultValue)
        $(`.board`).css(`${element.id}`, defaultValue)
    }
}

function resetAll() {
    resetBoard();
    resetFlexItems();
    $("#box-number").val(1);
    
    let selectElements = $(".flexbox select")
    for (let element of selectElements) {
        let defaultValue = $(`#${element.id} option`)[0].innerText;
        $(`#${element.id}`).val(defaultValue)
        $(`.board`).css(`${element.id}`, defaultValue)
    }
}

// event listener of slider
$("#box-number").change((e) => {
    let boxNumber = e.target.value;
    resetBoard();
    resetFlexItems();
    createBoxes(boxNumber);
})

// event listener of reset button
$(".reset").click(() => {
    resetAll();
    createBoxes(1);
})

// event listeners of flex-box select elements
const selectElements = $(".flexbox select");
for (let element of selectElements) {
    $(`#${element.id}`).change((e) => {
        $(".board").css(`${element.id}`, e.target.value)
    })
}

// event listeners of flex-items input elements
const inputElements = $(".flex-items input, .flex-items select");
for (let element of inputElements) {
    $(`#${element.id}`).change((e) => {
        let boxes = $(".box")
        let itemNumber = $("#item-number").val();
        for (let i = 1; i <= boxes.length; i++) {
            if (+itemNumber === i) {
                if (element.id === "flex-basis")
                    $($(".box").get(i - 1)).css(`${element.id}`, e.target.value + "px")
                else
                    $($(".box").get(i - 1)).css(`${element.id}`, e.target.value)
            }
        }
    })
}

// event listener for flex-item number
$("#item-number").change((e) => {
    let boxes = $(".box")
    let itemNumber = $("#item-number").val();
    
    for (let i = 1; i <= boxes.length; i++) {
        if (+itemNumber === i) {
            $("#order").val($($(".box").get(i - 1)).css(`order`));
            $("#flex-grow").val($($(".box").get(i - 1)).css(`flex-grow`));
            $("#flex-shrink").val($($(".box").get(i - 1)).css(`flex-shrink`));
            
            let flexBasis = $($(".box").get(i - 1)).css(`flex-basis`)
            if (flexBasis == "auto")
                $("#flex-basis").val("");
            else
                $("#flex-basis").val(flexBasis.slice(0, flexBasis.length - 2));
            
            if ( $($(".box").get(i - 1)).css(`align-self`) == "auto" )
                $("#align-self").val("stretch");
            else
                $("#align-self").val($($(".box").get(i - 1)).css(`align-self`));
        }
    }
})

