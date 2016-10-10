var conf = angular.module("confApp",[]);

conf.service ("configService", function (){

    this.path_root = 'http://www.pappai.it/agroalimentare-ws/';
    this.ricercaUrl = this.path_root + 'ricerca_prodotti?';
    this.ricetteUrl = this.path_root + 'ricetta_prodotto?nid=';
    this.dashboardUrl = this.path_root + 'dashboard_prodotti?';
    this.dashboardHrUrl = this.path_root + 'dashboard_prodotti_hr?';
    this.dashboardVrUrl = this.path_root + 'dashboard_prodotti_vr?';
    this.detailUrl = this.path_root + 'dettaglio_prodotto?nid=';
    this.detailBarcodeUrl = this.path_root + 'dettaglio_prodotto_barcode?barcode=';
    this.headerConfig = {
        headers: {
            Authorization: 'Basic '+ btoa("wsuser:pappai"),
            dataType: "json"
        }
    };

    this.getHeaderConfig = function () {
        return this.headerConfig;
    }

    this.getRicercaUrl = function($categories) {
        if ($categories)
            return this.ricercaUrl + 'lang=' + getLanguage() + buildFilterUrl() + ricercaFilterUrl($categories);
        else
            return this.ricercaUrl + 'lang=' + getLanguage() + buildFilterUrl();
    };

    this.getRicetteUrl = function() {
        return this.ricetteUrl;
    };

    this.getDashboardUrl = function() {
        return this.dashboardUrl + 'lang=' + getLanguage() + buildFilterUrl();
    };

    this.getDashboardHrUrl = function() {
        return this.dashboardHrUrl + 'lang=' + getLanguage() + buildFilterUrl();
    };

    this.getDashboardVrUrl = function() {
        return this.dashboardVrUrl + 'lang=' + getLanguage() + buildFilterUrl();
    };

    this.getDetailUrl = function() {
        return this.detailUrl;
    };

    this.getDetailBarcodeUrl = function() {
        return this.detailBarcodeUrl;
    };



});

conf.service ("labelService", function (){

    this.labelsIT = {"scopri" : "scopri",
        "naviga" : "Naviga",
        "home" : "Home",
        "gotohome" : "Conferma",
        "scansiona" : "Scopri",
        "personalizza" : "Personalizza",
        "progetto" : "Il Progetto",
        "guida" : "Guida",
        "cerca" : "Cerca",
        "info" : "Info",
        "contatti" : "Contatti",
        "naviga_testo" : "Naviga tra i prodotti, filtrandoli per categoria merceologica o nome, per accedere a maggiori dettagli sul prodotto",
        "personalizza_testo" : "Personalizza le tue ricerche in base alle tue abitudini alimentari, allergie e intolleranze",
        "scopri_testo" : "Punta la fotocamera sul codice a barre di un prodotto per scoprire se soddisfa le tue esigenze alimentari",
        "nessun_allergene" : "Nessun allergene presente",
        "non_presenti" : "Non presenti per questo prodotto",
        "lista_prodotti" : "Prodotti",
        "prodotto" : "Prodotto",
        "descrizione" : "Descrizione",
        "abitudine" : "Abitudine alimentare",
        "gda": "Valore Giorn. di Riferimento",
        "gda_label": "Valore (in Calorie)",
        "perc_calorie" : "Valore energetico (calorie)",
        "porzione_contiene" : " equivale al ",
        "valore_giornaliero_riferimento" : "del tuo valore giornaliero di riferimento",
        "marchi" : "Marchi",
        "categoria" : "Categoria",
        "allergie" : "Allergeni",
        "ingredienti": "Ingredienti",
        "valori_nutrizionali": "Valori nutrizionali",
        "ricette": "Ricette",
        "difficolta": "Difficoltà",
        "tempo": "Tempo di realizzazione",
        "produttore": "Produttore",
        "sito_web": "Sito web",
        "storia" : "Storia",
        "luogo_produzione": "Prodotto a",
        "filiera" : "Filiera",
        "tipologia_produzione": "Tipo Produzione",
        "tecniche_produzione" : "Tecniche di produzione",
        "turismo_eventi" : "Turismo ed eventi"};

    this.labelsEN = {"scopri" : "Discover",
        "naviga" : "Browse",
        "home" : "Home",
        "gotohome" : "Submit",
        "scansiona" : "Scan a product",
        "cerca" : "Search",
        "personalizza" : "Set your account",
        "guida" : "Help",
        "progetto" : "The Project",
        "info" : "Info",
        "contatti" : "Contacts",
        "naviga_testo" : "Browse products by category or name to access product details",
        "personalizza_testo" : "Customise your search according to your dietary needs, intolerances and allergies",
        "scopri_testo" : "Scan the barcode of a product to know if it meets your dietary needs",
        "nessun_allergene" : "None",
        "non_presenti" : "Not defined",
        "lista_prodotti" : "All Products",
        "prodotto" : "Product",
        "descrizione" : "Description",
        "abitudine" : "Diet and Lifestyle",
        "gda": "Guideline Daily Amounts",
        "gda_label": "GDA (calories)",
        "perc_calorie" : "Valore energetico (calorie)",
        "porzione_contiene" : " equivale al ",
        "valore_giornaliero_riferimento" : "del tuo valore giornaliero di riferimento",
        "marchi" : "Certifications",
        "categoria" : "Categories",
        "allergie" : "Allergens",
        "ingredienti": "Ingredients",
        "valori_nutrizionali": "Nutritional values",
        "ricette": "Recipes",
        "difficolta": "Difficulty",
        "tempo": "Preparation time",
        "produttore": "Producer",
        "sito_web": "Producer web site",
        "storia" : "History",
        "luogo_produzione": "Produced in",
        "filiera" : "Supply chain",
        "tipologia_produzione": "Production typology",
        "tecniche_produzione" : "Production procedure",
        "turismo_eventi" : "Tourism and Events"};

    this.taxIT = {
        "senape" : "Senape",
        "glutine" : "Glutine",
        "lattosio" : "Lattosio",
        "latte_vaccino" : "Proteine del latte vaccino",
        "uova" : "Uova",
        "arachidi" : "Arachidi",
        "frutta_guscio" : "Frutta a guscio",
        "soia" : "Soia",
        "sesamo" : "Semi di sesamo",
        "pesce" : "Pesce",
        "crostacei" : "Crostacei",
        "molluschi" : "Molluschi",
        "anidride_solfiti" : "Anidride solforosa e solfiti",
        "sedano" : "Sedano",
        "lupini" : "Lupini"
    };

    this.taxEN = {
        "senape" : "Mustard",
        "glutine" : "Gluten",
        "lattosio" : "Lactose",
        "latte_vaccino" : "Cow's milk protein",
        "uova" : "Eggs",
        "arachidi" : "Peanuts",
        "frutta_guscio" : "Shell nuts",
        "soia" : "Soy",
        "sesamo" : "Sesame seeds",
        "pesce" : "Fish",
        "crostacei" : "Shellfish",
        "molluschi" : "Mollusc",
        "anidride_solfiti" : "Sulfur dioxide and sulphites",
        "sedano" : "Celery",
        "lupini" : "Lupins"
    };

    this.taxLabelsIT = {
        "non_presenti": "Non presenti per questo prodotto",
        "senza_senape" : "SENZA " + this.taxIT['senape'],
        "senza_glutine" : "SENZA " + this.taxIT['glutine'],
        "senza_lattosio" : "SENZA " + this.taxIT['lattosio'],
        "senza_latte_vaccino" : "SENZA " + this.taxIT['latte_vaccino'],
        "senza_uova" : "SENZA " + this.taxIT['uova'],
        "senza_arachidi" : "SENZA " + this.taxIT['arachidi'],
        "senza_frutta_guscio" : "SENZA " + this.taxIT['frutta_guscio'],
        "senza_soia" : "SENZA " + this.taxIT['soia'],
        "senza_sesamo" : "SENZA " + this.taxIT['sesamo'],
        "senza_pesce" : "SENZA " + this.taxIT['pesce'],
        "senza_crostacei" : "SENZA " + this.taxIT['crostacei'],
        "senza_molluschi" : "SENZA " + this.taxIT['molluschi'],
        "senza_anidride_solfiti" : "SENZA " + this.taxIT['anidride_solfiti'],
        "senza_sedano" : "SENZA " + this.taxIT['sedano'],
        "senza_lupini" : "SENZA " + this.taxIT['lupini'],
        "vegetariana": "Vegetariano",
        "vegana": "Vegano",
        "formaggi_latticini" : "Formaggi e latticini",
        "frutta_secca_legumi" : "Frutta secca e legumi",
        "miele" : "Miele",
        "pasta_riso" : "Pasta e riso",
        "prodotti_forno" : "Prodotti da forno",
        "semola_farina" : "Semolina e farina",
        "dolci" : "Dolci",
        "sottolio" : "Sottolio",
        "conserve_confetture" : "Conserve e confetture",
        "sale_spezie" : "Sale e spezie",
        "olio_olive" : "Olio e olive",
        "prodotti_ittici" : "Prodotti ittici",
        "vini" : "Vini",
        "birre" : "Birre",
        "distillati_liquori" : "Distillati e liquori",
        "salumi" : "Prodotti tipici",
        "altro" : "Altro",
        "amido" : "Amido",
        "carboidrati" : "Carboidrati",
        "carboidrati_di_cui_saturi" : "Carboidrati (di cui zuccheri)",
        "fibre" : "Fibre",
        "grassi" : "Grassi",
        "grassi_di_cui_saturi" : "Grassi (di cui saturi)",
        "minerali" : "Minerali",
        "monoinsaturi" : "Monoinsaturi",
        "polinsaturi" : "Polinsaturi",
        "proteine" : "Proteine",
        "sodio" : "Sodio",
        "polioli" : "Polioli",
        "vitamine" : "Vitamine",
        "valore_energetico_kcal" : "Valore Energetico (kcal)",
        "valore_energetico_kj" : "Valore Energetico (kj)"
    };

    this.taxLabelsEN = {
        "non_presenti" : "Not defined",
        "senza_senape" : this.taxEN['senape'] + " FREE",
        "senza_glutine" : this.taxEN['glutine'] + " FREE",
        "senza_lattosio" : this.taxEN['lattosio'] + " FREE",
        "senza_latte_vaccino" : this.taxEN['latte_vaccino'] + " FREE",
        "senza_uova" : this.taxEN['uova'] + " FREE",
        "senza_arachidi" : this.taxEN['arachidi'] + " FREE",
        "senza_frutta_guscio" : this.taxEN['frutta_guscio'] + " FREE",
        "senza_soia" : this.taxEN['soia'] + " FREE",
        "senza_sesamo" : this.taxEN['sesamo'] + " FREE",
        "senza_pesce" : this.taxEN['pesce'] + " FREE",
        "senza_crostacei" : this.taxEN['crostacei'] + " FREE",
        "senza_molluschi" : this.taxEN['molluschi'] + " FREE",
        "senza_anidride_solfiti" : this.taxEN['anidride_solfiti'] + " FREE",
        "senza_sedano" : this.taxEN['sedano'] + " FREE",
        "senza_lupini" : this.taxEN['lupini'] + " FREE",
        "vegetariana": "Vegatarian ",
        "vegana": "Vegan ",
        "formaggi_latticini" : "Cheeses and dairy products",
        "frutta_secca_legumi" : "Dried fruit and legumes",
        "miele" : "Honey",
        "pasta_riso" : "Pasta and rice",
        "prodotti_forno" : "Bakery products",
        "semola_farina" : "Semolina and flour",
        "dolci" : "Sweets",
        "sottolio" : "Vegetables in oil",
        "conserve_confetture" : "Preserves and jams",
        "sale_spezie" : "Salt and spices",
        "olio_olive" : "Oil and olives",
        "prodotti_ittici" : "Fish products",
        "vini" : "Wines",
        "birre" : "Beers",
        "distillati_liquori" : "Spirits and liqueurs",
        "salumi" : "Cold cuts",
        "altro" : "Other",
        "amido" : "Amido(EN)",
        "carboidrati" : "Carbohydrates(EN)",
        "carboidrati_di_cui_saturi" : "Carbohydrates (of which sugars)",
        "fibre" : "Fibre(EN)",
        "grassi" : "Fat",
        "grassi_di_cui_saturi" : "Fat (of which saturates)",
        "minerali" : "Minerali(EN)",
        "monoinsaturi" : "Monoinsaturi(EN)",
        "polinsaturi" : "Polinsaturi(EN)",
        "proteine" : "Protein",
        "sodio" : "Salt",
        "polioli" : "Polioli(EN)",
        "vitamine" : "Vitamin",
        "valore_energetico_kcal" : "Energy kcal",
        "valore_energetico_kj" : "Energy kJ"};

    this.getLabels = function (lang){
        if (lang=="en")
            return this.labelsEN;
        else
            return this.labelsIT;
    }

    this.getTaxLabels = function (lang){
        if (lang=="en")
            return this.taxLabelsEN;
        else
            return this.taxLabelsIT;
    }

    this.translateAllergene = function (termIT){
        for(var key in this.taxIT) {
            if(this.taxIT[key] === termIT) {
                return this.taxEN[key];
            }
        }
        return "Allergen";
    }

    this.translateTax = function (termIT){
        for(var key in this.taxLabelsIT) {
            if(this.taxLabelsIT[key] === termIT) {
                return this.taxLabelsEN[key];
            }
        }
        return "ND";
    }
});

conf.service ("personalizzaService", function (labelService){

    this.labels = labelService.getLabels(getLanguage());
    this.labelsTax = labelService.getTaxLabels(getLanguage());

    this.list_abitudine = [
        {value: this.labelsTax['vegetariana'], appCode: '0', siteCode: '15'},
        {value: this.labelsTax['vegana'], appCode: '1', siteCode: '16'}
    ];

    this.list_allergie = [
        {value: this.labelsTax['senza_glutine'], appCode: '2', siteCode: '12'},
        {value: this.labelsTax['senza_lattosio'], appCode: '3', siteCode: '13'},
        {value: this.labelsTax['senza_latte_vaccino'], appCode: '4', siteCode: '1'},
        {value: this.labelsTax['senza_uova'], appCode: '5', siteCode: '9'},
        {value: this.labelsTax['senza_arachidi'], appCode: '6', siteCode: '11'},
        {value: this.labelsTax['senza_frutta_guscio'], appCode: '7', siteCode: '4'},
        {value: this.labelsTax['senza_soia'], appCode: '8', siteCode: '3'},
        {value: this.labelsTax['senza_sesamo'], appCode: '9', siteCode: '10'},
        {value: this.labelsTax['senza_pesce'], appCode: '10', siteCode: '14'},
        {value: this.labelsTax['senza_crostacei'], appCode: '11', siteCode: '8'},
        {value: this.labelsTax['senza_molluschi'], appCode: '12', siteCode: '5'},
        {value: this.labelsTax['senza_sedano'], appCode: '13', siteCode: '6'},
        {value: this.labelsTax['senza_senape'], appCode: '14', siteCode:'7'},
        {value: this.labelsTax['senza_anidride_solfiti'], appCode: '15', siteCode: '15'},
        {value: this.labelsTax['senza_lupini'], appCode: '16', siteCode: '2'}
    ];

    this.list_tipo = [
        {value: this.labelsTax['formaggi_latticini'], appCode: '17', siteCode: '1'},
        {value: this.labelsTax['frutta_secca_legumi'], appCode: '18', siteCode: '688'},
        {value: this.labelsTax['miele'], appCode: '19', siteCode: '687'},
        {value: this.labelsTax['pasta_riso'], appCode: '20', siteCode: '467'},
        {value: this.labelsTax['prodotti_forno'], appCode: '21', siteCode: '464'},
        {value: this.labelsTax['semola_farina'], appCode: '22', siteCode: '686'},
        {value: this.labelsTax['dolci'], appCode: '23', siteCode: '3'},
        {value: this.labelsTax['sottolio'], appCode: '24', siteCode: '681'},
        {value: this.labelsTax['conserve_confetture'], appCode: '25', siteCode: '670'},
        {value: this.labelsTax['sale_spezie'], appCode: '26', siteCode: '682'},
        {value: this.labelsTax['olio_olive'], appCode: '27', siteCode: '465'},
        {value: this.labelsTax['prodotti_ittici'], appCode: '28', siteCode: '685'},
        {value: this.labelsTax['vini'], appCode: '29', siteCode: '466'},
        {value: this.labelsTax['birre'], appCode: '30', siteCode: '462'},
        {value: this.labelsTax['distillati_liquori'], appCode: '31', siteCode: '7'},
        {value: this.labelsTax['salumi'], appCode: '32', siteCode: '684'},
        //{value: $scope.labelsTax['prodotti_tipici'], appCode: '18', siteCode: '463'},
        {value: this.labelsTax['altro'], appCode: '33', siteCode: '689'}
    ];

    this.getListAbitudine = function (){
        return this.list_abitudine;
    }

    this.getListAllergie = function (){
        return this.list_allergie;
    }

    this.getListTipo = function (){
        return this.list_tipo;
    }

    this.getTipoByName = function (term){
        var siteCodeCat = [];
        for(var key in this.list_tipo) {
            cat = this.list_tipo[key];
            if(cat.value.toLowerCase().search(term.toLowerCase()) >= 0) {
                siteCodeCat.push(cat.siteCode);
            }
        }
        return siteCodeCat;
    }
});
