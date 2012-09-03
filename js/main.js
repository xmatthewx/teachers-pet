var maxsize = 240;
var minsize = 40;
var factor = 1.5; // default fontsize
var canvasbottom = 80;
var canvasid = "#thecanvas";

$(window).load(function () {
    init();
    getfancy(canvasid);
    $(canvasid).focus();
    if ( localStorage.getItem('teacherspet') ) {    
        marksaved();
        }
        $("[rel=tooltip]").tooltip();
        $("[rel=popover]").popover();
});

$(window).resize(function() {
  init();
  getfancy(canvasid);  
});


// ux fontsize sliders
$('.fontsizer').change( function() {
    minsize = $('#minfont').val();
    $('#minfont').attr('data-original-title', minsize );
    $('#minfontsize').html(minsize);
    
    maxsize = $('#maxfont').val();
    $('#maxfont').attr('data-original-title', maxsize );
    $('#maxfontsize').html(maxsize);
    getfancy(canvasid);
    
});

// size the canvas
function init(elem) {
    canvasheight = $(window).height() - $('footer').height() - canvasbottom;
    $(canvasid).css('height', canvasheight);    
}

// user adjustment
function changesize(val) {
   minsize = minsize + val;
   getfancy(canvasid);
   
}

// dynamic text size
function getfancy(elem) { 

    var canvaswidth = $(elem).width();
    var longest = 0;
    var longestline = 0;


    // break content into lines
        
    text = $(elem).html();
    text = text.replace(/<br\s*[\/]?>/gi,"\n\n");
    text = text.replace(/<\/div><[^>]+\>/g,"\n");
    text = text.replace(/<[^>]+\>/g,"");
    text = text.replace(/nbsp;/g,"");
    lines = text.split(/\r\n|\r|\n|\<[^>]+\>/);
    // console.log(lines);

    // find the longest line
    for (i=0; i<lines.length; i++) {

        lines[i] = $.trim( lines[i] );
        if ( lines[i].length > longest ) {
            longest = lines[i].length;
            longestline = i;
        }

    }
    console.log('longest: ' + lines[longestline]);

    // resize text
    newsize = Math.round( canvaswidth / longest * factor );
    // console.log( newsize + ' = ' + canvaswidth + ' / ' + longest + ' x ' + factor);


    if ( newsize >= maxsize ) { newsize = maxsize; }
    if ( newsize <= minsize ) { newsize = minsize; }

    $(elem).css('fontSize',newsize  + 'px');
    
    // plz stop bratty browser
    $(elem).children().css('font-size', 'inherit');
    $(elem).children().css('line-height', 'inherit');
    $(canvasid + ' span').css('font-size', 'inherit');
    $(canvasid + ' span').css('line-height', 'inherit');

}



function emailit() {
    text = $(canvasid).html(); 
    text = text.replace(/<br\s*[\/]?>/gi,"%0A");
    text = text.replace(/<\/div><[^>]+\>/g,"%0A");
    text = text.replace(/<[^>]+\>/g,"");
    window.open("mailto:?subject=teacher's%20pet&body=" + text);
}

function saveit() {
    localStorage.teacherspet = $(canvasid).html();   
    marksaved();
}
function marksaved() {
    $('#saveit i').addClass('icon-star');
    $('#saveit i').removeClass('icon-star-empty');
    $('.disabled').removeClass('disabled');
    
}

function loadit() {
    $(canvasid).html( localStorage.getItem('teacherspet') );
    getfancy(canvasid);
    $(canvasid).focus();
    
}
function deleteit() {
    var really = confirm("Delete from Storage?");
    if (really == true ) {
          localStorage.removeItem('teacherspet');
          $('#saveit i').addClass('icon-star-empty');
          $('#saveit i').removeClass('icon-star');
          $('#deleteit').addClass('disabled');
          $('#loadit').addClass('disabled');
    }
}



