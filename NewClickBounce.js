var rects = [];
var kill = 0;
var miss = 0;
var total = 0;

function Rect(x, y, w, h, dltX, dltY, color) {
    var me = this;
    
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.deltaX = dltX || 0 ;
    this.deltaY = dltY || 0;
    this.color = color || '#000';

    this.update = function(ctx) {
        me.x += me.deltaX;
        me.y += me.deltaY;

        ctx.fillStyle = this.color;
        ctx.fillRect(me.x, me.y, me.width, me.height);
    }
}
/// define some Rect and put them in a array
var ctx = canvas.getContext('2d'),
    rects = [
        new Rect(50, 160, 50, 50, -1, 1, '#009'),
        new Rect(20, 190, 40, 40, 2, 3, '#090'),
        new Rect(300, 250, 30, 30, 4, -3, '#909'),
        new Rect(100, 21, 30, 30, 2, 2, '#f90')
    ],
    w = canvas.width,
    h = canvas.height;

// add rect in random position
function addRect(){
    var wh = Math.floor(Math.random() * 30) + 30;
    rects.push(new Rect(Math.floor(Math.random() * 590) + 1, 
                        Math.floor(Math.random() * 430) + 1, 
                        // rect size
                        wh, 
                        wh, 
                        // speed
                        Math.floor(Math.random() * -2) + 0,  
                        Math.floor(Math.random() * 2) + 1, 
                        // color
                        '#' + Math.random().toString(16).slice(2, 5)));
}

// call addRect every 3 second
setInterval(addRect,5000);

/// animate all the rects
(function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw a line to make left panel
    //ctx.moveTo(100,0);
    //ctx.lineTo(100,100);
    //ctx.stroke();
    for(var i = 0, r; r = rects[i]; i++) {
        if (r.x < 0 || r.x > w - r.width) r.deltaX = -r.deltaX;
        if (r.y < 0 || r.y > h - r.height) r.deltaY = -r.deltaY;
        r.update(ctx); 
    }
    //console.log(rects.length.toString());
    requestAnimationFrame(loop);
})();

$(canvas).click(function(ev){
    if(ev.offsetX==undefined) {
        mx = ev.pageX-$(canvas).offset().left;
        my = ev.pageY-$(canvas).offset().top;
    }else{
        mx = ev.offsetX;
        my = ev.offsetY;
    }

    //console.log(ev);
    //console.log("("+mx+","+my+")");
    //console.log(rects[0]);
    var rem = [];
    for(var i=0;i<rects.length;i++) {
        var r = rects[i];
        if(mx >= r.x && my >= r.y && mx <= r.x+r.width && my <= r.y+r.height) { rem.push(r); }
    }
    
    for(var i=0;i<rem.length;i++) {
        var ind = rects.indexOf(rem[i]);
        if(ind == -1)
            continue;
        rects.splice(ind,1);
        kill++;
        document.getElementById("kill").innerHTML = kill;
    }
    
    total++;
    
    var miss = total-kill;
  if(miss < 0){
    miss = 0;
  }else{
    document.getElementById("miss").innerHTML = miss;
  }
  
  var acc = Math.floor((kill/total) *100);
  var pct = acc.toFixed(1) + "%";
  document.getElementById("acc").innerHTML = pct;
});