 window.addEventListener("scroll", function () {
            let header = document.getElementById("header");

            if (window.scrollY > 50) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }
        });