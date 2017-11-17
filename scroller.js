 //Variables
        var sScroll;
        var animasjonScroll;
        var travel;
        var kjorAnimasjon;
        var scrollT;
        var dataID;
        var dataT;
        var dataHast;
        var startSted;
        var sluttSted;
        var lengde;
        var increments;
        var stoppAnimasjon;
        
        
    
    (function() {

  
    // Funksjonstest
    if ( 'querySelector' in document && 'addEventListener' in window ) {

        // Funksjon for animasjon
        sScroll= function (fast, tid) {

            // finner ut hvor du er
             startSted= window.pageYOffset;
            sluttSted = fast.offsetTop;
             lengde = sluttSted - startSted;
            increments = lengde/(tid/16);
            

            // Skrolling på siden, en sjekk for å stoppe
             animasjonScroll = function () {
                window.scrollBy(0, increments);
                stoppAnimasjon();
            };

            // Rulle ned
            if ( increments >= 0 ) {
                // Stopp nederst på siden
                stoppAnimasjon = function () {
                     travel = window.pageYOffset;
                    if ( (travel >= (sluttSted - increments)) || ((window.innerHeight + travel) >= document.body.offsetHeight) ) {
                        clearInterval(kjorAnimasjon);
                    }
                };
            }
            // Når du skroller opp
            else {
                // stopp når du er øverst
                stoppAnimasjon = function () {
                     travel = window.pageYOffset;
                    if ( travel <= (sluttSted || 0) ) {
                        clearInterval(kjorAnimasjon);
                    }
                };
            }

            // Animasjonsfunksjonen
             kjorAnimasjon = setInterval(animasjonScroll, 16);
       
        };
        
        
        //Den finner klassen Scroll sånn den vet hvor den skal skrolle    
         scrollT = document.querySelectorAll('.scroll');

        // For hver scroll klasse
        [].forEach.call(scrollT, function (toggle) {

            // Når scroll klassen er lenket
            toggle.addEventListener('click', function(e) {

                // Stopper unødvendig linking, de som ikke har klassen Scroll
                e.preventDefault();
                
                //Finner lenken rask og finner avstanden fra toppen
                 dataID = toggle.getAttribute('href');
                dataT = document.querySelector(dataID);
                 dataS = toggle.getAttribute('data-speed');

                // Hvis det eksisterer
                if (dataT) {
                    // Skroll ned hurtig
                    sScroll(dataT, dataS || 500);
                }

            }, false);

        });

    }

 })();