/**
 * Created by ap on 07.02.2015.
 */
function Tiger(){
    this.energy = 25;
}

Tiger.prototype.act = function(context) {
    var space = context.find(" ");
    if (this.energy > 80 && space)
        return {type: "reproduce", direction: space};
    var victim = context.find("O");
    if (victim) {
        return {type: "eat", direction: victim};
    }
    if (space)
        return {type: "move", direction: space};
};