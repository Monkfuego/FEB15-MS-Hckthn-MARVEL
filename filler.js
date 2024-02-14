const App = () => {
  React.useEffect(() => {
    let sections = document.querySelectorAll(".section"),
      images = document.querySelectorAll(".background"),
      headings = document.querySelectorAll(".section-title"),
      outerWrappers = document.querySelectorAll(".wrapper-outer"),
      innerWrappers = document.querySelectorAll(".wrapper-inner"),
      currentIndex = -1,
      wrap = (index, max) => (index + max) % max,
      animating;

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    function gotoSection(index, direction) {
      index = wrap(index, sections.length);
      animating = true;

      let fromTop = direction === -1;
      let dFactor = fromTop ? -1 : 1;
      let tl = gsap.timeline({ defaults: { duration: 1.25, ease: "power1.inOut" }, onComplete: () => (animating = false) });

      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { yPercent: -15 * dFactor })
          .set(sections[currentIndex], { autoAlpha: 0 });
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo([outerWrappers[index], innerWrappers[index]], { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) }, { yPercent: 0 }, 0)
        .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(headings[index], { autoAlpha: 0, yPercent: 150 * dFactor }, {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1,
          ease: "power2",
          stagger: { each: 0.02, from: "random" },
        }, 0.2);

      currentIndex = index;
    }

    function navigateSectionById(id) {
      let index = Array.from(sections).findIndex(section => section.id === id);

      if (index !== -1 && index !== currentIndex) {
        gotoSection(index, index > currentIndex ? 1 : -1);
      }
    }

    let lastTap = 0;
    document.addEventListener("touchend", function (event) {
      let currentTime = new Date().getTime();
      let tapLength = currentTime - lastTap;
      if (tapLength < 500 && tapLength > 0) {
        gotoSection(currentIndex + 1, 1);
        event.preventDefault();
      }
      lastTap = currentTime;
    });

    window.addEventListener("wheel", (event) => {
      if (event.deltaY < 0 && !animating) {
        gotoSection(currentIndex - 1, -1);
      } else if (event.deltaY > 0 && !animating) {
        gotoSection(currentIndex + 1, 1);
      }
    });

    document.querySelectorAll("nav a").forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        navigateSectionById(e.currentTarget.getAttribute("href").slice(1));
      });
    });

    gotoSection(0, 1);
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <nav>
          <a href="#first">One </a>
          <a href="#second">Two </a>
          <a href="#third">Three </a>
          <a href="#fourth">Four </a>
          <a href="#fifth">START</a>
        </nav>
      </header>
      <Section id="first" title="Strange" className="first" bgUrl="https://cdn.discordapp.com/attachments/1151163653362565272/1207311342378426398/bleh.jpeg?ex=65df2f4e&is=65ccba4e&hm=811c0d721dafad3e0c5f42b5ba793e6d1a47c4aa6e7a00fe3a32d0a9deb7c952&"/>
      <Section id="second" title="-" className="second" bgUrl="https://imgs.search.brave.com/qF16K4YQ6pjNUJUOL36poQaYWb_smgi6bVcq9I6AC4k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM3LmFscGhhY29k/ZXJzLmNvbS83MjUv/NzI1NjE1LmpwZw"/>
      <Section id="third" title="-" className="third" bgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEqT_U9Yk-ZCrSTw-_Io-t-53CGkfIy_k9AQ&usqp=CAU" />
      <Section id="fourth" title="-" className="fourth" bgUrl="https://wallpapersmug.com/download/1600x900/0522ca/doctor-strange-fan-made.jpg" />
      <Section id="fifth" title="COME WITH ME" className="fifth" bgUrl="https://picstatio.com/download/1600x900/b4fdd7/superman-in-space.jpg" />
    </div>
  );
};
const Section = ({ id, title, className, bgUrl }) => {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="wrapper-outer">
        <div className="wrapper-inner">
          <div className="background" style={{ backgroundImage: `url(${bgUrl})` }}>
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
