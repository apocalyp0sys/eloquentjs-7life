function SmartPlantEater() {
  PlantEater.call(this);
}

SmartPlantEater.prototype.act = function(context) {
    var space = context.find(" ");
    // increased energy value required for reproduction
    if (this.energy > 80 && space)
        return {type: "reproduce", direction: space};
    var plant = context.find("*");
    if (plant) {
        // not greedy feeding; helps to stabilize the population
        if(this.energy < 10 || this.energy * Math.random() < 40)
          return {type: "eat", direction: plant};
        // do not abandon food sources even if not hungry
        else
          return {type: "idle"};
    }
    if (space)
        return {type: "move", direction: space};
};