import { AnimatedTestimonials } from "./animated-testimonials";

interface ImageProps{
    githubImage: string
    animeImage: string
    name: string
    name_kanji: string
    githubBio: string
    githubname: string
    githubusername: string
    animeBio: string
}

export function MainPage({ githubImage, animeImage, name, name_kanji, githubBio, githubname, githubusername, animeBio }: ImageProps) {
  const testimonials = [
    {
      quote:
        animeBio,
      name: name,
      designation: name_kanji,
      src: animeImage,
    },
    {
      quote:
        githubBio,
      name: githubname,
      designation: githubusername,
      src: githubImage,
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
