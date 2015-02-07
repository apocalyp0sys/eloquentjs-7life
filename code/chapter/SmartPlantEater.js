function SmartPlantEater() {
  this.energy = 30;
    this.direction = 's';
}

SmartPlantEater.prototype.act = function(context) {
    var threat = context.find('@');
    var space = context.find(" ");
    // increased energy value required for reproduction
    if (this.energy > 80 && space)
        return {type: "reproduce", direction: space};

    //Try to run from carnivores
    if(threat){
        var fromTiger = dirPlus(threat, 4);
        if (context.look(fromTiger) != " " && space)
            fromTiger = space;
        return {type: "move", direction: fromTiger};
    }

    var plant = context.find("*");
    if (plant) {
        // not greedy feeding; helps to stabilize the population
        if(this.energy < 10 || this.energy * Math.random() < 40)
          return {type: "eat", direction: plant};
        // do not abandon food sources even if not hungry
        else
          return {type: "idle"};
    }
    if (context.look(this.direction) != " " && space)
        this.direction = space;
    return {type: "move", direction: this.direction};
};