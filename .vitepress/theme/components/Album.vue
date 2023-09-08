<template>
  <main>
    <div id="gallery" @scroll="handleScroll" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <figure>
        <img
          src="https://images.unsplash.com/photo-1610042560883-3cab6606b805?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODczNDB8&ixlib=rb-4.0.3&q=100&w=500"
          alt="Pink and blue clouds at sunset. " title="Photo by Jeremy Doddridge for Unsplash">
        <figcaption>8 PM, Summer</figcaption>
      </figure>
      <figure>
        <div>
          <div>
            <h2>Note</h2>
            <p>Scroll Animation!</p>
            <p><br><small>Hover animation : <br><a href="#">Hover animation</a></small></p>
          </div>
        </div>
      </figure>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODczNDB8&ixlib=rb-4.0.3&q=100&w=500"
          alt="Low angle view up into a sky filled with deep blue clouds. "
          title="Photo by Matthew Brayer for Unsplash">
        <figcaption>3 PM, Winter</figcaption>
      </figure>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc0ODZ8&ixlib=rb-4.0.3&q=100&w=500"
          alt="Heavy gray clouds in the sky. " title="Photo by Simeon Muller for Unsplash">
        <figcaption>10 AM, Summer Storm</figcaption>
      </figure>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc1Mjl8&ixlib=rb-4.0.3&q=100&w=500"
          alt="Deep orange clouds at sunset. " title="Photo by Laura Vinck for Unsplash">
        <figcaption>5 PM, Autumn</figcaption>
      </figure>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1583506140156-6e343f045b81?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc1OTV8&ixlib=rb-4.0.3&q=100&w=500"
          alt="Clouds in shades of dark blue and magenta at sunset. " title="Photo by Szabo Viktor for Unsplash">
        <figcaption>7 PM, Spring</figcaption>
      </figure>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1493130952181-47e36589f64d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc2NTJ8&ixlib=rb-4.0.3&q=100&w=500"
          alt="Clouds in shades of blue and gold at sunrise. " title="Photo by Łukasz Łada for Unsplash">
        <figcaption>6:30 AM, Summer</figcaption>
      </figure>
      <figure>
        <img
          src='https://images.unsplash.com/photo-1514519334989-3d5c8b1a9f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMyOTk0NzR8&ixlib=rb-4.0.3&q=100&w=500'
          alt='clouds and sky during daytime' title="Photo by Diego PH for Unsplash">
        <figcaption>6 PM, Autumn</figcaption>
      </figure>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1589517628174-5698bcf47311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMyOTk4MTd8&ixlib=rb-4.0.3&q=100&w=500"
          alt="white clouds and blue sky. " title="Photo by Carlos Kenobi for Unsplash">
        <figcaption>5 PM, Summer</figcaption>
      </figure>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1509803874385-db7c23652552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMzMDAwMDh8&ixlib=rb-4.0.3&q=100&w=500"
          alt="cloudy sky. " title="Photo by Alex Machado for Unsplash">
        <figcaption>11 AM, Summer</figcaption>
      </figure>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1563846465145-c733e29ee0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMzMDA5MDV8&ixlib=rb-4.0.3&q=100&w=500"
          alt="rainbow during daytime. " title="Photo by Yulia Gadalina for Unsplash">
        <figcaption>2 PM, Spring Rainbow</figcaption>
      </figure>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1542272201-b1ca555f8505?ixlib=rb-4.0.3&q=100&w=jpg&crop=entropy&cs=srgb&w=500"
          alt="white sea of clouds. " title="Photo by Szabo Viktor for Unsplash">
        <figcaption>4 PM, Autumn</figcaption>
      </figure>
    </div>
  </main>
  <footer id='info'><a href="#">@xuyirui-1</a></footer>
</template>
<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  onMounted(() => {
    gallery.value = document.querySelector('#gallery');
    window.addEventListener('resize', handleScroll);
    handleScroll();
  });
  const gallery = ref(null);
  const active = ref(false);
  const time = 10000;
  const handleScroll = () => {
    if (!active.value) {
      gallery.value.classList.add('active');
      setTimeout(() => {
        gallery.value.classList.remove('active');
        gallery.value.offsetWidth;
      }, time);
    }
  };
  const handleMouseOver = () => {
    if (!active.value) {
      gallery.value.classList.add('active');
    }
  };
  const handleMouseOut = () => {
    if (active.value) {
      gallery.value.classList.remove('active');
    }
  };
  onUnmounted(() => {
    window.removeEventListener('resize', handleScroll);
  });
</script>
<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css2?family=Kalam:wght@400&display=swap");

  :root {
    --adjust-size: 0px;
    /* 必要に応じて */
  }

  main {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
  }

  p {
    line-height: 1;
  }

  a {
    color: crimson;
    text-decoration: none;
  }

  img {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
  }

  #gallery {
    position: relative;
    left: calc(-1 * var(--adjust-size));
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    padding: 20px;
    -webkit-perspective: 0;
    perspective: 0;
  }

  #gallery figure:nth-child(7n) {
    --duration: 1s;
    --pin-color: crimson;
  }

  #gallery figure:nth-child(7n + 1) {
    --duration: 1.8s;
    --pin-color: hotpink;
  }

  #gallery figure:nth-child(7n + 2) {
    --duration: 1.3s;
    --pin-color: magenta;
  }

  #gallery figure:nth-child(7n + 3) {
    --duration: 1.5s;
    --pin-color: orangered;
  }

  #gallery figure:nth-child(7n + 4) {
    --duration: 1.1s;
    --pin-color: darkorchid;
  }

  #gallery figure:nth-child(7n + 5) {
    --duration: 1.6s;
    --pin-color: deeppink;
  }

  #gallery figure:nth-child(7n + 6) {
    --duration: 1.2s;
    --pin-color: mediumvioletred;
  }

  #gallery figure:nth-child(3n) {
    --angle: 3deg;
  }

  #gallery figure:nth-child(3n + 1) {
    --angle: -3.3deg;
  }

  #gallery figure:nth-child(3n + 2) {
    --angle: 2.4deg;
  }

  #gallery figure:nth-child(odd) {
    --direction: alternate;
  }

  #gallery figure:nth-child(even) {
    --direction: alternate-reverse;
  }

  #gallery figure {
    --angle: 3deg;
    --count: 5;
    --duration: 1s;
    --delay: calc(-0.5 * var(--duration));
    --direction: alternate;
    --pin-color: red;

    position: relative;
    display: inline-block;
    margin: var(--adjust-size);
    padding: 0.5rem;
    border-radius: 5px;
    box-shadow: 0 7px 8px rgba(0, 0, 0, 0.4);
    width: 100%;
    height: auto;
    text-align: center;
    background-color: ghostwhite;
    background-image: url("https://images.unsplash.com/photo-1629968417850-3505f5180761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMzMjQ3ODJ8&ixlib=rb-4.0.3&q=80&w=500");
    background-size: cover;
    background-position: center;
    background-blend-mode: multiply;

    transform-origin: center 0.22rem;
    will-change: transform;
    break-inside: avoid;
    overflow: hidden;
    outline: 1px solid transparent;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  #gallery.active figure {
    animation-duration: var(--duration), 1.5s;
    animation-delay: var(--delay),
      calc(var(--delay) + var(--duration) * var(--count));
    animation-timing-function: ease-in-out;
    animation-iteration-count: var(--count), 1;
    animation-direction: var(--direction), normal;
    animation-fill-mode: both;
    animation-name: swing, swingEnd;
  }

  #gallery figure:after {
    position: absolute;
    top: 0.22rem;
    left: 50%;
    width: 0.7rem;
    height: 0.7rem;
    content: "";
    background: var(--pin-color);
    border-radius: 50%;
    box-shadow: -0.1rem -0.1rem 0.3rem 0.02rem rgba(0, 0, 0, 0.5) inset;
    filter: drop-shadow(0.3rem 0.15rem 0.2rem rgba(0, 0, 0, 0.5));
    transform: translateZ(0);
    z-index: 2;
  }

  figure img {
    aspect-ratio: 1 /1;
    width: 100%;
    object-fit: cover;
    display: block;
    border-radius: 5px;
    margin-bottom: 10px;
    z-index: 1;
  }

  figure figcaption {
    font-size: 14px;
    font-weight: 400;
    z-index: 1;
  }

  figure h2 {
    color: crimson;
    font-size: 22px;
  }

  figure p {
    font-size: 17px;
  }

  figure small {
    font-size: 12px;
  }

  figure>div {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @keyframes swing {
    0% {
      transform: rotate3d(0, 0, 1, calc(-1 * var(--angle)));
    }

    100% {
      transform: rotate3d(0, 0, 1, var(--angle));
    }
  }

  @keyframes swingEnd {
    to {
      transform: rotate3d(0, 0, 1, 0deg);
    }
  }

  #info {
    position: relative;
    text-align: center;
    z-index: 1;
  }

  #info a {
    font-size: 1.1rem;
  }

  /*
@media (orientation: landscape) {
	#gallery {
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	}
}
*/
  @media (min-width: 800px) {
    #gallery {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
  }
</style>