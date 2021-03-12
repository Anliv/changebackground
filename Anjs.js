var fgimage;
var bgimage;

function upload1 () {
    var imgcanvas = document.getElementById ('fg');
    var fileinput = document.getElementById ('fgimg');
    fgimage = new SimpleImage (fileinput);
    fgimage.drawTo(imgcanvas);
}
function upload2 () {
    var imgcanvas = document.getElementById ('bg');
    var fileinput = document.getElementById ('bgimg');
    bgimage = new SimpleImage (fileinput);
    bgimage.drawTo(imgcanvas);
}

function createComposite (){
    var output = new SimpleImage (fgimage.getWidth(), fgimage.getHeight());
    for (var pixel of fgimage.values() ){
        if (pixel.getGreen () > pixel.getRed () + pixel.getBlue ()){
            var x = pixel.getX();
            var y = pixel.getY();
            var dipixel = bgimage.getPixel (x, y);
            output.setPixel (x,y, dipixel);
        } else {
            output.setPixel (pixel.getX(), pixel.getY(), pixel);
        }
    }
    var imgcanvas = document.getElementById ('composite');
    output.drawTo(imgcanvas)
}

var red_img;
function upload3() {
    var imagecanvas = document.getElementById ('redfilter');
    var fileinput = document.getElementById ('origin');
    red_img = new SimpleImage (fileinput);
    red_img.drawTo (imagecanvas);
}

function Redfilter () {
    for (var pixel of red_img.values()){
        var average = (pixel.getRed () + pixel.getGreen()+ pixel.getBlue()/3)
        if (average < 128) {
            var newRed = average *2;
            pixel.setRed (newRed);
            pixel.setGreen (0);
            pixel.setBlue (0);
        } else {
            var newGreen = average * 2 -255
            var newBlue = average *2 -255
            pixel.setRed (255);
            pixel.setGreen (newGreen);
            pixel.setBlue (newBlue);
        }
    }
    var imgcanvas = document.getElementById ('redfilter');
    red_img.drawTo (imgcanvas);
}

var seven_img;
function upload4() {
    var imagecanvas = document.getElementById ('sevencolors');
    var fileinput = document.getElementById ('nofilter');
    seven_img = new SimpleImage (fileinput);
    seven_img.drawTo (imagecanvas);
}

function sevencolors () {
    for (var pixel of seven_img.values()){
        var y = pixel.getY();
        var h = seven_img.getHeight();
        var avg = (pixel.getRed() + pixel.getGreen () + pixel.getBlue())/3;
        var R;
        var G;
        var B;
        if( y < h * (1/7)) {
            if (avg <128) {R = avg * 2; G=0; B=0}
            else {R=255; G = avg*2 - 255; B = avg*2 -255}
        }
        if (y >= h* (1/7) && y <h*(2/7)) {
            if (avg <128) {
                R=avg*2; 
                G= avg *0.8; 
                B=0;
            }
            else {
                R=255; 
                G=avg*1.2-51; 
                B=avg*2-255;
            }
        }
        if (y >= h*(2/7) && y< h *(3/7)) {
            if (avg <128) {
                R = avg*2; 
                G=avg*2;
                B=0;
            }
            else {
                R=255; 
                G=255; 
                B=avg*2-255;
            }
        }
        if (y>= h * (3/7) && y < h *(4/7)) {
            if (avg <128) {
                R= 0; 
                G=avg*2; 
                B=0;
            }
            else {
                R=avg*2-255; 
                G=255; 
                B=avg*2-255;
            }
        }
        if (y >= h * (4/7) && y < h*(5/7)) {
            if (avg < 128) {
                R=0;
                G=0;
                B=avg*2;
            }
            else {
                R=avg*2-255; 
                G=avg*2-255; 
                B=255;
            }
        }
        if (y >= h *(5/7) && y < h *(6/7)){
            if (avg < 128) {
                R=0.8*avg;
                G=0;
                B=avg*2;
            }
            else {
                R=avg*1.2-51; 
                G=avg*2-255; 
                B=255;
            }
        }
        if (y >= h *(6/7)){
            if (avg < 128) {
                R=1.6*avg;
                G=0;
                B=avg*1.6;
            }
            else {
                R=avg*0.4+153; 
                G=avg*2-255; 
                B=0.4*avg+153;
            }
        }
        pixel.setRed(R);
        pixel.setGreen(G);
        pixel.setBlue(B);
        var imagecanvas = document.getElementById ('sevencolors');
        seven_img.drawTo (imagecanvas);
    }
}