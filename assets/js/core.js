document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.querySelector('.dark_mode');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.innerHTML = '<i class="fe fe-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fe fe-moon"></i>';
        }
    } else {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fe fe-sun"></i>';
    }

    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            this.innerHTML = '<i class="fe fe-moon"></i>';
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            this.innerHTML = '<i class="fe fe-sun"></i>';
        }
    });

    if (window.self !== window.top) {
        let content = document.querySelector("body");
        if(content) {
            content.classList.add("offcanvas-active");
        }
        let header = document.querySelector(".section-body");
        if(header) {
            header.style.display = "none";
        }
        let sidebar = document.querySelector(".header_top");
        if(sidebar) {
            sidebar.style.display = "none";
        }
    }

    const buttons = document.querySelectorAll('.my_sort_cut');
    const iframes = document.querySelectorAll('.iframe');

    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-target');

            iframes.forEach(iframe => {
                iframe.classList.remove('show', 'active');
            });

            const targetIframe = document.getElementById(targetId);
            if (targetIframe) {
                targetIframe.classList.add('show', 'active');
            }

            buttons.forEach(btn => {
                btn.classList.remove('active');
            });

            this.classList.add('active');
        });
    });
});

function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    var tableSelect = document.getElementById(tableID);
    if (!tableSelect) {
        console.error('Tablo bulunamadı');
        return;
    }
    
    filename = filename?filename+'.xlsx':'excel_data.xlsx';
    
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    var workbook = XLSX.utils.table_to_book(tableSelect, {sheet: "Sheet1"});
    var excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    var blob = new Blob([excelBuffer], {type: dataType});
    
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = filename;
    
    downloadLink.click();
}

$(function() {
    "use strict";    
    
    const DIV_CARD = 'div.card';

    setTimeout(function() {
        $('.page-loader-wrapper').fadeOut();
    }, 50);

    $('.dropdown-menu').on('click', function(e) {
        e.stopPropagation();
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('[data-toggle="popover"]').popover({
        html: true
    });

    $('[data-toggle="card-remove"]').on('click', function(e) {
        var $card = $(this).closest(DIV_CARD);
        $card.remove();
        e.preventDefault();
        return false;
    });

    $('[data-toggle="card-collapse"]').on('click', function(e) {
        var $card = $(this).closest(DIV_CARD);

        $card.toggleClass('card-collapsed');
        e.preventDefault();
        return false;
    });

    $('[data-toggle="card-fullscreen"]').on('click', function(e) {
        var $card = $(this).closest(DIV_CARD);

        $card.toggleClass('card-fullscreen').removeClass('card-collapsed');
        e.preventDefault();
        return false;
    });

    var alterClass = function() {
        var ww = document.body.clientWidth;
        if (ww < 1530) {
            $('body').addClass('close_rightbar');
        } else if (ww >= 1531) {
            $('body').removeClass('close_rightbar');
        };
    };
    $(window).resize(function(){
        alterClass();
    });

    alterClass();
    $('a.right_tab').on('click', function() {
        $('body').toggleClass('right_tb_toggle');
    });
});


$(function() {
    "use strict";

	$('.sidebar-nav').metisMenu();

    $('.menu_toggle').on('click', function() {
		$('body').toggleClass('offcanvas-active');
    });

    $('.menu_option').on('click', function() {
		$('.metismenu').toggleClass('grid');
		$('.menu_option').toggleClass('active');
    });    

    $('.user_btn').on('click', function() {
		$('.user_div').toggleClass('open');
    });

	 $('a.settingbar').on('click', function() {
        $('.right_sidebar').toggleClass('open');
    });

    $('.page').on('click', function() {
        $('.theme_div, .right_sidebar').removeClass('open');
        $('.user_div').removeClass('open');
    });   
});

