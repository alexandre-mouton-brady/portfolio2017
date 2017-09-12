const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);

const state = {
  lang: document.querySelector('[lang]').lang,
  canMove: false,
  info: $('.info'),
  infoImg: $('.info > img'),
  currentInfo: null,
  links: Array.from($$('[data-info]')),
  getInfo: state => {
    return state.currentInfo.dataset.info;
  }
};

const handleLinks = e => {
  state.canMove = true;
  state.currentInfo = e.target;
  state.info.classList.add('active');

  const path =
    state.lang === 'en'
      ? `../img/${state.getInfo(state)}`
      : `./img/${state.getInfo(state)}`;

  state.infoImg.src = path;
};

state.links.forEach(link => {
  link.addEventListener('mouseover', handleLinks);
});

state.links.forEach(link => {
  link.addEventListener('mouseleave', e => {
    state.canMove = false;
    state.info.classList.remove('active');
  });
});

document.body.addEventListener('mousemove', e => {
  if (state.canMove) {
    requestAnimationFrame(() => {
      state.info.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
    });
  }
});
