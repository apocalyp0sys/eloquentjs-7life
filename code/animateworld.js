// test: no

(function() {
  "use strict";

  var active = null;

  function Animated(world, speed) {
    this.speed = speed || 333;
    this.world = world;
    this.turns = 0;
    this.palntsExtinct = false;
    this.herbivoresExtinct = false;
    this.carnivoresExtinct = false;
    var outer = (window.__sandbox ? window.__sandbox.output.div : document.body), doc = outer.ownerDocument;
    var node = outer.appendChild(doc.createElement("div"));
    node.style.cssText = "position: relative; width: intrinsic; width: fit-content;";
    this.pre = node.appendChild(doc.createElement("pre"));
    this.pre.appendChild(doc.createTextNode(world.toString()));
    this.button = node.appendChild(doc.createElement("div"));
    this.button.style.cssText = "color: white;" +
      "background: #4ab; cursor: pointer; border-radius: 18px; font-size: 70%; width: 3.5em; text-align: center;";
    this.button.innerHTML = "stop";
    node.appendChild(doc.createTextNode('Speed: '));
      this.slider = node.appendChild(doc.createElement("input"));
      this.slider.type = 'range';
      this.slider.min = 1;
      this.slider.max = 10;
      this.slider.style.cssText = 'height:1em;';


    this.turnsCont = node.appendChild(doc.createElement("div"));
    this.turnsCont.appendChild(doc.createTextNode("Turns: " + this.turns));
    this.messagesCont = node.appendChild(doc.createElement("div"));

    var self = this;
    this.button.addEventListener("click", function() { self.clicked(); });
    this.disabled = false;
    if (active) active.disable();
    active = this;
    this.interval = setTimeout(function() { self.tick(); }, (11 - this.slider.value) * 60 || 333);
  }

  Animated.prototype.clicked = function() {
    if (this.disabled) return;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.button.innerHTML = "start";
    } else {
      var self = this;
      this.interval = setTimeout(function() { self.tick(); }, (11 - this.slider.value) * 60 || 333);
      this.button.innerHTML = "stop";
    }
  };

  Animated.prototype.tick = function() {
    this.world.turn();
    this.turns += 1;
    this.turnsCont.innerHTML = 'Turns: '+ this.turns ;

    var mapStr = this.world.toString();

    if(mapStr.indexOf('*') == -1 && !this.palntsExtinct) {
        this.messagesCont.innerHTML += "<br>Plants are extinct. Turn " + this.turns;
        this.palntsExtinct = true;
    }
    if(mapStr.indexOf('O') == -1 && !this.herbivoresExtinct){
        this.messagesCont.innerHTML += "<br>Herbivores are extinct. Turn " + this.turns;
        this.herbivoresExtinct = true;
    }
    if(mapStr.indexOf('@') == -1 && !this.carnivoresExtinct){
          this.messagesCont.innerHTML += "<br>Carnivores are extinct. Turn " + this.turns;
          this.carnivoresExtinct = true;
    }

    this.pre.removeChild(this.pre.firstChild);
    this.pre.appendChild(this.pre.ownerDocument.createTextNode(mapStr));

    var self = this;
    this.interval = setTimeout(function() { self.tick(); }, (11 - this.slider.value) * 60 || 333);
  };

  Animated.prototype.disable = function() {
    this.disabled = true;
    clearInterval(this.interval);
    this.button.innerHTML = "Disabled";
    this.button.style.color = "red";
  };

  window.animateWorld = function(world) { new Animated(world); };
})();
