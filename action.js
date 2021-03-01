module.exports = {
    execute: function(creep){
        switch(creep.memory.work){
            case 'harvest':
                if(creep.store.getFreeCapacity==0){
                    creep.memory.work='deposit';
                    this.execute(creep);
                    break;
                }
                this.mine(creep);
                break;
            case 'deposit':
                if(creep.store.getUsedCapacity=0){
                    creep.memory.work=creep.memory.role;
                    this.execute(creep);
                    break;
                }
                this.deposit(creep);
                break;
            default:
                break;
        }
    },
    
    
    mine: function(creep){
        var target;
        if(creep.memory.target){
            target = Game.getObjectById(creep.memory.target);
        }
        else{
            var sources = creep.room.find(FIND_SOURCES, {
                filter:(source) =>{
                    return(source.energy>0)
                }});
            target = creep.pos.findClosestByPath(sources);
        }
        
        if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },
    
    deposit: function(creep){
        var home = Game.spawns[creep.memory.home];
        var targets = home.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(targets.length>0){
            var target = creep.pos.findClosestByPath(targets);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};