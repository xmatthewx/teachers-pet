var maxsize = 240;
var minsize = 40;
var factor = 1.5; // default fontsize
var canvasbottom = 80;
var canvasid = "#thecanvas";

// init on browser load
$(window).load(function () {    
    canvasheight();
    getfancy(canvasid);
    $(canvasid).focus();
    if ( localStorage.getItem('teacherspet') ) {    
        marksaved();
        }
        $("[rel=tooltip]").tooltip();
        $("[rel=popover]").popover();
});


// on browser resize
$(window).resize(function() {
  canvasheight();
  getfancy(canvasid);  
});


// size the canvas
function canvasheight() {
    canvasH = $(window).height() - $('footer').height() - canvasbottom;
    $(canvasid).css('height', canvasH);    
}


// ux fontsize sliders
$('.fontsizer').change( function() {
    minsize = $('#minfont').val();
    $('#minfontsize').html(minsize);
    
    maxsize = $('#maxfont').val();
    $('#maxfontsize').html(maxsize);    
});
$('.fontsizer').mouseup( function() {
    getfancy(canvasid);
});


// ux fontsize buttons
function changesize(val) {
   minsize = minsize + val;
   getfancy(canvasid);
   
}

// hide info popover
$('#thecanvas').click( function(){
    $('[rel=popover]').popover('hide');    
})



// dynamic text size
function getfancy(elem) { 
    // originally triggered passing (this) from element so you could have multiple canvas on one page. 


    var canvaswidth = $(elem).width();
    var longest = 0;
    var longestline = 0;

    // break content into lines
    makelines( $(elem).html() );

    // find the longest line
    for (i=0; i<lines.length; i++) {
        lines[i] = $.trim( lines[i] );
        if ( lines[i].length > longest ) {
            longest = lines[i].length;
            longestline = i;
        }

    }
    //console.log('longest: ' + lines[longestline]);

    // resize text
    newsize = Math.round( canvaswidth / longest * factor );
        // console.log( newsize + ' = ' + canvaswidth + ' / ' + longest + ' x ' + factor);

    // max min fontsize
    if ( newsize >= maxsize ) { newsize = maxsize; }
    else if ( newsize <= minsize ) { newsize = minsize; }

    // set fontsize
    $(elem).css('fontSize',newsize  + 'px');
    
    // plz stop bratty browser
    $(elem).children().css('font-size', 'inherit');
    $(elem).children().css('line-height', 'inherit');
    $(canvasid + ' span').css('font-size', 'inherit');
    $(canvasid + ' span').css('line-height', 'inherit');

}

function makelines(text) {
    text = text.replace(/<br\s*[\/]?>/gi,"\n\n");
    text = text.replace(/<\/div><[^>]+\>/g,"\n");
    text = text.replace(/<[^>]+\>/g,"");
    text = text.replace(/\&nbsp;/g,"");
    lines = text.split(/\r\n|\r|\n|\<[^>]+\>/);
    // console.log(lines);
    return lines;    
}

function emailit() {
    text = $(canvasid).html(); 
    console.log(text);
    
    text = text.replace(/(^\s*)/gi,""); // removing leading space  
    text = text.replace(/(\&nbsp;\s)|(\&nbsp;)/g,"%3E%20");
    text = text.replace(/<br\s*[\/]?>/gi,"%0D%0D"); // breaks
    text = text.replace(/<\/div><[^>]+\>/gi,"%0D%0D"); // divs
    text = text.replace(/<[^>]+\>/gi,""); // remove remain html
    console.log('remove remaining hmtl: '+text);
    text = text.replace(/\s+/g,"%20"); // encode reamaining spaces
    console.log('remove spaces: '+text);
    text = text.replace(/%3E%20%3E/g,"%3E%3E"); // stack >>
    console.log('stack >: '+text);
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



