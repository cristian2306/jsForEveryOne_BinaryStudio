import showModal from './modal';

export default function showWinnerModal(fighter) {
    showModal({
        title: 'Felicidades',
        bodyElement: `${fighter.name} ha vencido`
    });
    // call showModal function
}
