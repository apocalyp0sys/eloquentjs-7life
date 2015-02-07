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

    var plants = context.findAll("*");
    if (plants.length > 1)
        return {type: "eat", direction: randomElement(plants)}
    else if(plants.length == 1){
        if(this.energy < 5 )
            return {type: "eat", direction: plants[0]}

    }
    if (context.look(this.direction) != " " && space)
        this.direction = space;
    return {type: "move", direction: this.direction};
};