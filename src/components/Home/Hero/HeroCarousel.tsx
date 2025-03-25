"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useQuery } from "urql";
import { GeHeroHomeDocument } from "@/graphql/generated/graphql";
import client from "@/graphql/client";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroCarousal = () => {
  const [result] = useQuery({ query: GeHeroHomeDocument, client });

  const loading = result.fetching;
  const data = result.data?.heroHomes.map((hero, index) => ({
    tituloprinsipal: hero?.tituloprinsipal,
    titulodos: hero?.titulodos,
    id: index + 1,
    description: hero.Descripcion,
    img: hero.Url_imagen || "/images/hero/hero-1.png",
    textoBoton: hero.botonTexto,
    urlBoton: hero.redirectPromocion,
    clasBoton: hero.classColorBoton,
    descuento: hero.Descuento,
  }));

  return (
    <Swiper
      spaceBetween={300}
      centeredSlides={true}
      autoplay={{
        delay: 5500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {loading
        ? // Mostrar Skeleton mientras se cargan los datos
          [1, 2, 3].map((_, i) => (
            <SwiperSlide key={i}>
              <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
                <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
                  <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                    <Skeleton height={40} width={80} />
                    <Skeleton height={20} width={60} />
                  </div>

                  <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                    <Skeleton height={30} width="80%" />
                  </h1>

                  <p>
                    <Skeleton height={20} width="90%" />
                    <Skeleton height={20} width="85%" />
                  </p>

                  <Skeleton height={40} width={120} className="rounded-md mt-4" />
                </div>

                <div>
                  <Skeleton height={358} width={351} />
                </div>
              </div>
            </SwiperSlide>
          ))
        : // Mostrar los datos reales cuando la carga termine
          data?.map((hero) => (
            <SwiperSlide key={hero.id}>
              <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
                <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
                  <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                    <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                      {hero.descuento}%
                    </span>
                    <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                      Sale<br />Off
                    </span>
                  </div>

                  <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                    <a href={hero.urlBoton}>{hero.tituloprinsipal}</a>
                  </h1>

                  <p>{hero.description}</p>

                  <a href={hero.urlBoton} className={hero.clasBoton}>
                    {hero.textoBoton}
                  </a>
                </div>

                <div>
                <Image
                  src={hero.img}
                  alt={hero.tituloprinsipal || "Imagen del héroe"} // ✅ Evita valores vacíos
                  width={351}
                  height={358}
                  key={hero.id}
                />
                </div>
              </div>
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default HeroCarousal;
