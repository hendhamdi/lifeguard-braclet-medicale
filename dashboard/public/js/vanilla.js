function btncolor(clicked) {
    document.getElementById(clicked).style.color = '#7b2cbf'
}

var button = document.getElementById('slide');
button.onclick = function() {
    var container = document.getElementById('container');
    sideScroll(container, 'right', 25, 100, 10);
};

var back = document.getElementById('slideBack');
back.onclick = function() {
    var container = document.getElementById('container');
    sideScroll(container, 'left', 25, 100, 10);
};

function sideScroll(element, direction, speed, distance, step) {
    scrollAmount = 0;
    var slideTimer = setInterval(function() {
        if (direction == 'left') {
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer);
        }
    }, speed);
}



function btnscolor(clicked) {
    document.getElementById(clicked).style.color = '#ffffff'
    document.getElementById(clicked).style.backgroundColor = '#246bfd'
    document.getElementById(clicked).style.border = 'none'
}


function svgcolor(clicked) {
    document.getElementById(clicked).style.color = '#ef233c'
}

function clickable(clicked) {
    document.getElementById(clicked).onclick = function() {
        location.href = "book.html";
    };
}