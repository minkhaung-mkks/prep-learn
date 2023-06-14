import React from 'react';
import '@styles/global.css';
import '@styles/home.css';

const page = () => {
    return (
        <main>
        <section className="hero_box">
            <img src="assets/imgs/logo-no-background.png" alt="Prep & Learn Logo" className="hero_logo" />
            <h2 className="tagline fancy_tagline">
                Inspiring Potential, Encouraging Dreams
            </h2>
            <h2 className="tagline">Your Portal to Free Learning</h2>
            <p className="intro">
                Prep & learn mission is to provide free, high-quality educational
                resources, thus breaking down the barriers that often restrict
                students from accessing essential learning materials. While the
                current focus in on GED exams, this platform is dedicated to assisting
                you on your learning journey by giving you the tools needed to
                succeed.
            </p>
            <button className="action_btns">Get Started</button>
        </section>
        <section className="LR_box imgR">
            <div className="left_side">
                <h3 className="sub_heading fancy_tagline">
                    A Personal Struggle Turned Mission
                </h3>
                <p className="content">
                    Prep & Learn was born from a personal struggle to find excellent,
                    cost-free practice tests. Studying for the GED exams, I realized the
                    challenge wasn&apos;t just in the learning but also in finding the right
                    resources to validate that learning. While paid platforms were
                    available, they remained inaccessible to many in developing
                    countries, including myself, due to their costs. It was this
                    struggle that gave birth to the idea of Prep & Learn.
                </p>
            </div>
            <div className="right_side">
                <img src="assets/imgs/590.jpg" alt="A vector graphic of a book with a light bulb near it."
                    className="graphic_art" />
                <a href="https://www.vecteezy.com/free-vector/studying">Studying Vectors by Vecteezy</a>
            </div>
        </section>
        <section className="LR_box imgL">
            <div className="left_side">
                <img src="assets/imgs/AI.jpg"
                    alt="A vector graphic of a desk with a stack of books right in front of a computer"
                    className="graphic_art" />
                <a href="https://www.vecteezy.com/free-vector/studying">Studying Vectors by Vecteezy</a>
            </div>
            <div className="right_side">
                <h3 className="sub_heading fancy_tagline">
                    A New Apporach to an Old Problem
                </h3>
                <p className="content">
                    Creating quality practice tests usually needs a lot of time and people. At Prep & Learn, we use AI,
                    specifically GPT-4, to create tests in a matter of minutes. Then, either I or an instructor gives
                    them agit
                    review to make sure they&apos;re up to standard.
                </p>
                <p className="content">
                    GPT-4 also allow us to easily provide reasoning behind the answers, giving us a ready made template
                    to
                    include any additional information we want to include. Which can be perfect for creating bite-sized
                    study notes, to remind students on essential concepts and terms.
                </p>
            </div>
        </section>
        <section className="LR_box imgR">
            <div className="left_side">
                <h3 className="sub_heading fancy_tagline">Navigating the Limitations</h3>
                <p className="content">
                    This approach, though effective, comes with certain limitations, the biggest being that
                    GPT-4 sometimes messes up on knowledge-based questions because of its training data limits.
                    Additionally
                    while our generated tests are excellent
                    revising what you&apos;ve learned, they are not truly representative of the real exams.
                    This is why we want to team up with educational institutions, blending their expertise with our
                    AI-generated content to make our tests feel as real as possible, even if they&apos;re not a perfect
                    match.
                </p>
                <p className="content">
                    Of course the current biggest limitation is that I am the only one doing everything for this
                    platform. So if you wish to contribute to this please let me know.
                </p>
            </div>
            <div className="right_side">
                <img src="assets/imgs/636_generated.jpg"
                    alt="A vector graphic of a people trying to piece together a light bulb" className="graphic_art" />
                <a href="https://www.vecteezy.com/free-vector/web">Web Vectors by Vecteezy</a>
            </div>
        </section>
        <section className="hero_box final_box">
            <div className="final_box_in_view"></div>
            <h2 className="tagline">
                Every dream begins with a step
            </h2>
            <h2 className="tagline">
                Let Prep & Learn be that first step on your path to success.
            </h2>
            <button onClick="toggleView()" className="last_call_btn btn-5">
                Take the first step
            </button>
        </section>
    </main>
    )
}

export default page