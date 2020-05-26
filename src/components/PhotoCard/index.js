import React, { useEffect, useRef, useState } from "react";
import { ImgWrapper, Img, Button, Article } from "./styles";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const DEFAULT_IMAGE =
  "https://i.etsystatic.com/15856319/r/il/6b9edb/2140620332/il_794xN.2140620332_qwfk.jpg";

export const PhotoCard = ({ id, likes = 0, src = DEFAULT_IMAGE }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const key = `like-${id}`;
  const [liked, setLiked] = useState(() => {
    try {
      const like = window.localStorage.getItem(key);
      return like;
    } catch (e) {
      return false;
    }
  });

  useEffect(
    function () {
      Promise.resolve(
        typeof window.IntersectionObserver !== "undefined"
          ? window.IntersectionObserver
          : import("intersection-observer")
      ).then(() => {
        const observer = new window.IntersectionObserver(function (entries) {
          const { isIntersecting } = entries[0];
          if (isIntersecting) {
            setShow(true);
            observer.disconnect();
          }
        });
        observer.observe(ref.current);
      });
    },
    [ref]
  );

  const Icon = liked ? MdFavorite : MdFavoriteBorder;
  const setLocalStorage = (value) => {
    try {
      window.localStorage.setItem(key, value);
      setLiked(value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Article ref={ref}>
      {show && (
        <>
          <a href={`/detail/${id}`}>
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </a>

          <Button onClick={() => setLocalStorage(!liked)}>
            <Icon size="32px" />
            {likes} likes!
          </Button>
        </>
      )}
    </Article>
  );
};
