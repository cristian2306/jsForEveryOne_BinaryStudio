import controls from '../../constants/controls';

const pressKeys = new Map();
let fighters = [];

export function getHitPower(fighter) {
    const { attack } = fighter;
    const randomNumber = Math.random() * 2;
    const { keys, time } = fighter;
    if (keys && time) {
        // console.log('HitAttack');
        return attack * 2;
    }
    return attack * randomNumber;
}

export function updateHealthIndicator(position, value) {
    // // console.log(position, value);
    document.getElementById(`${position}-fighter-indicator`).style.width = `${value}%`;
}

export function getBlockPower(fighter) {
    const { defense } = fighter;
    const randomNumber = Math.random() * 2;
    return defense * randomNumber;
    // return block power
}
export function getDamage(attacker, defender) {
    // // console.log(hitPower, blockPower);
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage <= 0 ? 0 : damage;
    // return damage
}

function setHealtPercentage(actual, health, postion) {
    // // console.log(actual, health, postion);
    let percentage = actual;
    percentage = percentage <= 0 ? 0 : (actual * 100) / health;
    updateHealthIndicator(postion, percentage);
}

function isWin(first, second, resolve) {
    if (second.health <= 0) {
        // // console.log('first won');
        resolve(first);
    } else if (first.health <= 0) {
        // // console.log('second won');
        resolve(second);
    }
}

function attacks(attacker, attacked, position) {
    let damage = 0;
    // // console.log(`${attacker.name} attack ${attacked.name}`);
    if (!attacked.blocked || (attacker.keys && attacker.time)) {
        damage = getDamage(attacker, attacked);
        // eslint-disable-next-line operator-assignment, no-param-reassign
        attacked.health = attacked.health - damage;
        // // console.log(`${attacked.name} receives ${damage} damage`);
        // // console.log(`${attacked.name} health is ${attacked.health}`);
        // console.log(attacked.name, attacked.health, attacked.total);
        setHealtPercentage(attacked.health, attacked.total, position);
    } else {
        // console.log(`${attacked.name} evads the attack`);
    }
}

function validateHitAttack(attacked, controlKeys, index) {
    const fighter = fighters[index];
    fighter.keys = true;
    controlKeys.forEach(control => {
        // // console.log(control, fighter.keys, pressKeys.has(control));
        fighter.keys = fighter.keys && pressKeys.has(control);
    });
    if (fighter.keys && fighter.time) {
        attacks(fighter, attacked, index === 0 ? 'right' : 'left');
        fighter.time = false;
        setTimeout(() => {
            fighter.time = true;
        }, 1000 * 10);
    }
}

function validateKeys(first, second) {
    validateHitAttack(second, controls.PlayerOneCriticalHitCombination, 0);
    validateHitAttack(first, controls.PlayerTwoCriticalHitCombination, 1);
}
function keyUpAction(event, resolve) {
    const { code } = event;
    const [first, second] = fighters;
    pressKeys.delete(code);
    // // console.log(event);
    // // console.log(event.code);
    if (code === controls.PlayerOneAttack) {
        attacks(first, second, 'right');
    } else if (code === controls.PlayerOneBlock) {
        first.blocked = false;
    } else if (code === controls.PlayerTwoAttack) {
        attacks(second, first, 'left');
    } else if (code === controls.PlayerTwoBlock) {
        second.blocked = false;
    }
    isWin(first, second, resolve);
}

function keyDownAction(event, resolve) {
    const { code } = event;
    pressKeys.set(code);
    const [first, second] = fighters;
    validateKeys(first, second);
    if (code === controls.PlayerOneBlock) {
        first.blocked = true;
    } else if (code === controls.PlayerTwoBlock) {
        second.blocked = true;
    }
    isWin(first, second, resolve);
}

export async function fight(firstFighter, secondFighter) {
    const canMakeHitCombination = { keys: true, time: true };
    fighters = [
        { ...firstFighter, total: firstFighter.health, blocked: false, ...canMakeHitCombination },
        { ...secondFighter, total: secondFighter.health, blocked: false, ...canMakeHitCombination }
    ];
    return new Promise(resolve => {
        // // // console.log(pressKeys.values);
        // // // console.log(fighters);
        document.addEventListener('keyup', event => keyUpAction(event, resolve));
        document.addEventListener('keydown', event => keyDownAction(event, resolve));
        // resolve- the promise with the winner when fight is over
    });
}
