<template>

<header class="header-wrapper">
    <input type="checkbox" id="checkbox" />
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
    <label for="checkbox">
        X
    </label>
        
</header>
    
</template>

<style>

.header-wrapper {
    display: flex;
    background-color: blue;
    height: 10rem;
}

nav {
    z-index: 2;
    position: absolute;
    background-color: #CEE5D0;
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
    color: #5E454B;
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

/*Tablet sizes---------------------------------------------------------*/
@media (min-width: 480px) {
    
    .menu-wrap {
        height: 60px;
        width: 100%
    }
    
    
}
/*Desktop sizes*-----------------------------------------------------*/
@media (min-width: 900px) { 
    
    nav {
        top: 8px;
        background-color: transparent;
    }
    nav ul {
        max-height: 178px;
        padding: 12px 0 0 0;;
        margin: 0 6vw 0 0;
        align-items: center;
        text-align: right;
    }
    nav ul li {
        display: inline-flex;
        padding-left: 20px;
    }
    nav ul li a {
        color: #CEE5D0;
    }
    
}

</style>