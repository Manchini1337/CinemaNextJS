import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './Heroslide.module.css';
import Button, { OutlineButton } from '../button/button';
import Modal, { ModalContent } from '../modal/modal';
import modalclasses from '../modal/Modal.module.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/autoplay';

const HeroSlide = ({ movies }) => {
  SwiperCore.use([Autoplay]);

  return (
    <div className={classes.heroslide}>
      <Swiper
        modules={Autoplay}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        {movies.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? classes.active : ''}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movies.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  const item = props.item;
  const urlCode = item.trailerUrl.slice(32);
  const router = useRouter();

  const setModalActive = () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videoSrc = 'https://www.youtube.com/embed/' + urlCode;
    modal.querySelector('div > iframe').setAttribute('src', videoSrc);
    modal.classList.toggle(`${modalclasses.active}`);
  };

  return (
    <div
      className={`${classes.heroslide__item} ${props.className}`}
      style={{ backgroundImage: `url(${props.item.background})` }}
    >
      <div className={`${classes.heroslide__item__content} container`}>
        <div className={classes.heroslide__item__content__info}>
          <h2 className={classes.title}>{item.name}</h2>
          <div className={classes.overview}>{item.description}</div>
          <div className={classes.btns}>
            <Button onClick={() => router.push(`/movie/${item.id}`)}>
              Zobacz więcej
            </Button>

            <OutlineButton onClick={setModalActive}>
              Zobacz zwiastun
            </OutlineButton>
          </div>
        </div>
        <div className={classes.heroslide__item__content__poster}>
          <img src={item.poster} alt='poster' />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src', '');

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width='100%'
          height='500px'
          title='trailer'
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
