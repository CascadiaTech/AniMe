import { NextPage } from "next";
import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  SetStateAction,
  useMemo,
} from "react";
import * as THREE from "three";
import {
  PerspectiveCamera,
  ScrollControlsProps,
  useScroll,
} from "@react-three/drei";
import { OrbitControls, Html, useGLTF, useFBX } from "@react-three/drei";
import urljoin from "url-join";
import { Canvas, RootState } from "@react-three/fiber";
import { Object3DWrapper } from "../components/3DCharacterBuilder/ObjectWrapper";
import Error from "next/error";
import { Scroll, ScrollControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { animated, useSpring } from "react-spring";
import FooterComponent from "../components/Footer/FooterComponent";

const Home: NextPage = () => {
  useEffect(() => {
    async function ScrollpositionAnimation() {
      const targets = document.querySelectorAll(".js-show-on-scroll");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeIn");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeIn");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationdown() {
      const targets = document.querySelectorAll(".js-show-on-scroll-down");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeindown");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeindown");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationleft() {
      const targets = document.querySelectorAll(".js-show-on-scroll-left");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeinleft");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeinleft");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationright() {
      const targets = document.querySelectorAll(".js-show-on-scroll-right");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeinright");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeinright");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationscaleintopleft() {
      const targets = document.querySelectorAll(
        ".js-show-on-scroll-scaleintopleft"
      );
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-scaleintopleft");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-scaleintopleft");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    scrollpositionAnimationscaleintopleft();
    scrollpositionAnimationleft();
    scrollpositionAnimationright();
    scrollpositionAnimationdown();

    ScrollpositionAnimation();
  });

  const [page, setPage] = useState(Number);
  const [firstpgitems, setfirstpagevis] = useState(Boolean);

  const Charactermodel = () => {
    const bodyTraitPaths: string[] = ["/3dassets/body.glb"];
    const baseUrl = "http://localhost:3000";

    const mainCharacter = new THREE.Object3D();
    const traits: any[] = [];

    bodyTraitPaths.forEach((path) => {
      const { scene } = useGLTF(urljoin(baseUrl, path));
      traits.push(scene);
    });
    mainCharacter.add(traits[0]); // Add the first trait to the main character
    return mainCharacter;
  };

  const ThreeDmodelcharcter = useMemo(() => Charactermodel(), []);

  function ObjectComponent() {
    return <Object3DWrapper object={ThreeDmodelcharcter} />;
  }

  function RightFadeInText(position: any) {
    return (
      <>
        <div className="w-screen ml-40  mt-48 text-right">
          <p
            hidden={pagePosition == 1 ? false : true}
            className="text-white mr-40 js-show-on-scroll"
          >
            "Bringing light back"
          </p>
        </div>
      </>
    );
  }
  function LeftFadeInText(position: number, TextBlock: String) {
    return (
      <>
        <div className="w-screen ml-40  mt-48 text-left">
          <p
            hidden={visibleText == position ? false : true}
            className="text-white mr-40 js-show-on-scroll"
          >
            {TextBlock}
          </p>
        </div>
      </>
    );
  }

  const ThreeDmodel = useMemo(() => ObjectComponent(), [ThreeDmodelcharcter]);
  const [visibleText, setVisibleText] = useState(Number);
  const [pagePosition, setpagePosition] = useState(Number)
  
  function Foo(props: any) {
    const ref = useRef();
    const data = useScroll();
    useFrame(() => {
      const firstpg = data.visible(0, 1 / 200);
      setfirstpagevis(firstpg);
      //data.offset = 0 - 1  / 0.5 being middle
      // if you have 5 text blocks its .20 at a time
      setpagePosition(data.offset)
    
    });
    return <mesh ref={ref} {...props} />;
  }

  useEffect(() => {
    if (pagePosition >= 0 && pagePosition  < 0.20) {
      setVisibleText(1)
      // Transition text for this range
    } else if (pagePosition >= 0.20 && pagePosition < 0.40) {
      setVisibleText(2)
      // Transition text for this range
    } else if (pagePosition >= 0.4 && pagePosition < 0.60) {
      setVisibleText(3)
      // Transition text for this range
    } else if (pagePosition >= 0.6 && pagePosition < 0.80) {
      setVisibleText(4)
      // Transition text for the remaining range
    }
    else if (pagePosition >= 0.8 && pagePosition < 1) {
      setVisibleText(5)
      // Transition text for the remaining range
    }
    else {
      setVisibleText(6)
      // Transition text for the remaining range
    }

  },[])

  return (
    <>
      <div className={"flex flex-row"}>
        <div className={"flex flex-col"}>
          <div className="mb-34"></div>
          <div style={{ width: "100vw", height: "100vh", marginTop: '120px' }}>
            <Canvas>
              <ScrollControls pages={20} maxSpeed={1}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {ThreeDmodel}

                <Scroll html>
                  <div className="w-screen mr-40  mt-48 text-right js-show-on-scroll"></div>
                  <div className="w-screen ml-40  mt-48 text-left">
                    <p
                      hidden={pagePosition >= 0 && pagePosition <= 0.25 ? false : true}
                      className="text-white mr-40 js-show-on-scroll"
                    >
                      Anime "Arigato"
                    </p>
                  </div>
                  <div className="w-screen ml-40  mt-48 text-right">
          <p
            hidden={pagePosition == 1 ? false : true}
            className="text-white mr-40 js-show-on-scroll"
          >
            "Bringing light back"
          </p>
        </div>

                  <Foo position={[0, 0, 0]} />
                </Scroll>
              </ScrollControls>
            </Canvas>
          </div>
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </>
  );
};

export default Home;
