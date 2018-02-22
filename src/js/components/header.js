(() => {
    let $nav = null,
        $header = null,
        $navBtn = null,
        $body = null,
        $bg = null,
        $navLink = null,
        $characterBtn = null,
        $closeBtn = null;

    init = () => {
        $body = $("body");
        $header = $(".header");
        $nav = $(".header-nav");
        $navBtn = $(".mobile-nav-btn");
        $closeBtn = $(".header-nav-close-btn");
        $bg = $(".header-nav-bg");
        $navLink = $(".header-nav-li a");
        $characterBtn = $(".header-character");

        actions();
    };

    actions = () => {
        $navBtn.on("click", () => {
           $body.addClass("open-nav");
        });

        $closeBtn.on("click", closeNav);

        $bg.on("click", closeNav);

        $navLink.on("click", (event) => {
            closeNav();
            animateScroll(event);
        });

        $characterBtn.on("click", animateScroll);
    };

    animateScroll = (event) => {
        event.preventDefault();

        let target = event.target;
        let id = $(target).parent().attr("href");
        if(id === null){
            id = $(target).attr("href");
        }
        if($header.hasClass("info")){
            window.location = "index.html" + id;
        }
        if(id !== '#' && $(id)[0]){
            window.scrollTo({
                'behavior': 'smooth',
                'left': 0,
                'top': $(id)[0].offsetTop
            });
        }
    };

    closeNav = () => {
        $body.removeClass("open-nav");
    };

    $(document).ready(init);
})();
