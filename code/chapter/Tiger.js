/**
 * Created by ap on 07.02.2015.
 */
function Tiger(){
    this.energy = 35;
    this.direction = 'w';
}

Tiger.prototype.act = function(context) {
    var space = context.find(" ");
    if (this.energy > 90 && space)
        return {type: "reproduce", direction: space};
    var victim = context.find("O");
    if (victim) {
        return {type: "eat", direction: victim};
    }
    if (context.look(this.direction) != " " && space)
        this.direction = space;
    return {type: "move", direction: this.direction};


};