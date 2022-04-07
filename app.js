const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryEl = document.querySelector('.gallery');
const cards = onRenderItems(galleryItems);

const refs = {
  lightbox: document.querySelector('.lightbox'),
  image : document.querySelector('.lightbox__image'),
  closeBtn : document.querySelector('.lightbox__button'),
  overlay: document.querySelector('.lightbox__overlay')
}




galleryEl.insertAdjacentHTML('beforeend', cards);

galleryEl.addEventListener('click', onOpenModal);

refs.closeBtn.addEventListener('click', onCloseModal);

refs.overlay.addEventListener('click',onBackdropClick);



function onRenderItems(galleryItems){
  return galleryItems.map( item => { 
    return `<li class="gallery__item">
     <a
      class="gallery__link"
      href= "${item.original}"
    >
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source= "${item.original}"
        alt= "${item.description}"
      />
    </a>
  </li>`
  }).join('')
 
}
 
function onOpenModal(evt){
  window.addEventListener('keydown', onEscCloseModal);
  window.addEventListener('keydown', onClickRight);
  evt.preventDefault();

  if(!evt.target.closest('.gallery__item')){
    return
  }
  
  const img = evt.target.dataset.source;

  const alt = evt.target.alt;

  refs.lightbox.classList.add('is-open');

  refs.image.setAttribute('alt', alt);
  refs.image.setAttribute('src', img);
 
}

function onCloseModal(evt){
  window.removeEventListener('keydown', onEscCloseModal);
  window.removeEventListener('keydown', onClickRight);

  refs.lightbox.classList.remove('is-open');

  refs.image.removeAttribute('src');

  
}

function onBackdropClick(evt){

  if(evt.target === evt.currentTarget){
    onCloseModal()
  }
}

function onEscCloseModal(evt){
  if(evt.code === 'Escape'){
    onCloseModal()
  }
}

function onClickRight(evt){
  let operation;
  if(evt.code === 'ArrowRight'){
    operation = +1;
    onChangeImg(operation)
  }
  if(evt.code === 'ArrowLeft'){
    operation = -1;
    onChangeImg(operation)
  }
 
}

function onChangeImg(operation){
  const currentImg = refs.image.src;
  let nextImg = 0;
  for(const item of galleryItems){
    if(item.original === currentImg){
      nextImg = galleryItems.indexOf(item) + operation
    }
  }
  if(nextImg === galleryItems.length || nextImg === -1) return
  refs.image.setAttribute('alt', galleryItems[nextImg].description);
  refs.image.setAttribute('src', galleryItems[nextImg].original);
}
