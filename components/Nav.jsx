import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {
    // Exists on top of the page
    // Not sure if this should be on the quiz page or if this should become a sidebar.
    // Contains the Name on the left most side,
    return (
        <nav>
            <Link href='/'>
                <Image
                    src="/assets/imgs/logo-no-background.png"
                    width={100}
                    height={40}
                    alt='Prep & Learn Logo'
                />
            </Link>
            <div className="rightNav">
                <Link href='/practices'>
                    Practice Tests
                </Link>
                <Link href='/study_bits'>
                    Crash Courses
                </Link>
                <Link href='/about'>
                    About
                </Link>
                <Link href='/contribute'>
                    Contribute
                </Link>
            </div>
        </nav>
    )
}

export default Nav
