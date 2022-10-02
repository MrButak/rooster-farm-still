<template>

<header class="menu">
        <div class="menu-wrap">
            <div class="icon-wrapper">
            <a href="https://github.com/MrButak" target="_blank" rel="noreferrer noopener"><GithubIcon class="mobile-header-icon"/></a>
            <a href="mailto: mspence5555@gmail.com" target="_blank" rel="noreferrer noopener"><EmailIcon class="mobile-header-icon"/></a>
            <a href="https://www.linkedin.com/in/matthew-w-spence" target="_blank" rel="noreferrer noopener"><LinkedinIcon class="mobile-header-icon"/></a>
            </div>
            <input type="checkbox" id="checkbox">
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Projects</a></li>
                </ul>
            </nav>
            <label id="hamburg-icon" class="menu-icon" for="checkbox">
                <svg class="hamburgMenuIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">
                    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                </svg>
            </label>
        </div>
    </header>

</template>
    

<style lang="scss">


// pale yellow #fce373
// darker yellow (frame) rgb(252, 227, 115);
// pale purple #cca69a
// black #231f20
// pale red #f37449;


// light #E9C891  lighter #f0f0e4 orange #D06224 dark-rusty #AE431E olive #8A8635
// darker rust #7B3C3C
// #F3F0D7
.menu-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.5rem 2rem;
    height: 5rem;
    background-color: #fce373;
    width: 100%;
    border-bottom: 1px solid black;
}
.icon-wrapper {
    display: flex;
    gap: 30px;
}
#hamburg-icon {
    padding: 10px 0 0 20px;
    // fill: #5E454B;
    fill: #231f20;
    width: 4rem;
}
.mobile-header-icon {
    fill: #CEE5D0;
    
}
.mobile-header-icon:hover, .mobile-header-icon:focus {
    fill: #D06224;
}
nav {
    z-index: 2;
    position: absolute;
    background-color: #cca69a;
    top: 80px;
    left:0;
    width: 100%; 
}
nav ul {
    list-style-type: none;
    max-height: 0px;
    overflow: hidden;
    transition: all .2s;
}
nav ul li {
    padding: 0 15px;
}
nav ul li a {
    display: inline-block;
    padding: 12px;
    // color: #5E454B;
    color: #231f20;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.05em;
}
nav ul li a:hover, nav ul li a:focus {
    color: #C36839;
}
#checkbox {
    display: none;
}
#checkbox:checked ~ nav ul {
    max-height: 190px;
    padding: 15px 0;
    transition: all 0.5s;
    border: 1px solid #5E454B;
}
/*Header end*/
/*Tablet sizes---------------------------------------------------------*/
@media (min-width: 480px) {
    /*Header start*/
    .menu-wrap {
        height: 60px;
        width: 100%
    }
    /* nav {
        top: 60px;
    } */
    #hamburg-icon {
        padding: 6px 0 0 20px;
    }
    
}
/*Desktop sizes*-----------------------------------------------------*/
@media (min-width: 900px) { 
    /*Header start*/
    
    .menu-icon {
        display: none;
    }
    .icon-wrapper {
        display: flex;
        gap: 40px;
        padding: 11px 0 0 0;
        margin: 0 0 0 6vw;
    }
    nav {
        top: 8px;
        background-color: transparent;
    }
    nav ul {
        display: flex;
        max-height: 178px;
        padding: 2rem 0 0 0;
        justify-content: space-between;
    }
    nav ul li {
        display: inline-flex;
        padding-left: 20px;
    }
    nav ul li a {
        color: #231f20;
    }
    /*Header end*/
}

</style>