import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });
    fighterElement.append(createFighterImage(fighter));
    const infoListElement = createElement({
        tagName: 'ul',
        className: `fighter-preview___info`
    });
    const fighterValues = Object.values(fighter);
    fighterValues.forEach(el => {
        const infoElement = createElement({
            tagName: 'li'
        });
        infoElement.innerHTML = el;
        infoListElement.appendChild(infoElement);
    });
    // console.log(fighterValues, fighterKeys, fightersInfoElement);
    fighterElement.append(infoListElement);

    // todo: show fighter info (image, name, health, etc.)

    return fighterElement;
}
