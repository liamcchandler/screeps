var action = require('action');
Game.spawns['Spawn1'].room.memory.stage = 0;
//Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'bob', {memory: {role: 'harvest',home: 'Spawn1',work: 'harvest'}});
module.exports.loop = function () {
    var bases = [];
    var units = [];
    for(var name in Game.spawns){
        var base = Game.spawns[name];
        var containers = base.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER;
            }
        });
        var sources = base.room.find(FIND_SOURCES);
        base.room.memory.stage = 0 + containers.length >= sources.length | 0;
        console.log(base.room.memory.stage);
        bases.push(name);
        units.push([]);
    }
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        units[bases.indexOf(creep.memory.home)].push(creep);
        action.execute(creep);
    }
}