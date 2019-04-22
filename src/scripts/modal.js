const openModalButton = document.querySelector('.button--modal');
const modal = document.querySelector('.modal');
const overflow = document.querySelector('.modal__overflow');

const modalStuff = () => {
  openModalButton.addEventListener('click', e => {
    modal.classList.toggle('modal--active');
  });
  overflow.addEventListener('click', e => {
    modal.classList.remove('modal--active');
  });
};

export default modalStuff;