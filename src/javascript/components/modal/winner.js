import { createFighterImage } from '../fighterPreview';
import showModal from './modal';

export default function showWinnerModal(fighter) {
    showModal({
        title: 'WIN!!!',
        bodyElement: createFighterImage(fighter)
    });
    // call showModal function
}
