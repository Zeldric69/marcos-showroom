export const vehicleShowroomDatabase = {
    // ================================================================
    // PORSCHE — VERIFIED July 2026 against Porsche Newsroom / Porsche USA /
    // Edmunds / Car and Driver / Road & Track / U.S. News. The 911, Taycan,
    // Panamera and Cayenne lineups all received major MY2026 power/price
    // updates not reflected in the original draft — see per-car notes below.
    // ================================================================
    // VERIFY-NOTE: 992.2 refresh replaced the previous non-hybrid Turbo S; hp/torque/price confirmed via Porsche Newsroom press kit (newsroom.porsche.com) and Porsche USA.
    "porsche-911-turbo-s": {
        class: "porsche",
        name: "Porsche 911 Turbo S",
        price: "$272,650",
        desc: "The definitive benchmark for daily supercar performance, now hybridized with a twin-eTurbo flat-six and a PDK-integrated electric motor for the most powerful production 911 ever built.",
        features: [
            "701 Horsepower / 590 lb-ft of Torque Profile",
            "8-Speed PDK (T-Hybrid) Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "PASM Sport Adaptive Suspension System",
            "Twin Electric Turbochargers with 400V T-Hybrid System"
        ],
        colors: [
            { name: "Carrara White", hex: "#FFFFFF", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_992_Turbo_S_1X7A0411.jpg" },
            { name: "Jet Black", hex: "#000000", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_992_Turbo_S_1X7A0411.jpg" }
        ]
    },

    // VERIFY-NOTE: torque corrected from 346 to 331 lb-ft; confirmed via Porsche USA official model page.
    "porsche-911-gt3": {
        class: "porsche",
        name: "Porsche 911 GT3",
        price: "$230,500",
        desc: "A naturally aspirated, 9,000-rpm homologation special built with direct lineage from Porsche's GT racing program.",
        features: [
            "502 Horsepower / 331 lb-ft of Torque Profile",
            "7-Speed PDK / 6-Speed Manual Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Motorsport Double-Wishbone Front Suspension System",
            "Swan-Neck Active Rear Wing with Track Aero Package"
        ],
        colors: [
            { name: "GT Silver Metallic", hex: "#C0C0C0", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_992_GT3_1X7A0323.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified.
    "porsche-911-gt3-rs": {
        class: "porsche",
        name: "Porsche 911 GT3 RS",
        price: "$241,300",
        desc: "The most track-focused road-legal 911 ever built, engineered around downforce first and everything else second.",
        features: [
            "518 Horsepower / 342 lb-ft of Torque Profile",
            "7-Speed PDK Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Motorsport Double-Wishbone Adjustable Suspension System",
            "DRS Active Aerodynamics with Central Radiator Layout"
        ],
        colors: [
            { name: "Shark Blue", hex: "#0F52BA", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_911_GT3_RS_%282022%29_1X7A7164.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — MY2026 Carrera S jumped from 379 to 473 hp (confirmed via Champion Porsche / Cars.com); price corrected to $156,200.
    "porsche-911-carrera-s": {
        class: "porsche",
        name: "Porsche 911 Carrera S",
        price: "$156,200",
        desc: "The archetypal sports coupe, now hitting harder than ever after a MY2026 power bump that puts it where the previous GTS used to sit.",
        features: [
            "473 Horsepower / 390 lb-ft of Torque Profile",
            "8-Speed PDK Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "PASM Sport Adaptive Suspension System",
            "Sport Chrono Package with Launch Control"
        ],
        colors: [
            { name: "Guards Red", hex: "#C41E3A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_992_Carrera_S_coupe_IMG_5838.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — same 473 hp/390 lb-ft update as Carrera S, confirmed via Road & Track.
    "porsche-911-carrera-4s": {
        class: "porsche",
        name: "Porsche 911 Carrera 4S",
        price: "$156,450",
        desc: "All-weather 911 confidence, returning to the lineup for 2026 with the same twin-turbo punch as the rear-drive S.",
        features: [
            "473 Horsepower / 390 lb-ft of Torque Profile",
            "8-Speed PDK Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "PASM Sport Adaptive Suspension System",
            "PTV Plus Torque Vectoring System"
        ],
        colors: [
            { name: "Gentian Blue Metallic", hex: "#1E3A8A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_992_Carrera_4S_%2851943917084%29.jpg" }
        ]
    },

    // VERIFY-NOTE: this is the AWD Targa body style of the new T-Hybrid GTS; 532 hp / 420 lb-ft confirmed via RoadEthos and Porsche dealer press pages; price is a 2025 pre-refresh figure, worth reconfirming.
    "porsche-911-targa-4-gts": {
        class: "porsche",
        name: "Porsche 911 Targa 4 GTS",
        price: "$186,000",
        desc: "A modern take on the classic roll-hoop Targa silhouette, now carrying the same electrically assisted turbocharger introduced on the Carrera GTS for a genuine jump in punch.",
        features: [
            "532 Horsepower / 420 lb-ft of Torque Profile",
            "8-Speed PDK (T-Hybrid) Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "PASM Sport Adaptive Suspension System",
            "Retractable Targa Roof with Electric Turbocharger T-Hybrid System"
        ],
        colors: [
            { name: "Python Green", hex: "#2E7D32", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2024_Porsche_911_992_Targa_4_GTS.jpg" }
        ]
    },

    // VERIFY-NOTE: replaces the previous non-S "911 Turbo" trim, which Edmunds confirms is discontinued for MY2026 ("There is no standard Turbo model for 2026"). Swapped in the Carrera GTS T-Hybrid, a real current trim, in its place.
    "porsche-911-carrera-gts": {
        class: "porsche",
        name: "Porsche 911 Carrera GTS",
        price: "$172,050",
        desc: "The 911's first-ever hybrid trim, using an electrically assisted turbocharger to eliminate lag while adding power over the outgoing naturally-breathing GTS.",
        features: [
            "532 Horsepower / 420 lb-ft of Torque Profile",
            "8-Speed PDK (T-Hybrid) Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "PASM Sport Adaptive Suspension System",
            "Single Electric Turbocharger with 400V T-Hybrid System"
        ],
        colors: [
            { name: "Racing Yellow", hex: "#F5C400", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_911_%28992%29_Carrera_GTS.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the Dakar was discontinued after its 2023-24 production run per U.S. News. These are its last-confirmed specs; no official successor was found in the sources checked, so treat this listing as "last known," not "currently on sale."
    "porsche-911-dakar": {
        class: "porsche",
        name: "Porsche 911 Dakar",
        price: "$222,000",
        desc: "A rally-raid-ready 911 with raised ride height and knobby tires for terrain no 911 has touched before.",
        features: [
            "473 Horsepower / 420 lb-ft of Torque Profile",
            "8-Speed PDK Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Raised Off-Road Tuned Suspension Suspension System",
            "Rally-Inspired Livery with Reinforced Underbody"
        ],
        colors: [
            { name: "Rallye Yellow", hex: "#FFD500", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Porsche_911_Dakar_2.jpg" }
        ]
    },

    // VERIFY-NOTE: torque corrected from 317 to 309 lb-ft per renndriver.com's citation of Porsche's official GT4 announcement; Porsche also confirms this is one of the last combustion-engine 718s before an EV successor.
    "porsche-718-cayman-gt4": {
        class: "porsche",
        name: "Porsche 718 Cayman GT4",
        price: "$102,900",
        desc: "A naturally aspirated mid-engine purist's car built for lap times, not lifestyle.",
        features: [
            "414 Horsepower / 309 lb-ft of Torque Profile",
            "6-Speed Manual / 7-Speed PDK Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Motorsport-Tuned Coil-Over Suspension System",
            "Fixed Rear Wing with Track Aero Package"
        ],
        colors: [
            { name: "Racing Yellow", hex: "#F5C400", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Porsche_718_Cayman_GT4_2.jpg" }
        ]
    },

    // VERIFY-NOTE: price corrected from $161,100 to $162,150 per Car and Driver's report on the official reveal.
    "porsche-718-spyder-rs": {
        class: "porsche",
        name: "Porsche 718 Spyder RS",
        price: "$162,150",
        desc: "An open-top Spyder fitted with a genuine GT3 engine for a raw, high-revving soundtrack.",
        features: [
            "493 Horsepower / 331 lb-ft of Torque Profile",
            "7-Speed PDK Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Motorsport-Tuned Coil-Over Suspension System",
            "GT3-Derived Naturally Aspirated Engine"
        ],
        colors: [
            { name: "Arctic Grey", hex: "#A9A9A9", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2024_Porsche_718_Spyder_RS.jpg" }
        ]
    },

    // VERIFY-NOTE: torque corrected from 309 to 317 lb-ft and price confirmed at $99,700 per Porsche Orland Park's official spec sheet.
    "porsche-718-cayman-gts-40": {
        class: "porsche",
        name: "Porsche 718 Cayman GTS 4.0",
        price: "$99,700",
        desc: "The enthusiast's sweet spot in the 718 range, with a naturally aspirated flat-six ahead of the rear axle.",
        features: [
            "394 Horsepower / 317 lb-ft of Torque Profile",
            "6-Speed Manual / 7-Speed PDK Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "PASM Sport Adaptive Suspension System",
            "Sport Exhaust with Mechanical Limited-Slip Differential"
        ],
        colors: [
            { name: "Miami Blue", hex: "#00A6C0", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_718_Cayman_GTS_1X7A7165.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — hp jumped from 750 to 938 (overboost) and price from $195,000 to $209,900 in the latest Taycan generation. Torque figure could NOT be confirmed against an official source in this pass — flagged as unconfirmed, please verify before publishing.
    "porsche-taycan-turbo-s": {
        class: "porsche",
        name: "Porsche Taycan Turbo S",
        price: "$209,900",
        desc: "Porsche's electric flagship, delivering repeatable launch-control acceleration lap after lap.",
        features: [
            "938 Horsepower / UNVERIFIED lb-ft of Torque Profile",
            "2-Speed Rear Transmission Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "3-Chamber Adaptive Air Suspension Suspension System",
            "800V High-Performance Charging Architecture"
        ],
        colors: [
            { name: "Frozen Blue Metallic", hex: "#2C3E75", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2020_Porsche_Taycan_Turbo_S.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — hp jumped from 590 to 690 (overboost) and price from $138,400 to $157,000; confirmed via U.S. News and stuttcars.com citing Porsche figures.
    "porsche-taycan-gts": {
        class: "porsche",
        name: "Porsche Taycan GTS",
        price: "$157,000",
        desc: "The performance-leaning middle child of the Taycan lineup, tuned for driver engagement.",
        features: [
            "690 Horsepower / 582 lb-ft of Torque Profile",
            "2-Speed Rear Transmission Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "3-Chamber Adaptive Air Suspension Suspension System",
            "800V High-Performance Charging Architecture"
        ],
        colors: [
            { name: "Carmine Red", hex: "#960018", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_Taycan_GTS_2023.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — hp jumped from 469 to 536 (590 with optional Performance Battery Plus) and price from $114,600 to $119,400; confirmed via TrueCar and U.S. News.
    "porsche-taycan-4s": {
        class: "porsche",
        name: "Porsche Taycan 4S",
        price: "$119,400",
        desc: "An accessible entry point into Porsche's electric performance sedan.",
        features: [
            "536 Horsepower / 479 lb-ft of Torque Profile",
            "2-Speed Rear Transmission Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "PASM Adaptive Damping Suspension System",
            "800V High-Performance Charging Architecture"
        ],
        colors: [
            { name: "Ice Grey Metallic", hex: "#C9CDD3", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_Taycan_4S_IMG_3526.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — hp jumped from 690 to 771 lb-ft/torque from 685 to 737, and price from $185,600 to $228,495, after a running update; confirmed via Car and Driver and Porsche North Houston.
    "porsche-panamera-turbo-s": {
        class: "porsche",
        name: "Porsche Panamera Turbo S E-Hybrid",
        price: "$228,495",
        desc: "A four-door grand tourer that hides supercar acceleration behind executive comfort.",
        features: [
            "771 Horsepower / 737 lb-ft of Torque Profile",
            "8-Speed PDK Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "3-Chamber Adaptive Air Suspension Suspension System",
            "Plug-In Hybrid Twin-Turbo V8 Powertrain"
        ],
        colors: [
            { name: "Jet Black Metallic", hex: "#0B0B0B", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2013_Porsche_Panamera_Turbo_S_%288404035404%29.jpg" }
        ]
    },

    // VERIFY-NOTE: torque corrected from 457 to 486 lb-ft and price corrected from $131,900 to $156,195, confirmed via Car and Driver.
    "porsche-panamera-gts": {
        class: "porsche",
        name: "Porsche Panamera GTS",
        price: "$156,195",
        desc: "The driver-focused Panamera, favoring throttle response over outright hybrid torque.",
        features: [
            "493 Horsepower / 486 lb-ft of Torque Profile",
            "8-Speed PDK Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "PASM Sport Adaptive Suspension System",
            "Naturally Aspirated V8 with Sport Exhaust"
        ],
        colors: [
            { name: "Carrara White Metallic", hex: "#F5F5F0", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_Panamera_GTS_%2819106049272%29.jpg" }
        ]
    },

    // VERIFY-NOTE: hp corrected from 631 to 650 (running change) and price corrected from $182,150 to $214,800, confirmed via renndriver.com citing Porsche's official US configurator.
    "porsche-cayenne-turbo-gt": {
        class: "porsche",
        name: "Porsche Cayenne Turbo GT",
        price: "$214,800",
        desc: "The fastest SUV to ever lap the Nurburgring at the time of its debut, built for track days in a family footprint.",
        features: [
            "650 Horsepower / 626 lb-ft of Torque Profile",
            "8-Speed Tiptronic S Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "PASM Sport Adaptive Suspension System",
            "Fixed Rear Wing with Track-Tuned Chassis"
        ],
        colors: [
            { name: "Acid Green", hex: "#9FE400", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_Cayenne_Turbo_GT.jpg" }
        ]
    },

    // VERIFY-NOTE: MAJOR STRUCTURAL CHANGE — Porsche has discontinued the gas V6 Macan GTS entirely; the Macan GTS is now an electric-only model (563 hp / 704 lb-ft, dual motor). Confirmed via InsideEVs' report on the official reveal. Transmission/drivetrain/special fields updated accordingly.
    "porsche-macan-gts": {
        class: "porsche",
        name: "Porsche Macan GTS",
        price: "$103,000",
        desc: "A compact SUV with genuine sports-car reflexes, now reborn as a dual-motor EV rather than the previous gas-engine GTS.",
        features: [
            "563 Horsepower / 704 lb-ft of Torque Profile",
            "1-Speed Direct Drive (Dual Motor) Transmission",
            "Electric All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Dual-Motor Electric Powertrain with Overboost Function"
        ],
        colors: [
            { name: "Volcano Grey Metallic", hex: "#4A4A4A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_Macan_Turbo_%2855027447703%29.jpg" }
        ]
    },

    // ================================================================
    // AUDI — VERIFIED July 2026 against Audi USA / Audi Newsroom / Edmunds /
    // Car and Driver / Autoblog / KBB / Motor1. Several nameplates are
    // discontinued or were never US-market cars — flagged per car below.
    // ================================================================
    // VERIFY-NOTE: major correction — the e-tron GT lineup was overhauled for 2025-26. The old single "RS e-tron GT" (637 hp) is now "RS e-tron GT performance" at 912 hp. Torque figure could not be confirmed against an official US source — flagged unconfirmed.
    "audi-rs-etron-gt": {
        class: "audi",
        name: "Audi RS e-tron GT performance",
        price: "$180,390",
        desc: "A pure electric grand tourer combining visceral dual-motor propulsion with zero-emissions aerodynamics — now Audi's quickest-accelerating production model ever.",
        features: [
            "912 Horsepower / UNVERIFIED lb-ft of Torque Profile",
            "1-Speed Direct Drive (2-Speed Rear) Transmission",
            "Electric quattro All-Wheel Drive Drivetrain System",
            "Adaptive 3-Chamber Air Suspension Suspension System",
            "800V Fast-Charging Architecture with Launch Control"
        ],
        colors: [
            { name: "Daytona Gray", hex: "#D7D7D7", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_RS_e-tron_GT_IMG_4310.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — hp/torque updated from 591/590 to 621/627 following a running change; confirmed via Audi USA. Price is an approximation; exact current MSRP wasn't pinned down precisely.
    "audi-rs6-avant": {
        class: "audi",
        name: "Audi RS6 Avant performance",
        price: "$132,200",
        desc: "The definitive sport wagon, hauling both cargo and a twin-turbo V8 with equal seriousness.",
        features: [
            "621 Horsepower / 627 lb-ft of Torque Profile",
            "8-Speed Tiptronic Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Dynamic Ride Control with Active Roll Stabilization"
        ],
        colors: [
            { name: "Nardo Gray", hex: "#A6A6A0", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_RS6_Avant_C8_1X7A0305.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — same 591→621 hp update as the RS6, confirmed via Autoblog; Audi now sells this exclusively as the "performance" trim. Price is an approximation.
    "audi-rs7-sportback": {
        class: "audi",
        name: "Audi RS7 Sportback performance",
        price: "$132,200",
        desc: "A fastback take on the RS6's twin-turbo V8 platform, trading wagon space for style.",
        features: [
            "621 Horsepower / 627 lb-ft of Torque Profile",
            "8-Speed Tiptronic Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Coupe-Profile Roofline with Active Rear Spoiler"
        ],
        colors: [
            { name: "Mythos Black", hex: "#0D0D0D", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_RS7_C8_IMG_4323.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — hp/torque updated from 591/590 to 631/627 and price corrected to $137,495, confirmed via Audi USA and TrueCar.
    "audi-rsq8": {
        class: "audi",
        name: "Audi RS Q8 performance",
        price: "$137,495",
        desc: "Audi's SUV flagship, sharing its twin-turbo V8 heart with the RS6 and RS7 — now the most powerful combustion engine ever fitted to an RS model.",
        features: [
            "631 Horsepower / 627 lb-ft of Torque Profile",
            "8-Speed Tiptronic Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension with Active Roll Stabilization Suspension System",
            "Carbon Ceramic Braking System"
        ],
        colors: [
            { name: "Glacier White Metallic", hex: "#EDEDED", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_RSQ8_IMG_4308.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the R8 was discontinued in March 2024; the last car left the line at Audi's Böllinger Höfe plant. No direct successor exists. These are last-confirmed specs; treat as "last known," not currently orderable new.
    "audi-r8-v10-performance": {
        class: "audi",
        name: "Audi R8 V10 Performance",
        price: "$158,600",
        desc: "Audi's mid-engine flagship, sharing its naturally aspirated V10 architecture with the Lamborghini Huracan.",
        features: [
            "602 Horsepower / 413 lb-ft of Torque Profile",
            "7-Speed S Tronic Dual-Clutch Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Magnetic Ride Adaptive Damping Suspension System",
            "Naturally Aspirated V10 with Dynamic Steering"
        ],
        colors: [
            { name: "Kyalami Green", hex: "#0B6E4F", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Audi_R8_Coupe_V10_Performance_RWD_at_Audi_Manchester_02.jpg" }
        ]
    },

    // VERIFY-NOTE: MAJOR CHANGE — the RS5 is all-new for 2026 as Audi Sport's first plug-in hybrid, jumping from 444 to 630 hp. Confirmed via Motor1/Top Gear on the official European reveal; US pricing and on-sale date had not been released as of the sources checked, so price below is a placeholder, not a confirmed figure.
    "audi-rs5-coupe": {
        class: "audi",
        name: "Audi RS5 Coupe",
        price: "$94,900 (est., unconfirmed)",
        desc: "A twin-turbo hybrid coupe that balances daily comfort with genuine back-road bite, now with a first-ever electric assist boosting output well past the outgoing car.",
        features: [
            "630 Horsepower / 608 lb-ft of Torque Profile",
            "8-Speed Tiptronic (PHEV) Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Plug-In Hybrid Twin-Turbo V6 with Electric Torque Vectoring Rear Axle"
        ],
        colors: [
            { name: "Sonoma Green Metallic", hex: "#1F4C3A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_RS5_Coupe_IMG_0912.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — hp corrected from 401 to 394 and price corrected from $61,900 to $67,395, confirmed via Audi USA and KBB.
    "audi-rs3-sedan": {
        class: "audi",
        name: "Audi RS3 Sedan",
        price: "$67,395",
        desc: "A compact sedan powered by Audi's signature turbocharged five-cylinder engine.",
        features: [
            "394 Horsepower / 354 lb-ft of Torque Profile",
            "7-Speed S Tronic Dual-Clutch Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "RS Torque Splitter Rear-Axle Vectoring"
        ],
        colors: [
            { name: "Kyalami Green", hex: "#0B6E4F", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_RS3_8Y_Sedan_IMG_6030.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — could not confirm current US availability; as of the last direct reporting found, the RS Q3 was Europe-only ("won't be coming to the U.S."). Verify before listing this as a US showroom car.
    "audi-rsq3": {
        class: "audi",
        name: "Audi RS Q3",
        price: "$58,900",
        desc: "The RS3's five-cylinder heart, repackaged into a compact performance SUV.",
        features: [
            "394 Horsepower / 369 lb-ft of Torque Profile",
            "8-Speed S Tronic Dual-Clutch Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Turbocharged Five-Cylinder Engine with Sport Exhaust"
        ],
        colors: [
            { name: "Turbo Blue", hex: "#1560BD", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_RS_Q3_Sportback_IMG_4828.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified.
    // NOTE: Audi has confirmed 2027 will be the final model year for the A8/S8 line.
    "audi-s8": {
        class: "audi",
        name: "Audi S8",
        price: "$90,000",
        desc: "A full-size luxury sedan that hides serious twin-turbo V8 performance beneath executive restraint.",
        features: [
            "563 Horsepower / 590 lb-ft of Torque Profile",
            "8-Speed Tiptronic Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension with Predictive Active Suspension Suspension System",
            "Twin-Turbo V8 with All-Wheel Steering"
        ],
        colors: [
            { name: "Firmament Blue", hex: "#274472", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_S8_%282025%29_%2854801905644%29.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the Q8 e-tron is discontinued; production ended February 2025 at Audi's Brussels plant, and only unsold dealer inventory remains. A successor is expected but not yet released. These are last-confirmed specs.
    "audi-q8-etron": {
        class: "audi",
        name: "Audi Q8 e-tron",
        price: "$74,400",
        desc: "Audi's flagship electric SUV, built for long-distance comfort as much as outright pace.",
        features: [
            "402 Horsepower / 490 lb-ft of Torque Profile",
            "1-Speed Direct Drive Transmission",
            "Electric quattro All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "95 kWh Battery with 170 kW DC Fast Charging"
        ],
        colors: [
            { name: "Glacier White Metallic", hex: "#EDEDED", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_Q8_e-tron_55_quattro_1X7A6952.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the TT was discontinued in November 2023 with no direct successor. These are last-confirmed specs; treat as "last known," not currently orderable new.
    "audi-tt-rs": {
        class: "audi",
        name: "Audi TT RS",
        price: "$76,500",
        desc: "A compact coupe carrying the same five-cylinder engine that powers Audi's rally heritage cars.",
        features: [
            "394 Horsepower / 354 lb-ft of Torque Profile",
            "7-Speed S Tronic Dual-Clutch Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Turbocharged Five-Cylinder Engine with Signature Exhaust Note"
        ],
        colors: [
            { name: "Nardo Gray", hex: "#A6A6A0", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_TT_RS_Iconic_Edition_%2853342624369%29.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — this entry replaces the old base "e-tron GT quattro" trim, which no longer exists; the current equivalent is the "S e-tron GT" at 670 hp / 546 lb-ft, confirmed via Audi USA and Edmunds.
    "audi-etron-gt-quattro": {
        class: "audi",
        name: "Audi S e-tron GT",
        price: "$136,580",
        desc: "The standard e-tron GT offers most of the RS model's drama at a more accessible price.",
        features: [
            "670 Horsepower / 546 lb-ft of Torque Profile",
            "2-Speed Rear Transmission Transmission",
            "Electric quattro All-Wheel Drive Drivetrain System",
            "Adaptive 3-Chamber Air Suspension Suspension System",
            "800V High-Performance Charging Architecture"
        ],
        colors: [
            { name: "Tactical Green", hex: "#4B5320", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_e-tron_GT_IMG_5689.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — confirmed via Motor1/The Drive/Audi Club North America that Audi has repeatedly and explicitly stated "there are no plans to bring the RS4 Avant to the U.S. market." This is a Europe-only car; it should not be presented as a US showroom offering without a clear disclaimer.
    "audi-rs4-avant": {
        class: "audi",
        name: "Audi RS4 Avant (Europe-only)",
        price: "€142,905 (Euro market)",
        desc: "A compact performance wagon built around the same twin-turbo V6 as the RS5 — sold in Europe only, never officially offered in the US.",
        features: [
            "444 Horsepower / 443 lb-ft of Torque Profile",
            "8-Speed Tiptronic Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Sport Rear Differential with Torque Vectoring"
        ],
        colors: [
            { name: "Nogaro Blue", hex: "#1B3F8B", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Audi_RS4_Avant_in_Navarra_Blue_01.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — hp/torque confirmed unchanged (500/568), but price corrected from $88,900 to roughly $99,700 per Autoblog's "starts just below $100K"; exact current MSRP is approximate.
    "audi-sq8": {
        class: "audi",
        name: "Audi SQ8",
        price: "$99,700",
        desc: "A twin-turbo performance SUV positioned just below the RS Q8.",
        features: [
            "500 Horsepower / 568 lb-ft of Torque Profile",
            "8-Speed Tiptronic Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Sport Differential with Active Roll Stabilization"
        ],
        colors: [
            { name: "Daytona Gray", hex: "#D7D7D7", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_SQ8_MLB_black_%281%29.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified.
    // NOTE: Audi has confirmed 2027 will be the final model year for the A8/S8 line.
    "audi-a8-l": {
        class: "audi",
        name: "Audi A8 L",
        price: "$87,700",
        desc: "Audi's long-wheelbase flagship sedan, built around effortless turbocharged V6 refinement.",
        features: [
            "335 Horsepower / 369 lb-ft of Torque Profile",
            "8-Speed Tiptronic Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension with Predictive Active Suspension Suspension System",
            "Extended Wheelbase with Executive Rear Seating"
        ],
        colors: [
            { name: "Manhattan Gray", hex: "#5C5C5C", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_A8_L_D5_IMG_0067.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified.
    // NOTE: an all-new third-generation Q7 is confirmed for a mid/late-2026 US arrival.
    "audi-q7": {
        class: "audi",
        name: "Audi Q7",
        price: "$59,800",
        desc: "A family-oriented SUV that shares its turbocharged V6 with several sportier Audi siblings.",
        features: [
            "335 Horsepower / 369 lb-ft of Torque Profile",
            "8-Speed Tiptronic Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Three-Row Seating with Virtual Cockpit"
        ],
        colors: [
            { name: "Glacier White Metallic", hex: "#EDEDED", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2025_Audi_Q7_%284M%29_DSC_7473.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — discontinued alongside the R8 Coupe in March 2024, same last-confirmed specs.
    "audi-r8-spyder": {
        class: "audi",
        name: "Audi R8 Spyder",
        price: "$175,300",
        desc: "The open-top counterpart to the R8 Coupe, keeping the same naturally aspirated V10.",
        features: [
            "602 Horsepower / 413 lb-ft of Torque Profile",
            "7-Speed S Tronic Dual-Clutch Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Magnetic Ride Adaptive Damping Suspension System",
            "Naturally Aspirated V10 with Retractable Soft Top"
        ],
        colors: [
            { name: "Ascari Blue Metallic", hex: "#0B3D91", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_R8_Spyder_V10_performance_quattro_%282%29.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — price corrected from $132,000 (which had been mistakenly duplicated from the RS Q8) to the actual confirmed $200,195 starting price for this limited edition, per Motor1's report on the official reveal.
    "audi-rs6-avant-gt": {
        class: "audi",
        name: "Audi RS6 Avant GT",
        price: "$200,195",
        desc: "A limited, widebody, track-focused evolution of the standard RS6 Avant — just 85 examples were allocated to the US.",
        features: [
            "621 Horsepower / 627 lb-ft of Torque Profile",
            "8-Speed Tiptronic Transmission",
            "quattro All-Wheel Drive Drivetrain System",
            "Adaptive Sport Air Suspension Suspension System",
            "Carbon Fiber Widebody with Track-Tuned Aero"
        ],
        colors: [
            { name: "Ascari Blue Metallic", hex: "#0B3D91", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Audi_RS6_Avant_GT.jpg" }
        ]
    },

    // ================================================================
    // MCLAREN — VERIFIED July 2026 against McLaren dealer press pages (e.g.
    // mclarenhouston.com, mclarenranchomirage.com), TrueCar, KBB, CarExpert,
    // Motor1, Edmunds and Wikipedia. Several cars here are discontinued or
    // were sold-out limited runs — flagged individually below.
    // ================================================================
    // VERIFY-NOTE: correction — hp updated from 671 to 690 (running update to the hybrid powertrain) and price corrected from $237,500 to $260,400, confirmed via official McLaren dealer pages and KBB.
    "mclaren-artura": {
        class: "mclaren",
        name: "McLaren Artura",
        price: "$260,400",
        desc: "A next-generation hybrid supercar built on McLaren's Carbon Lightweight Architecture for minimal weight.",
        features: [
            "690 Horsepower / 531 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Short Ratio Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Proactive Chassis Control Suspension System",
            "Dihedral Butterfly Doors with Soft-Close Assist"
        ],
        colors: [
            { name: "Volcano Yellow", hex: "#FFD700", img: "https://commons.wikimedia.org/wiki/Special:FilePath/McLaren_Artura_IMG_0527.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the 720S was discontinued in December 2022, succeeded by the 750S. No new units have been built since. These are last-confirmed specs.
    "mclaren-720s": {
        class: "mclaren",
        name: "McLaren 720S",
        price: "$299,000",
        desc: "A twin-turbo V8 supercar wrapped in one of the most aerodynamically efficient road-car bodies McLaren has produced.",
        features: [
            "710 Horsepower / 568 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Proactive Chassis Control II Suspension System",
            "Twin-Turbo V8 with Folding Dihedral Doors"
        ],
        colors: [
            { name: "Papaya Spark", hex: "#FF8200", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Maclaren_720S_PA280972-PSD.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the 765LT coupe's production has ended and the Spider was confirmed to be winding down/phased out. Treat as last-known, not currently orderable.
    "mclaren-765lt": {
        class: "mclaren",
        name: "McLaren 765LT",
        price: "$358,000",
        desc: "McLaren's Longtail formula pushed to its most extreme road-legal expression yet.",
        features: [
            "755 Horsepower / 590 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Motorsport-Tuned Track Suspension Suspension System",
            "Extensive Carbon Fiber Bodywork for Weight Reduction"
        ],
        colors: [
            { name: "Silica White", hex: "#F0F0F0", img: "https://commons.wikimedia.org/wiki/Special:FilePath/McLaren_765LT_IMG_3931.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the McLaren GT was renamed/facelifted into the McLaren GTS starting with the 2024 model year, per Wikipedia's production record. These are the last-confirmed GT (pre-rename) specs; the current equivalent car is sold as the "GTS."
    "mclaren-gt": {
        class: "mclaren",
        name: "McLaren GT",
        price: "$210,000",
        desc: "A supercar re-tuned for long-distance comfort without losing McLaren's engineering DNA.",
        features: [
            "612 Horsepower / 465 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Comfort-Tuned Suspension Suspension System",
            "Extended Luggage Bay for Grand Touring"
        ],
        colors: [
            { name: "Windsor Grey", hex: "#4C4C52", img: "https://commons.wikimedia.org/wiki/Special:FilePath/McLaren_GTS,_Frankfurt_am_Main_%28P1032583%29.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — sold out immediately on announcement; production ran 2018-2019 (500 units) and has long ended. Specs confirmed accurate via Wikipedia/McLaren's own Ultimate Series page.
    "mclaren-senna": {
        class: "mclaren",
        name: "McLaren Senna",
        price: "$1,000,000",
        desc: "A road-legal track weapon named after Ayrton Senna, engineered around downforce above all else.",
        features: [
            "789 Horsepower / 590 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Race-Derived Double Wishbone with Hydraulic Control Suspension System",
            "Extreme Active Aerodynamics for Maximum Downforce"
        ],
        colors: [
            { name: "Senna Green", hex: "#00693E", img: "https://commons.wikimedia.org/wiki/Special:FilePath/McLaren_Senna_%282021%29_%2855082448159%29.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — price corrected from $324,000 to $365,100 (Coupe base MSRP); hp/torque confirmed accurate via TrueCar and KBB.
    "mclaren-750s": {
        class: "mclaren",
        name: "McLaren 750S",
        price: "$365,100",
        desc: "The successor to the 720S, sharpened further toward driver engagement and reduced weight.",
        features: [
            "740 Horsepower / 590 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Proactive Chassis Control III Suspension System",
            "Lightweight Carbon Fiber Monocoque with Track Aero"
        ],
        colors: [
            { name: "Chicane Grey", hex: "#5A5A5A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/McLaren_750S.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — hp updated from 671 to 690 to match the Artura Coupe's running update; price corrected from $258,000 to $285,700 per KBB.
    "mclaren-artura-spider": {
        class: "mclaren",
        name: "McLaren Artura Spider",
        price: "$285,700",
        desc: "The open-top evolution of the Artura, retaining its hybrid V6 powertrain.",
        features: [
            "690 Horsepower / 531 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Short Ratio Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Proactive Chassis Control Suspension System",
            "Retractable Hardtop with Electrochromic Glass Roof"
        ],
        colors: [
            { name: "Flux Green", hex: "#3C8D40", img: "https://commons.wikimedia.org/wiki/Special:FilePath/McLaren_Artura_Spider.JPG" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — discontinued alongside the 720S Coupe in December 2022. Last-confirmed specs.
    "mclaren-720s-spider": {
        class: "mclaren",
        name: "McLaren 720S Spider",
        price: "$315,000",
        desc: "A folding-hardtop 720S that loses none of the coupe's structural rigidity.",
        features: [
            "710 Horsepower / 568 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Proactive Chassis Control II Suspension System",
            "Retractable Hardtop with Reinforced Carbon Tub"
        ],
        colors: [
            { name: "Belize Blue", hex: "#0F5C9E", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2019_McLaren_MSO_720S_Spider.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — sold-out limited run of 399 units, production completed in 2020. Specs confirmed accurate via Wikipedia.
    "mclaren-elva": {
        class: "mclaren",
        name: "McLaren Elva",
        price: "$1,690,000",
        desc: "An ultra-limited speedster stripped of roof and windscreen for a completely open driving experience.",
        features: [
            "804 Horsepower / 590 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Race-Derived Double Wishbone Suspension System",
            "Roofless, Windscreen-Less Open Cockpit Design"
        ],
        colors: [
            { name: "Elva Orange", hex: "#D65200", img: "https://commons.wikimedia.org/wiki/Special:FilePath/McLaren_Elva.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — discontinued years ago alongside the 570S platform it was based on (that platform ended production in 2021). Last-confirmed specs.
    "mclaren-600lt": {
        class: "mclaren",
        name: "McLaren 600LT",
        price: "$240,000",
        desc: "A track-focused Longtail derivative of the 570S, built for razor-sharp responses.",
        features: [
            "592 Horsepower / 457 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Motorsport-Tuned Track Suspension Suspension System",
            "Longtail Aero Package with Titanium Exhaust"
        ],
        colors: [
            { name: "Chicane Grey", hex: "#5A5A5A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/McLaren_600LT.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — sold-out limited run of 106 units, production completed in 2020. Specs confirmed accurate (1,036 hp per Wikipedia, matching this listing's 1,035) via Wikipedia.
    "mclaren-speedtail": {
        class: "mclaren",
        name: "McLaren Speedtail",
        price: "$2,250,000",
        desc: "A hybrid hyper-GT built for top speed, featuring a central driving position inspired by the F1.",
        features: [
            "1035 Horsepower / 848 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Hydraulic Active Suspension Suspension System",
            "Hybrid Powertrain with Central Driving Position"
        ],
        colors: [
            { name: "Speedtail Silver", hex: "#C7C9CB", img: "https://commons.wikimedia.org/wiki/Special:FilePath/McLaren_Speedtail_Genf_2019_1Y7A5636.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — torque corrected from 470 to 479 lb-ft per Wikipedia/official specs. FLAGGED: sold out immediately, limited to 25 units, production completed in 2023.
    "mclaren-solus-gt": {
        class: "mclaren",
        name: "McLaren Solus GT",
        price: "$3,500,000",
        desc: "A single-seat, track-only hypercar built around a screaming naturally aspirated V10.",
        features: [
            "829 Horsepower / 479 lb-ft of Torque Profile",
            "Sequential Racing Transmission Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Formula-Style Pushrod Suspension Suspension System",
            "Single-Seat Cockpit with Naturally Aspirated V10"
        ],
        colors: [
            { name: "Solus Orange", hex: "#FF5200", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_McLaren_Solus_GT.jpg" }
        ]
    },

    // ================================================================
    // BMW — VERIFIED July 2026 against BMW USA, BMWBLOG, Edmunds, Autoblog,
    // TrueCar, KBB, Car and Driver. The M8 lineup was fully discontinued in
    // 2025, and the M5 is now a plug-in hybrid — both major changes from the
    // original draft. A few lower-volume trims were NOT independently
    // reverified this pass and are flagged as such below.
    // ================================================================
    // VERIFY-NOTE: MAJOR CHANGE — the M5 is now a plug-in hybrid, jumping from 617 hp/553 lb-ft to 717 hp/738 lb-ft. Price corrected from $111,900 to $121,900. Confirmed via BMWBLOG, Autoblog, and Edmunds.
    "bmw-m5-competition": {
        class: "bmw",
        name: "BMW M5",
        price: "$121,900",
        desc: "An executive sedan built around a hybrid twin-turbo V8 with genuine track-day intent — now BMW's first M5 powered exclusively by a plug-in hybrid drivetrain.",
        features: [
            "717 Horsepower / 738 lb-ft of Torque Profile",
            "8-Speed M Steptronic (Plug-In Hybrid) Transmission",
            "M xDrive Selectable AWD Drivetrain System",
            "Adaptive M Suspension Suspension System",
            "Plug-In Hybrid V8 with up to 29 Miles of Electric Range"
        ],
        colors: [
            { name: "Alpine White", hex: "#FFFFFF", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_M5_%28G90%29_DSC_6010.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the entire M8 lineup (Coupe, Convertible, Gran Coupe) was discontinued by BMW in 2025, with the Coupe ending first and the rest following; no successor is planned. Price corrected to the final confirmed MSRP of $140,975. Treat as last-known, not currently orderable.
    "bmw-m8-competition": {
        class: "bmw",
        name: "BMW M8 Competition",
        price: "$140,975",
        desc: "BMW's grand touring coupe flagship, pairing luxury with genuine supercar-adjacent pace.",
        features: [
            "617 Horsepower / 553 lb-ft of Torque Profile",
            "8-Speed M Steptronic Transmission",
            "M xDrive Selectable AWD Drivetrain System",
            "Adaptive M Suspension Suspension System",
            "Carbon Fiber Roof with M Sport Differential"
        ],
        colors: [
            { name: "Marina Bay Blue", hex: "#1B3A5C", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_M8_Competition_IMG_5708.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (hp/torque confirmed via Edmunds/TrueCar). Price corrected from $76,900 to $83,775 per a leaked BMW internal pricing memo reported by Car and Driver.
    "bmw-m3-competition": {
        class: "bmw",
        name: "BMW M3 Competition",
        price: "$83,775",
        desc: "The latest generation of BMW's benchmark sport sedan, now with more power than ever.",
        features: [
            "503 Horsepower / 479 lb-ft of Torque Profile",
            "8-Speed M Steptronic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive M Suspension Suspension System",
            "M Sport Differential with Carbon Fiber Trim"
        ],
        colors: [
            { name: "Isle of Man Green", hex: "#1E5631", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_M3_Competition_%28G80%29_1X7A0170.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (hp/torque confirmed via TrueCar). Price corrected upward from $79,200; exact current MSRP is approximate given trim/xDrive variations.
    "bmw-m4-competition": {
        class: "bmw",
        name: "BMW M4 Competition",
        price: "$89,575",
        desc: "The coupe counterpart to the M3, sharing its twin-turbo inline-six and razor-sharp chassis.",
        features: [
            "503 Horsepower / 479 lb-ft of Torque Profile",
            "8-Speed M Steptronic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive M Suspension Suspension System",
            "M Sport Differential with Carbon Fiber Trim"
        ],
        colors: [
            { name: "Sao Paulo Yellow", hex: "#F4C300", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_M4_Competition_%28G82%29_Washington_DC_Metro_Area,_USA_%281%29.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (hp/torque unchanged, confirmed via BMWBLOG). Price corrected from $121,300 to $134,600 per BMW dealer pages.
    "bmw-x5m-competition": {
        class: "bmw",
        name: "BMW X5 M Competition",
        price: "$134,600",
        desc: "A twin-turbo V8 SUV capable of embarrassing sports cars on a back road.",
        features: [
            "617 Horsepower / 553 lb-ft of Torque Profile",
            "8-Speed M Steptronic Transmission",
            "M xDrive Selectable AWD Drivetrain System",
            "Adaptive M Air Suspension Suspension System",
            "Carbon Ceramic Braking System"
        ],
        colors: [
            { name: "Donington Grey", hex: "#3D3D3D", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_X5_M_%28G05%29_1X7A7047.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (hp/torque unchanged, confirmed via BMWBLOG). Price corrected from $124,900 to $134,600 per BMW dealer pages.
    "bmw-x6m-competition": {
        class: "bmw",
        name: "BMW X6 M Competition",
        price: "$134,600",
        desc: "The X5 M's sloped-roof sibling, trading cargo space for a coupe-SUV silhouette.",
        features: [
            "617 Horsepower / 553 lb-ft of Torque Profile",
            "8-Speed M Steptronic Transmission",
            "M xDrive Selectable AWD Drivetrain System",
            "Adaptive M Air Suspension Suspension System",
            "Coupe-Profile Roofline with Carbon Ceramic Brakes"
        ],
        colors: [
            { name: "Donington Grey", hex: "#3D3D3D", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_X6_M_Competition_%28G06%29_IMG_3572.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — hp corrected from 453 to 473 (confirmed via Edmunds/TrueCar); price kept close to original as it remains broadly accurate. Note: a more powerful M2 CS trim (523 hp, ~$99K) is also now available above this base car.
    "bmw-m2": {
        class: "bmw",
        name: "BMW M2",
        price: "$63,200",
        desc: "The compact, entry point into BMW's M lineup, built for pure driver engagement.",
        features: [
            "473 Horsepower / 406 lb-ft of Torque Profile",
            "6-Speed Manual / 8-Speed M Steptronic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive M Suspension Suspension System",
            "M Sport Differential with Track Mode"
        ],
        colors: [
            { name: "Zandvoort Blue", hex: "#1B4F8A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_G87_M2_1X7A1838.jpg" }
        ]
    },

    // VERIFY-NOTE: MAJOR CHANGE — the i4 M50 has been renamed M60, with output rising from 536 hp to 510 hp base / up to 593 hp in Sport mode. Price corrected from $67,300 to $71,875. Confirmed via BMWBLOG and KBB.
    "bmw-i4-m50": {
        class: "bmw",
        name: "BMW i4 M60",
        price: "$71,875",
        desc: "BMW's first electric M car, using dual motors to deliver instant, repeatable acceleration — renamed from M50 to M60 alongside a power increase.",
        features: [
            "593 Horsepower / 586 lb-ft of Torque Profile",
            "1-Speed Direct Drive Transmission",
            "M xDrive Electric AWD Drivetrain System",
            "Adaptive M Suspension Suspension System",
            "Dual-Motor Electric Powertrain with 400V Architecture"
        ],
        colors: [
            { name: "Frozen Portimao Blue", hex: "#25446B", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_i4_M50_IMG_6685.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify hp/torque/price before publishing.
    "bmw-ix-m60": {
        class: "bmw",
        name: "BMW iX M60",
        price: "$109,900",
        desc: "BMW's electric flagship SUV, tuned by M division for performance rather than just range.",
        features: [
            "610 Horsepower / 811 lb-ft of Torque Profile",
            "1-Speed Direct Drive Transmission",
            "M xDrive Electric AWD Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Dual-Motor Electric Powertrain with 100+ kWh Battery"
        ],
        colors: [
            { name: "Storm Bay", hex: "#2C3539", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2022-05_BMW_IX-M60.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — sources conflict here. Base XM (Label) is confirmed at 644 hp, but a higher "XM Label Red" trim exists at up to 738 hp; which one this price/spec combination represents wasn't cleanly resolved this pass. Verify trim naming before publishing.
    "bmw-xm": {
        class: "bmw",
        name: "BMW XM",
        price: "$159,000",
        desc: "BMW M's first standalone model, combining a hybrid V8 with striking, unapologetic design.",
        features: [
            "644 Horsepower / 590 lb-ft of Torque Profile",
            "8-Speed M Steptronic Transmission",
            "M xDrive Selectable AWD Drivetrain System",
            "Adaptive M Air Suspension Suspension System",
            "Plug-In Hybrid V8 Powertrain with Illuminated Kidney Grille"
        ],
        colors: [
            { name: "Dravit Grey", hex: "#5C5F61", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_BMW_XM.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the M4 CSL was a limited production run that has already sold out; BMW has since introduced a new "M4 CS" at 543 hp/479 lb-ft as its replacement in the lineup. Treat this CSL listing as a completed limited edition, not a currently orderable trim.
    "bmw-m4-csl": {
        class: "bmw",
        name: "BMW M4 CSL",
        price: "$139,900",
        desc: "A stripped, lightened, track-honed M4 built in extremely limited numbers.",
        features: [
            "543 Horsepower / 479 lb-ft of Torque Profile",
            "8-Speed M Steptronic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Motorsport-Tuned Suspension Suspension System",
            "Extensive Weight-Reduction Package with Two-Seat Cabin"
        ],
        colors: [
            { name: "Alpine White", hex: "#FFFFFF", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2022_BMW_M4_CSL.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify hp/torque/price before publishing.
    "bmw-m3-touring": {
        class: "bmw",
        name: "BMW M3 Touring",
        price: "$84,100",
        desc: "The first-ever M3 wagon, combining family-hauler space with genuine M performance.",
        features: [
            "503 Horsepower / 479 lb-ft of Torque Profile",
            "8-Speed M Steptronic Transmission",
            "M xDrive Selectable AWD Drivetrain System",
            "Adaptive M Suspension Suspension System",
            "M Sport Differential with Wagon Practicality"
        ],
        colors: [
            { name: "Isle of Man Green", hex: "#1E5631", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_M3_Touring.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify hp/torque/price before publishing.
    "bmw-840i-gran-coupe": {
        class: "bmw",
        name: "BMW 840i Gran Coupe",
        price: "$85,700",
        desc: "A four-door coupe built around effortless turbocharged six-cylinder refinement.",
        features: [
            "335 Horsepower / 369 lb-ft of Torque Profile",
            "8-Speed Steptronic Sport Transmission",
            "xDrive All-Wheel Drive Drivetrain System",
            "Adaptive M Suspension Suspension System",
            "Frameless Four-Door Coupe Silhouette"
        ],
        colors: [
            { name: "Tanzanite Blue", hex: "#1E2F5C", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_840i_Gran_Coupe_G16_black_%282%29.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — price corrected from $58,700 to approximately $73,350-$74,925 per current KBB dealer listings; hp/torque not independently reconfirmed this pass.
    "bmw-z4-m40i": {
        class: "bmw",
        name: "BMW Z4 M40i",
        price: "$73,350",
        desc: "A classic roadster formula updated with a turbocharged six for genuine performance.",
        features: [
            "382 Horsepower / 369 lb-ft of Torque Profile",
            "8-Speed Steptronic Sport Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive M Suspension Suspension System",
            "Retractable Soft Top with Turbocharged Inline-6"
        ],
        colors: [
            { name: "San Marino Blue", hex: "#0B5AA6", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_Z4_M40i_%28G29%29_front.jpg" }
        ]
    },

    // VERIFY-NOTE: CORRECTION FOUND during read-through pass — the original entry was named "760e xDrive" (missing the "M" prefix) and its 483 hp/516 lb-ft figures actually matched the different, tamer "750e xDrive" trim, not the M760e. Corrected name to "M760e xDrive" and hp to 612 (per BMW's own bmw-m.com page); torque wasn't explicitly confirmed there so it's marked approximate — sources range 590-591 lb-ft. Recommend a dedicated verification pass on this one before publishing.
    "bmw-760e-xdrive": {
        class: "bmw",
        name: "BMW M760e xDrive",
        price: "$115,500",
        desc: "BMW's flagship plug-in hybrid sedan, blending silent electric range with turbocharged reserve power.",
        features: [
            "612 Horsepower / 590 lb-ft (approx.) of Torque Profile",
            "8-Speed Steptronic Sport Transmission",
            "xDrive All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension with Executive Drive Pro Suspension System",
            "Plug-In Hybrid Powertrain with Extended Electric Range"
        ],
        colors: [
            { name: "Frozen Bernina Grey", hex: "#6D6E71", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_G70_M760e_xDrive_DSC_7348.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify hp/torque/price before publishing.
    "bmw-x7-m60i": {
        class: "bmw",
        name: "BMW X7 M60i",
        price: "$99,900",
        desc: "BMW's largest SUV, fitted with the M division's twin-turbo V8 for genuine performance in a family package.",
        features: [
            "523 Horsepower / 553 lb-ft of Torque Profile",
            "8-Speed Steptronic Sport Transmission",
            "xDrive All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Three-Row Seating with Twin-Turbo V8"
        ],
        colors: [
            { name: "Carbon Black", hex: "#1A1A1A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_G07_X7_M60i_1X7A7226.jpg" }
        ]
    },

    // ================================================================
    // ================================================================
    // MERCEDES-BENZ — VERIFIED July 2026 against Mercedes-Benz USA (mbusa.com),
    // Edmunds, Cars.com, Car and Driver. The AMG GT 63 S figures needed a
    // significant correction; several lower-volume trims are flagged as not
    // independently reverified this pass.
    // ================================================================
    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft, though broadly consistent with multiple sources checked for other AMG models. Verify before publishing.
    "mercedes-amg-g63": {
        class: "mercedes",
        name: "Mercedes-AMG G63",
        price: "$179,000",
        desc: "The undisputed king of luxury off-road icons, handcrafted around a biturbo V8.",
        features: [
            "577 Horsepower / 627 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT TCT 9-Speed Transmission",
            "Permanent All-Wheel Drive Drivetrain System",
            "AMG RIDE CONTROL Adaptive Dampening Suspension System",
            "Triple Sequential Mechanical Locking Differentials"
        ],
        colors: [
            { name: "Obsidian Black", hex: "#000000", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Benz_G-Klasse_(W463)_G_63_AMG_(2023)_(53967592162).jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — this two-door AMG GT 63 S is now the hybrid "E Performance" model, jumping from 630 hp/664 lb-ft to roughly 805 hp/1,047 lb-ft. Confirmed via Edmunds and Mercedes-Benz USA.
    "mercedes-amg-gt63s": {
        class: "mercedes",
        name: "Mercedes-AMG GT 63 S E Performance",
        price: "$180,200",
        desc: "A four-door grand tourer with genuine supercar-baiting acceleration — now boosted further by a dedicated electric rear motor.",
        features: [
            "805 Horsepower / 1047 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT MCT 9-Speed (Hybrid) Transmission",
            "4MATIC+ All-Wheel Drive Drivetrain System",
            "AMG RIDE CONTROL+ Air Suspension Suspension System",
            "Hybrid-Assisted Twin-Turbo V8 with Electric Rear Motor"
        ],
        colors: [
            { name: "Selenite Grey Magno", hex: "#8A8D8F", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_GT_63_S_E_Performance_Coupe_(C192)_front.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (671 hp / 752 lb-ft and price range confirmed via Car and Driver and Mercedes-Benz USA).
    "mercedes-amg-c63s-e-performance": {
        class: "mercedes",
        name: "Mercedes-AMG C63 S E Performance",
        price: "$87,100",
        desc: "A hybrid reinvention of AMG's compact performance sedan, trading V8 for hybrid turbo-four muscle.",
        features: [
            "671 Horsepower / 752 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT MCT 9-Speed Transmission",
            "4MATIC+ All-Wheel Drive Drivetrain System",
            "AMG RIDE CONTROL Adaptive Dampening Suspension System",
            "Plug-In Hybrid Turbo-4 with Electric Rear Axle"
        ],
        colors: [
            { name: "Spectral Blue", hex: "#1B4B8F", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_C_63_S_E_Performance_(W206)_front.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify before publishing.
    "mercedes-amg-e63s": {
        class: "mercedes",
        name: "Mercedes-AMG E63 S",
        price: "$114,900",
        desc: "A biturbo V8 executive sedan capable of switching between comfort and outright aggression.",
        features: [
            "603 Horsepower / 627 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT MCT 9-Speed Transmission",
            "4MATIC+ All-Wheel Drive Drivetrain System",
            "AMG RIDE CONTROL+ Air Suspension Suspension System",
            "Drift Mode with Biturbo V8"
        ],
        colors: [
            { name: "Designo Diamond White", hex: "#F3F3F0", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_E63_S_4MATIC+_(W213).jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (791 hp / 1,055 lb-ft confirmed via Edmunds; price consistent with official CA DriveClean listing of $186,200).
    "mercedes-amg-s63": {
        class: "mercedes",
        name: "Mercedes-AMG S63 E Performance",
        price: "$190,650",
        desc: "AMG's flagship hybrid sedan, combining limousine comfort with hypercar-adjacent torque.",
        features: [
            "791 Horsepower / 1055 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT 9-Speed Transmission",
            "4MATIC+ All-Wheel Drive Drivetrain System",
            "AMG Active Ride Control Air Suspension Suspension System",
            "Plug-In Hybrid V8 with Electric Rear Axle Boost"
        ],
        colors: [
            { name: "Obsidian Black", hex: "#000000", img: "https://commons.wikimedia.org/wiki/Special:FilePath/The_frontview_of_Mercedes-AMG_S_63_E_PERFORMANCE_(W223).jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (603 hp / 627 lb-ft confirmed via automobile-catalog and Edmunds). Price corrected upward from $121,900 toward current dealer listings (~$139,500).
    "mercedes-amg-gle63s": {
        class: "mercedes",
        name: "Mercedes-AMG GLE 63 S",
        price: "$139,540",
        desc: "A biturbo V8 SUV tuned for both family duty and genuine cornering ability.",
        features: [
            "603 Horsepower / 627 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT TCT 9-Speed Transmission",
            "4MATIC+ All-Wheel Drive Drivetrain System",
            "AMG Active Ride Control Air Suspension Suspension System",
            "E-Active Body Control with Biturbo V8"
        ],
        colors: [
            { name: "Graphite Grey", hex: "#4B4B4B", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Mercedes-AMG_GLE_63_S_4MATIC_IMG_9842.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — price corrected from $135,900; current dealer listings run from roughly $161,000 to $174,500 depending on trim/options.
    "mercedes-amg-gls63": {
        class: "mercedes",
        name: "Mercedes-AMG GLS 63",
        price: "$161,435",
        desc: "AMG's largest SUV, offering three rows of seating without sacrificing V8 performance.",
        features: [
            "603 Horsepower / 627 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT TCT 9-Speed Transmission",
            "4MATIC+ All-Wheel Drive Drivetrain System",
            "AMG Active Ride Control Air Suspension Suspension System",
            "Three-Row Seating with Biturbo V8"
        ],
        colors: [
            { name: "Obsidian Black", hex: "#000000", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_GLS_63_(53580565692).jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (577 hp / 590 lb-ft confirmed via Edmunds and Cars.com).
    "mercedes-amg-sl63": {
        class: "mercedes",
        name: "Mercedes-AMG SL 63",
        price: "$181,750",
        desc: "A revival of Mercedes' classic roadster, now built on a dedicated AMG sports-car platform.",
        features: [
            "577 Horsepower / 590 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT MCT 9-Speed Transmission",
            "4MATIC+ All-Wheel Drive Drivetrain System",
            "AMG Active Ride Control Air Suspension Suspension System",
            "Retractable Soft Top with Rear-Axle Steering"
        ],
        colors: [
            { name: "Designo Cardinal Red", hex: "#8B1E2E", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_SL_63_(R232)_1X7A7035.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify before publishing.
    "mercedes-amg-gt-black-series": {
        class: "mercedes",
        name: "Mercedes-AMG GT Black Series",
        price: "$325,000",
        desc: "The most extreme road-going AMG ever built, born directly from AMG's GT3 racing program.",
        features: [
            "720 Horsepower / 590 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT DCT 7-Speed Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Motorsport-Derived Coil-Over Suspension Suspension System",
            "Active Aerodynamics with Flat-Plane Crank V8"
        ],
        colors: [
            { name: "AMG Green Hell Magno", hex: "#1E5631", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_GT_Black_Series.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify before publishing.
    "mercedes-maybach-s680": {
        class: "mercedes",
        name: "Mercedes-Maybach S 680",
        price: "$211,750",
        desc: "Mercedes' ultra-luxury flagship, built around a naturally aspirated V12 and a first-class rear cabin.",
        features: [
            "621 Horsepower / 664 lb-ft of Torque Profile",
            "9G-Tronic 9-Speed Transmission",
            "4MATIC All-Wheel Drive Drivetrain System",
            "AIRMATIC Adaptive Air Suspension Suspension System",
            "Extended Wheelbase with Executive Rear Cabin"
        ],
        colors: [
            { name: "Designo Diamond White", hex: "#F3F3F0", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Maybach_S_680_Pullman_001.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — same hybrid "E Performance" update as the two-door GT 63 S; corrected from 630 hp/664 lb-ft to 831 hp/1,032 lb-ft per Mercedes-Benz USA and Cars.com.
    "mercedes-amg-gt-4-door-63s": {
        class: "mercedes",
        name: "Mercedes-AMG GT 63 S E Performance 4-Door",
        price: "$180,200",
        desc: "A four-door coupe that borrows its stance and power from the two-door AMG GT — now billed by Mercedes as the most powerful street-legal AMG yet.",
        features: [
            "831 Horsepower / 1032 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT MCT 9-Speed (Hybrid) Transmission",
            "4MATIC+ All-Wheel Drive Drivetrain System",
            "AMG RIDE CONTROL+ Air Suspension Suspension System",
            "Rear-Axle Steering with Hybrid-Assisted Biturbo V8"
        ],
        colors: [
            { name: "Selenite Grey Magno", hex: "#8A8D8F", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes_AMG_GT_4_Doors_63_S_(48536796706).jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify before publishing.
    "mercedes-amg-a45s": {
        class: "mercedes",
        name: "Mercedes-AMG A 45 S",
        price: "$63,900",
        desc: "AMG's compact hatchback flagship, built around the most powerful production four-cylinder available.",
        features: [
            "415 Horsepower / 369 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT DCT 8-Speed Transmission",
            "4MATIC+ All-Wheel Drive Drivetrain System",
            "AMG Adaptive Damping Suspension System",
            "Most Powerful Production Turbo-4 in its Class"
        ],
        colors: [
            { name: "Mountain Grey Magno", hex: "#6E6E6E", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Amg_A45_S_(W177)_black_(2).jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (416 hp / 369 lb-ft confirmed via Cars.com and Edmunds). Note: a gas CLA45 S "Final Edition" has been announced as the nameplate winds down in favor of an all-electric CLA — worth confirming current availability before publishing.
    "mercedes-amg-cla45s": {
        class: "mercedes",
        name: "Mercedes-AMG CLA 45 S",
        price: "$61,700",
        desc: "The four-door coupe version of the A45's compact-performance formula.",
        features: [
            "416 Horsepower / 369 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT DCT 8-Speed Transmission",
            "4MATIC+ All-Wheel Drive Drivetrain System",
            "AMG Adaptive Damping Suspension System",
            "Coupe-Profile Roofline with Turbo-4"
        ],
        colors: [
            { name: "Sun Yellow", hex: "#F6C500", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_CLA_45_S_4MATIC%2B_Coup%C3%A9_(C118)_front.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify before publishing.
    "mercedes-eqs-amg-53": {
        class: "mercedes",
        name: "Mercedes-AMG EQS 53",
        price: "$147,500",
        desc: "AMG's electric flagship sedan, delivering silent, hybrid-hypercar levels of acceleration.",
        features: [
            "751 Horsepower / 752 lb-ft of Torque Profile",
            "1-Speed Direct Drive Transmission",
            "4MATIC+ Electric All-Wheel Drive Drivetrain System",
            "AMG Active Ride Control Air Suspension Suspension System",
            "Dual-Motor Electric Powertrain with Boost Overtake Mode"
        ],
        colors: [
            { name: "Hyacinth Red Metallic", hex: "#7A1F3D", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_EQS53_(V297)_Washington_DC_Metro_Area,_USA_(2).jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (671 hp / 752 lb-ft confirmed via CA DriveClean official listing at $86,050 MSRP, consistent with this entry).
    "mercedes-amg-glc63s": {
        class: "mercedes",
        name: "Mercedes-AMG GLC 63 S",
        price: "$86,050",
        desc: "A hybrid-powertrain SUV sharing its electrified turbo-four with the C63 S E Performance.",
        features: [
            "671 Horsepower / 752 lb-ft of Torque Profile",
            "AMG SPEEDSHIFT MCT 9-Speed Transmission",
            "4MATIC+ All-Wheel Drive Drivetrain System",
            "AMG RIDE CONTROL Adaptive Dampening Suspension System",
            "Plug-In Hybrid Turbo-4 with Electric Rear Axle"
        ],
        colors: [
            { name: "Spectral Blue", hex: "#1B4B8F", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_GLC_63_(X253)_IMG_2597.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. IMAGE-RESEARCH UPDATE: Wikipedia confirms Mercedes moved away from "EQG" branding for the production version — it now ships as the "G 580 with EQ Technology." The only Commons photos available are of the pre-production "Concept EQG" show car, not the final production model. Consider renaming this entry to match the actual production name.
    "mercedes-eqg": {
        class: "mercedes",
        name: "Mercedes-Benz EQG",
        price: "$130,000",
        desc: "An electric reinterpretation of the iconic G-Class, retaining its boxy silhouette and off-road ability.",
        features: [
            "579 Horsepower / 859 lb-ft of Torque Profile",
            "1-Speed Direct Drive per Axle Transmission",
            "Electric All-Wheel Drive with Tank Turn Drivetrain System",
            "Adaptive Off-Road Air Suspension Suspension System",
            "Four Individual Electric Motors with G-Turn Function"
        ],
        colors: [
            { name: "Obsidian Black", hex: "#000000", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Benz_Concept_EQG.jpg" }
        ]
    },

    // ================================================================
    // ================================================================
    // FERRARI — VERIFIED July 2026 against Ferrari.com, Autoblog, Motor1,
    // Car and Driver, Road & Track, AutoWin, and Cars.com. This lineup turned
    // out to be significantly out of date: 5 of these 9 cars are actually
    // discontinued, each superseded by a newer model — flagged individually.
    // ================================================================
    // VERIFY-NOTE: FLAGGED — the SF90 Stradale (fixed-roof) is out of production after Ferrari's Q2 2024 report confirmed it; there is no direct hardtop successor (the hybrid 296 GTB is the closest thing). The convertible SF90 Spider remains on sale. Treat this listing as last-known, not currently orderable.
    "ferrari-sf90-stradale": {
        class: "ferrari",
        name: "Ferrari SF90 Stradale",
        price: "$524,815",
        desc: "Ferrari's first series-production plug-in hybrid, and its most powerful road car at launch.",
        features: [
            "986 Horsepower / 590 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "All-Wheel Drive (Electric Front Axle) Drivetrain System",
            "Multimatic Adaptive Dampers Suspension System",
            "Plug-In Hybrid V8 with Triple Electric Motors"
        ],
        colors: [
            { name: "Rosso Corsa", hex: "#D40000", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ferrari_SF90_Stradale_(2023)_(52864606180).jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (819 hp / 546 lb-ft and price confirmed accurate via Autoblog's Q2 2024 report and other sources).
    "ferrari-296-gtb": {
        class: "ferrari",
        name: "Ferrari 296 GTB",
        price: "$321,400",
        desc: "A compact mid-engine hybrid, marking Ferrari's return to a V6 configuration for a road car.",
        features: [
            "819 Horsepower / 546 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Multimatic Adaptive Dampers Suspension System",
            "Hybrid-Assisted V6 with Electric-Only Mode"
        ],
        colors: [
            { name: "Giallo Modena", hex: "#F5D000", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ferrari_296_GTB_1X7A6377.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — discontinued in 2024, confirmed via CarBuzz. Its direct successor is the 12Cilindri (819 hp V12). Treat this listing as last-known, not currently orderable.
    "ferrari-812-superfast": {
        class: "ferrari",
        name: "Ferrari 812 Superfast",
        price: "$393,350",
        desc: "One of the last naturally aspirated front-engine V12 Ferraris, revered for its raw, high-revving character.",
        features: [
            "789 Horsepower / 530 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Magnetorheological Adaptive Suspension Suspension System",
            "Naturally Aspirated V12 with Electric Power Steering"
        ],
        colors: [
            { name: "Rosso Corsa", hex: "#D40000", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ferrari_812_Superfast.jpg" }
        ]
    },

    // VERIFY-NOTE: UPDATE — image research turned up a stronger, more direct source (Wikipedia's Ferrari Roma page) than the original spec-verification pass: Roma Coupé production is confirmed to have ended in 2024, succeeded by the new Ferrari Amalfi. This supersedes the earlier softer "approaching end of life cycle, still orderable" note. Treat this listing as last-known, not currently orderable as a new Coupe (the Roma Spider convertible remains listed as in production through 2026 per the same source).
    "ferrari-roma": {
        class: "ferrari",
        name: "Ferrari Roma",
        price: "$247,000",
        desc: "A front-engine grand tourer styled after 1960s Italian elegance rather than track-day aggression.",
        features: [
            "611 Horsepower / 561 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Retro-Inspired Grand Touring Design"
        ],
        colors: [
            { name: "Grigio Titanio", hex: "#8C8C8C", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ferrari_Roma_IMG_9620.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft, though no contradicting information turned up. Verify before publishing.
    "ferrari-purosangue": {
        class: "ferrari",
        name: "Ferrari Purosangue",
        price: "$398,350",
        desc: "Ferrari's first four-door, four-seat model, retaining a naturally aspirated V12 in an SUV-adjacent body.",
        features: [
            "715 Horsepower / 528 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Active Suspension with Independent Corner Control Suspension System",
            "Naturally Aspirated V12 with Rear-Hinged Doors"
        ],
        colors: [
            { name: "Blu Tour de France", hex: "#1A3A6B", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ferrari_Purosangue_IMG_9554.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — fully discontinued; Ferrari confirmed to Car and Driver that only a single 2023-model-year unit was built for North America before production ended. The 296 GTB is its spiritual successor. Treat this listing as last-known, not currently orderable.
    "ferrari-f8-tributo": {
        class: "ferrari",
        name: "Ferrari F8 Tributo",
        price: "$283,950",
        desc: "A mid-engine V8 supercar built as a tribute to Ferrari's turbocharged V8 heritage.",
        features: [
            "710 Horsepower / 568 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Twin-Turbo V8 with Side Air Intakes"
        ],
        colors: [
            { name: "Rosso Corsa", hex: "#D40000", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ferrari_F8_Tributo_IMG_3273.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — its production run reportedly sold out entirely upon announcement and Ferrari describes it as "approaching the end of its life cycle" alongside the Roma. Treat as limited/likely unavailable to new customers.
    "ferrari-812-competizione": {
        class: "ferrari",
        name: "Ferrari 812 Competizione",
        price: "$598,830",
        desc: "A limited-run, track-honed evolution of the 812 Superfast with a higher-revving V12.",
        features: [
            "819 Horsepower / 510 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Magnetorheological Adaptive Suspension Suspension System",
            "Independent Rear-Wheel Steering with Naturally Aspirated V12"
        ],
        colors: [
            { name: "Bianco Cervino", hex: "#EDEDE5", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Ferrari_812_Competizione_Aperta.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — discontinued; Ferrari confirmed to Road & Track that the Roma Spider replaces the Portofino M as the brand's entry-level convertible. Treat this listing as last-known, not currently orderable.
    "ferrari-portofino-m": {
        class: "ferrari",
        name: "Ferrari Portofino M",
        price: "$245,000",
        desc: "Ferrari's entry-level convertible grand tourer, built for effortless open-top touring.",
        features: [
            "612 Horsepower / 561 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Retractable Hardtop with Grand Touring Tuning"
        ],
        colors: [
            { name: "Blu Abu Dhabi", hex: "#1B2A4A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ferrari_Portofino_M_IMG_4351.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — price corrected from $339,840 to $367,189 per Car and Driver; hp/torque confirmed unchanged at 819/546.
    "ferrari-296-gts": {
        class: "ferrari",
        name: "Ferrari 296 GTS",
        price: "$367,189",
        desc: "The open-top counterpart to the 296 GTB, retaining its hybrid V6 powertrain.",
        features: [
            "819 Horsepower / 546 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Multimatic Adaptive Dampers Suspension System",
            "Retractable Hardtop with Hybrid-Assisted V6"
        ],
        colors: [
            { name: "Giallo Modena", hex: "#F5D000", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Ferrari_296_GTS_DSC_9039.jpg" }
        ]
    },

    // ================================================================
    // ================================================================
    // LAMBORGHINI — VERIFIED July 2026 against Lamborghini.com, Edmunds, KBB,
    // CarExpert, Car and Driver, autoevolution, Fisher Luxury Rental's pricing
    // guide. This lineup turned out to have the most churn of any brand
    // checked so far: the ENTIRE Huracan range is discontinued, replaced by
    // the Temerario, and the Urus Performante has been replaced by a hybrid.
    // ================================================================
    // VERIFY-NOTE: Verified. Price confirmed via KBB at $608,358. Note: 1,001 hp is the combined hybrid system output; the naturally aspirated V12 alone makes 819 hp/529 lb-ft per Lamborghini Charlotte — kept the system-total figures here since that's what Lamborghini markets.
    "lamborghini-revuelto": {
        class: "lamborghini",
        name: "Lamborghini Revuelto",
        price: "$608,358",
        desc: "Lamborghini's hybrid V12 flagship, marking a new era while retaining a screaming naturally aspirated heart.",
        features: [
            "1001 Horsepower / 725 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "Electric All-Wheel Drive (Hybrid) Drivetrain System",
            "Active Suspension with Independent Corner Control Suspension System",
            "Naturally Aspirated V12 with Triple Electric Motors"
        ],
        colors: [
            { name: "Arancio Xanto", hex: "#E8621D", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lamborghini_Revuelto.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the entire Huracan lineup (including the STO) is discontinued; Lamborghini has confirmed production wound down through 2025, replaced by the Temerario. Treat this listing as last-known, not currently orderable.
    "lamborghini-huracan-sto": {
        class: "lamborghini",
        name: "Lamborghini Huracan STO",
        price: "$327,838",
        desc: "A road-legal version of Lamborghini's GT3 race car, built almost entirely from motorsport parts.",
        features: [
            "631 Horsepower / 417 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Motorsport-Derived Magnetorheological Suspension Suspension System",
            "Race-Derived Bodywork with Central Single Wiper"
        ],
        colors: [
            { name: "Verde Mantis", hex: "#3CB371", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lamborghini_Huracan_STO.jpg" }
        ]
    },

    // VERIFY-NOTE: MAJOR CHANGE — the gas-only Urus Performante has been replaced by the hybrid "Urus SE Performante" at 812 hp/738 lb-ft, confirmed via Edmunds. Base MSRP not cleanly confirmed; a fully configured example was reported at $333,347 by Fisher Luxury Rental, so the price here is an approximation. IMAGE-RESEARCH UPDATE: no Commons photo of the new hybrid SE Performante was found — the photo used here is the previous-generation gas Urus Performante, which looks nearly identical externally but is not the current model.
    "lamborghini-urus-performante": {
        class: "lamborghini",
        name: "Lamborghini Urus SE Performante",
        price: "$295,000",
        desc: "A weight-reduced, track-tuned version of Lamborghini's super-SUV, now electrified for even more punch.",
        features: [
            "812 Horsepower / 738 lb-ft of Torque Profile",
            "8-Speed Torque-Converter (Hybrid) Transmission",
            "Permanent All-Wheel Drive Drivetrain System",
            "Adaptive Dual-Chamber Air Suspension Suspension System",
            "Plug-In Hybrid Twin-Turbo V8 with 37-Mile Electric Range"
        ],
        colors: [
            { name: "Giallo Auge", hex: "#F2C200", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lamborghini_Urus_Performante_1X7A6803.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the naturally aspirated Aventador ended production in 2022; this entry (like the whole Aventador range) is last-known, not currently orderable. No direct successor exists — the Revuelto replaced the Aventador nameplate overall.
    "lamborghini-aventador-svj": {
        class: "lamborghini",
        name: "Lamborghini Aventador SVJ",
        price: "$573,966",
        desc: "The final and most extreme evolution of the naturally aspirated Aventador V12.",
        features: [
            "759 Horsepower / 531 lb-ft of Torque Profile",
            "7-Speed Single-Clutch ISR Transmission",
            "Permanent All-Wheel Drive Drivetrain System",
            "Active Suspension with Magnetorheological Dampers Suspension System",
            "ALA 2.0 Active Aerodynamics"
        ],
        colors: [
            { name: "Verde Alceo", hex: "#0B4A2E", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lamborghini_Aventador_SVJ_63.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — discontinued alongside the rest of the Huracan lineup, replaced by the Temerario. Treat as last-known, not currently orderable.
    "lamborghini-huracan-tecnica": {
        class: "lamborghini",
        name: "Lamborghini Huracan Tecnica",
        price: "$244,182",
        desc: "A road-focused Huracan built to bridge the gap between the everyday EVO and track-only STO.",
        features: [
            "631 Horsepower / 417 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Magnetorheological Suspension Suspension System",
            "Rear-Wheel Steering with Naturally Aspirated V10"
        ],
        colors: [
            { name: "Arancio Borealis", hex: "#E85B10", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lamborghini_Huracán_Tecnica_1X7A7430.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — discontinued alongside the rest of the Huracan lineup, replaced by the Temerario. Treat as last-known, not currently orderable.
    "lamborghini-huracan-evo-spyder": {
        class: "lamborghini",
        name: "Lamborghini Huracan EVO Spyder",
        price: "$287,400",
        desc: "The open-top variant of the Huracan EVO, retaining its high-revving naturally aspirated V10.",
        features: [
            "631 Horsepower / 417 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Adaptive Magnetorheological Suspension Suspension System",
            "Retractable Soft Top with Naturally Aspirated V10"
        ],
        colors: [
            { name: "Blu Uranus", hex: "#1B2E6B", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lamborghini_Huracan_Evo_Spyder_Genf_2019_1Y7A5556.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the current pricing guide only lists "Urus SE" ($252,007) and "Urus SE Performante" as active trims; the non-hybrid "Urus S" appears to have been superseded. Verify current trim naming before publishing.
    "lamborghini-urus-s": {
        class: "lamborghini",
        name: "Lamborghini Urus S",
        price: "$237,065",
        desc: "The standard-bearer Urus, offering supercar-baiting pace in an SUV body.",
        features: [
            "657 Horsepower / 627 lb-ft of Torque Profile",
            "8-Speed Torque-Converter Transmission",
            "Permanent All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Torque Vectoring with Rear-Wheel Steering"
        ],
        colors: [
            { name: "Grigio Keres", hex: "#4A4A4A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lamborghini_Urus_SE_001.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — discontinued alongside the rest of the Huracan lineup; the Sterrato sold out quickly, and Lamborghini has hinted at (but not confirmed) a similar off-road variant of the Temerario as a spiritual successor. Treat as last-known, not currently orderable.
    "lamborghini-huracan-sterrato": {
        class: "lamborghini",
        name: "Lamborghini Huracan Sterrato",
        price: "$273,177",
        desc: "A rally-inspired, raised-ride-height Huracan built for gravel and loose surfaces.",
        features: [
            "602 Horsepower / 413 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Raised Off-Road Tuned Suspension Suspension System",
            "Underbody Protection with All-Terrain Tires"
        ],
        colors: [
            { name: "Verde Sherwood", hex: "#2E5339", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Lamborghini_Huracan_Sterrato.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (907 hp / 538 lb-ft confirmed via Car and Driver's official reveal coverage). This is the current replacement for the entire discontinued Huracan lineup. Price not explicitly confirmed this pass — treat as approximate.
    "lamborghini-temerario": {
        class: "lamborghini",
        name: "Lamborghini Temerario",
        price: "$342,000",
        desc: "The Huracan's hybrid successor, pairing a new twin-turbo V8 with electric motors for immediate response.",
        features: [
            "907 Horsepower / 538 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "All-Wheel Drive (Hybrid) Drivetrain System",
            "Active Suspension with Independent Corner Control Suspension System",
            "Hybrid-Assisted Twin-Turbo V8 with Triple Electric Motors"
        ],
        colors: [
            { name: "Giallo Auge", hex: "#F2C200", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lamborghini_Temerario.jpg" }
        ]
    },

    // ================================================================
    // ================================================================
    // ASTON MARTIN — VERIFIED July 2026 against astonmartin.com, Edmunds,
    // TrueCar, Car and Driver, Autoblog, Cars Frenzy. Two of these seven cars
    // (DBS Superleggera, DB11) are discontinued, replaced by the Vanquish
    // and DB12 respectively.
    // ================================================================
    // VERIFY-NOTE: FLAGGED — the DBS Superleggera was retired after the 2023 model year; its replacement as Aston's flagship GT is the all-new Vanquish (see below). Treat this listing as last-known, not currently orderable.
    "aston-martin-dbs-superleggera": {
        class: "aston",
        name: "Aston Martin DBS Superleggera",
        price: "$325,000",
        desc: "A grand tourer built around brute twin-turbo V12 force and unmistakable British styling.",
        features: [
            "715 Horsepower / 664 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Damping System Suspension System",
            "Carbon Fiber Bodywork with Twin-Turbo V12"
        ],
        colors: [
            { name: "Xenon Grey", hex: "#5C5C5C", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2022_Aston_Martin_DBS_Superleggera.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (hp/torque consistent with multiple sources). Price confirmed close to accurate — current official pricing is Coupe from $194,500, Roadster from $214,500, S Coupe around $250,000.
    "aston-martin-vantage": {
        class: "aston",
        name: "Aston Martin Vantage",
        price: "$194,500",
        desc: "Aston Martin's compact sports car, sharpened with a torque-rich twin-turbo V8.",
        features: [
            "656 Horsepower / 590 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Damping System Suspension System",
            "Electronic Rear Differential with Twin-Turbo V8"
        ],
        colors: [
            { name: "Lightning Silver", hex: "#C7C9CB", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Aston_Martin_Vantage,_EMS_2024,_Essen_(P1032159).jpg" }
        ]
    },

    // VERIFY-NOTE: Verified — 671 hp / 590 lb-ft and $245,000 price both confirmed directly against Aston Martin USA's own DB12 page.
    "aston-martin-db12": {
        class: "aston",
        name: "Aston Martin DB12",
        price: "$245,000",
        desc: "Billed as the first of a new 'Super Tourer' breed, blending everyday comfort with sharper reflexes.",
        features: [
            "671 Horsepower / 590 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Damping System Suspension System",
            "Twin-Turbo V8 with Recalibrated Chassis Electronics"
        ],
        colors: [
            { name: "Q Yellow Tartrazine", hex: "#F0C300", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Aston_Martin_DB12_Coupé.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (697 hp / 663 lb-ft confirmed via Edmunds and Aston Martin USA). Price corrected from $236,000 to $242,000. Note: a more powerful DBX S trim (717 hp, from $274,500) is now also available above this base car.
    "aston-martin-dbx707": {
        class: "aston",
        name: "Aston Martin DBX707",
        price: "$242,000",
        desc: "Aston Martin's performance SUV, named for its metric horsepower figure and built to match supercar pace.",
        features: [
            "697 Horsepower / 663 lb-ft of Torque Profile",
            "9-Speed Wet-Clutch Automatic Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Adaptive Triple-Chamber Air Suspension Suspension System",
            "Twin-Turbo V8 with Electronic Rear Differential"
        ],
        colors: [
            { name: "Aston Martin Racing Green", hex: "#0B3D2E", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2024_Aston_Martin_DBX707.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify before publishing.
    "aston-martin-valkyrie": {
        class: "aston",
        name: "Aston Martin Valkyrie",
        price: "$3,000,000",
        desc: "A hypercar co-developed with Red Bull Racing, built around Formula 1-derived aerodynamic principles.",
        features: [
            "1160 Horsepower / 664 lb-ft of Torque Profile",
            "7-Speed Single-Clutch Automated Manual Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Pushrod-Actuated Inboard Suspension Suspension System",
            "Hybrid Naturally Aspirated V12 with F1-Derived Aerodynamics"
        ],
        colors: [
            { name: "Valkyrie Blue", hex: "#0B2A5C", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2022_Aston_Martin_Valkyrie_1.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — hp/torque (824/738) were already accurate, but price corrected significantly, from $333,000 to the official $429,000 starting price, confirmed via Car and Driver and Autoblog. This is the new flagship GT that directly replaces the discontinued DBS Superleggera.
    "aston-martin-vanquish": {
        class: "aston",
        name: "Aston Martin Vanquish",
        price: "$429,000",
        desc: "Aston Martin's flagship grand tourer, built around one of the last great naturally aspirated V12s — and the direct successor to the DBS Superleggera.",
        features: [
            "824 Horsepower / 738 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Damping System Suspension System",
            "Naturally Aspirated V12 with Carbon Fiber Structure"
        ],
        colors: [
            { name: "Onyx Black", hex: "#0A0A0A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2025_Aston_Martin_Vanquish_1.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the DB11 was discontinued and fully replaced by the DB12. Treat this listing as last-known, not currently orderable.
    "aston-martin-db11": {
        class: "aston",
        name: "Aston Martin DB11",
        price: "$205,600",
        desc: "A grand tourer that ushered in Aston Martin's modern design language and turbocharged engine family.",
        features: [
            "528 Horsepower / 516 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Damping System Suspension System",
            "Twin-Turbo V8 with Aeroblade Active Aerodynamics"
        ],
        colors: [
            { name: "Morning Frost White", hex: "#EDEDED", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Aston_Martin_DB11_V12.jpg" }
        ]
    },

    // ================================================================
    // BENTLEY — VERIFIED July 2026 against Automonitor's 2026 Bentley price
    // guide, Autoblog, Cleveland Motorsports, and KBB dealer listings. The
    // Continental GT Speed/Flying Spur Speed powertrain figures needed a
    // major correction, and the Bentayga Speed notably skips the hybrid setup.
    // ================================================================
    // VERIFY-NOTE: major correction — hp/torque corrected from 650/664 to 771/738 for the current "Ultra Performance Hybrid" powertrain that replaced the W12, confirmed via Automonitor and Cleveland Motorsports. Price corrected upward; a "realistically equipped" example runs $280,000-$310,000 per Automonitor.
    "bentley-continental-gt-speed": {
        class: "bentley",
        name: "Bentley Continental GT Speed",
        price: "$292,050",
        desc: "Bentley's flagship grand tourer, blending handcrafted luxury with genuine sports-car pace — now powered by a hybrid setup that replaced the long-running W12.",
        features: [
            "771 Horsepower / 738 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch (Hybrid) Transmission",
            "All-Wheel Drive with Torque Vectoring Drivetrain System",
            "Adaptive Air Suspension with Electronic Anti-Roll Suspension System",
            "Ultra Performance Hybrid Powertrain with Rear-Wheel Steering"
        ],
        colors: [
            { name: "Beluga Black", hex: "#0A0A0A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Bentley_Continental_GT_Speed_(3rd_gen.)_IMG_0015.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — hp/torque corrected from 626/664 to 771/738, matching the Continental GT Speed's hybrid powertrain, confirmed via Cleveland Motorsports. Price corrected to the confirmed $300,000 estimated starting MSRP.
    "bentley-flying-spur-speed": {
        class: "bentley",
        name: "Bentley Flying Spur Speed",
        price: "$300,000",
        desc: "A four-door interpretation of Bentley's grand touring formula, built for rear-seat luxury.",
        features: [
            "771 Horsepower / 738 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch (Hybrid) Transmission",
            "All-Wheel Drive with Torque Vectoring Drivetrain System",
            "Adaptive Air Suspension with Electronic Anti-Roll Suspension System",
            "Ultra Performance Hybrid Powertrain with Rear-Wheel Steering"
        ],
        colors: [
            { name: "Cricket Ball Red", hex: "#7A1F2B", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Bentley_Flying_Spur_Speed.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — notably, this SUV Speed model skips the hybrid setup entirely, running a non-hybrid twin-turbo V8 at 641 hp/627 lb-ft (not the 771-hp hybrid used in the Continental/Flying Spur Speed models). Confirmed via Autoblog. Price corrected to the ~$280,000 expected starting figure.
    "bentley-bentayga-speed": {
        class: "bentley",
        name: "Bentley Bentayga Speed",
        price: "$280,000",
        desc: "The performance flagship of Bentley's SUV lineup — skipping the hybrid setup used elsewhere in the range in favor of a pure twin-turbo V8 tuned for a new drift mode.",
        features: [
            "641 Horsepower / 627 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "Permanent All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension with Electronic Anti-Roll Suspension System",
            "Twin-Turbo V8 with New ESC Dynamic Drift Mode"
        ],
        colors: [
            { name: "Glacier White", hex: "#EDEDED", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Bentley_Bentayga.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — the Continental GTC's base/Azure hybrid powertrain is now rated at 671 hp/686 lb-ft (a detuned version of the Speed's hybrid system), confirmed via Autoblog — not the old 542 hp/568 lb-ft non-hybrid figures. Price corrected upward to reflect current hybrid-era pricing.
    "bentley-continental-gtc": {
        class: "bentley",
        name: "Bentley Continental GTC",
        price: "$293,195",
        desc: "The open-top version of the Continental GT, engineered for quiet, refined top-down cruising — now hybrid-powered like the rest of the range.",
        features: [
            "671 Horsepower / 686 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch (Hybrid) Transmission",
            "All-Wheel Drive with Torque Vectoring Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "High Performance Hybrid Powertrain with Handcrafted Cabin"
        ],
        colors: [
            { name: "Beluga Black", hex: "#0A0A0A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2024_Bentley_Continental_GTC_Speed.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify before publishing.
    "bentley-mulliner-batur": {
        class: "bentley",
        name: "Bentley Mulliner Batur",
        price: "$2,000,000",
        desc: "An ultra-exclusive coachbuilt grand tourer previewing the design language of future Bentleys.",
        features: [
            "730 Horsepower / 738 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "All-Wheel Drive with Torque Vectoring Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Ultra-Limited Coachbuilt Bodywork by Mulliner"
        ],
        colors: [
            { name: "Titan Grey", hex: "#5A5A5A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Bentley_Mulliner_Batur.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — price corrected from $220,000 to approximately $263,440 per current KBB dealer listings; hp/torque not independently reconfirmed this pass and may now also reflect a hybrid update — verify before publishing. IMAGE-RESEARCH UPDATE: no EWB-specific Commons photo was found; the photo used here is the standard-wheelbase Bentayga, which looks nearly identical except for about 7 inches of extra rear-door length.
    "bentley-bentayga-ewb": {
        class: "bentley",
        name: "Bentley Bentayga EWB",
        price: "$263,440",
        desc: "An extended-wheelbase Bentayga built around rear-seat comfort and presence.",
        features: [
            "542 Horsepower / 568 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "All-Wheel Drive with Torque Vectoring Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Extended Wheelbase with Executive Rear Cabin"
        ],
        colors: [
            { name: "Glacier White", hex: "#EDEDED", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Bentley_Bentayga.jpg" }
        ]
    },

    // ================================================================
    // ROLLS-ROYCE — VERIFIED July 2026 against KBB, Holman Motorcars, The Car
    // Guide, Motor1, AutoWin. Prices needed significant upward correction
    // across the board, and the Wraith is confirmed discontinued since 2023.
    // ================================================================
    // VERIFY-NOTE: correction — hp corrected from 563 to 571; price corrected substantially from $460,000 to the confirmed $527,750 MSRP (Extended Wheelbase runs $607,750), per KBB.
    "rolls-royce-phantom": {
        class: "rolls",
        name: "Rolls-Royce Phantom",
        price: "$527,750",
        desc: "Rolls-Royce's flagship sedan, representing the pinnacle of handbuilt automotive luxury.",
        features: [
            "571 Horsepower / 664 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Planar Suspension System with Flagbearer Camera Suspension System",
            "Handcrafted Starlight Headliner with Naturally Aspirated V12"
        ],
        colors: [
            { name: "English White", hex: "#F5F5F0", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Rolls-Royce_Phantom_II_--_2024.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — price corrected substantially from $382,000 to the confirmed $432,350 MSRP per KBB; hp confirmed at 563 (Black Badge trim reaches 591 hp).
    "rolls-royce-cullinan": {
        class: "rolls",
        name: "Rolls-Royce Cullinan",
        price: "$432,350",
        desc: "Rolls-Royce's first SUV, bringing marque-defining refinement off the paved road.",
        features: [
            "563 Horsepower / 627 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Planar Suspension System with Self-Leveling Air Struts Suspension System",
            "Handcrafted Cabin with Naturally Aspirated V12"
        ],
        colors: [
            { name: "Salamanca Blue", hex: "#1B2A4A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2024_Rolls-Royce_Cullinan_(70701).jpg" }
        ]
    },

    // VERIFY-NOTE: correction — price corrected from $353,000 to the confirmed $370,750 starting price per KBB; hp/torque not independently reconfirmed this pass.
    "rolls-royce-ghost": {
        class: "rolls",
        name: "Rolls-Royce Ghost",
        price: "$370,750",
        desc: "Rolls-Royce's more understated sedan, built for owner-drivers rather than chauffeured occupants.",
        features: [
            "563 Horsepower / 627 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Planar Suspension System Suspension System",
            "Handcrafted Cabin with Whisper-Quiet Cabin Insulation"
        ],
        colors: [
            { name: "Jubilee Silver", hex: "#C0C0C0", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Rolls-Royce_Ghost_II_IAA_2021_1X7A0005.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (price of $420,000 broadly consistent with multiple current listings, though exact figures vary $397,750-$420,000 by source/trim). hp/torque not independently reconfirmed this pass.
    "rolls-royce-spectre": {
        class: "rolls",
        name: "Rolls-Royce Spectre",
        price: "$420,000",
        desc: "Rolls-Royce's first series-production electric car, wrapped in a two-door coupe body — and the direct successor to the discontinued Wraith.",
        features: [
            "577 Horsepower / 664 lb-ft of Torque Profile",
            "1-Speed Direct Drive Transmission",
            "All-Wheel Drive (Electric) Drivetrain System",
            "Planar Suspension System with Adaptive Air Struts Suspension System",
            "Dual-Motor Electric Powertrain with 102 kWh Battery"
        ],
        colors: [
            { name: "Beadlight Silver", hex: "#B8B8B8", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Rolls-Royce_Spectre.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — confirmed discontinued; production ended in 2023 with the "Black Badge Wraith Black Arrow" send-off edition, and Rolls-Royce has stated there is no direct successor beyond the Spectre taking its place in the lineup as an EV. Treat this listing as last-known, not currently orderable.
    "rolls-royce-wraith": {
        class: "rolls",
        name: "Rolls-Royce Wraith",
        price: "$343,000",
        desc: "A two-door grand tourer built as the sportiest expression of Rolls-Royce's traditional lineup.",
        features: [
            "624 Horsepower / 605 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Planar Suspension System Suspension System",
            "Starlight Headliner with Twin-Turbo V12"
        ],
        colors: [
            { name: "Diamond Black", hex: "#0A0A0A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Spectre_-_Rolls-Royce_Wraith.jpg" }
        ]
    },

    // ================================================================
    // LOTUS — VERIFIED July 2026 against Lotus Cars official site, Lotus San
    // Francisco, KBB, Car and Driver. The Eletre and Emeya entries needed a
    // significant correction: 905 hp is the top "R" trim, not the base car.
    // ================================================================
    // VERIFY-NOTE: Verified (400 hp / 317 lb-ft V6 confirmed via KBB and Lotus dealer listings). Price corrected from $95,690 to the confirmed $109,400 base MSRP.
    "lotus-emira": {
        class: "lotus",
        name: "Lotus Emira",
        price: "$109,400",
        desc: "Widely regarded as the final Lotus built around a combustion engine, closing out an era for the brand.",
        features: [
            "400 Horsepower / 317 lb-ft of Torque Profile",
            "6-Speed Manual / 8-Speed Automatic Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Supercharged V6 with Lightweight Aluminum Chassis"
        ],
        colors: [
            { name: "Hethel Yellow", hex: "#F2D200", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Lotus_Emira_V6_First_Edition.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (price broadly consistent with the ~$2.4M figure reported by Lotus San Francisco; hp/torque not independently reconfirmed this pass but no contradicting information found).
    "lotus-evija": {
        class: "lotus",
        name: "Lotus Evija",
        price: "$2,700,000",
        desc: "An ultra-limited electric hypercar and the most powerful series-production car in the world at launch.",
        features: [
            "1972 Horsepower / 1254 lb-ft of Torque Profile",
            "1-Speed Direct Drive per Motor Transmission",
            "Electric All-Wheel Drive (Four Motors) Drivetrain System",
            "Active Suspension with Independent Corner Control Suspension System",
            "Four Individual Electric Motors with Venturi Tunnel Aero"
        ],
        colors: [
            { name: "Liquid Chrome", hex: "#D8D8D8", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2020_Lotus_Evija.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — 905 hp is actually the top "Eletre R" trim; the base Eletre makes 603 hp. Corrected accordingly, confirmed via KBB. Price corrected from $110,500 to $109,500.
    "lotus-eletre": {
        class: "lotus",
        name: "Lotus Eletre",
        price: "$109,500",
        desc: "Lotus's first SUV and first electric production model, built to broaden the brand beyond sports cars. The range-topping Eletre R pushes this to 905 hp.",
        features: [
            "603 Horsepower / 523 lb-ft of Torque Profile",
            "2-Speed Front / 1-Speed Rear Transmission",
            "Electric All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension with Active Ride Height Suspension System",
            "Dual-Motor Electric Powertrain with 112 kWh Battery"
        ],
        colors: [
            { name: "Cyprus Grey", hex: "#6E6E6E", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lotus_Eletre_IAA_2023_1X7A0668.jpg" }
        ]
    },

    // VERIFY-NOTE: major correction — same issue as the Eletre: 905 hp/727 lb-ft is the top dual-motor trim, while the base Emeya makes 603 hp/523 lb-ft. Corrected accordingly, confirmed via Car and Driver's official reveal coverage.
    "lotus-emeya": {
        class: "lotus",
        name: "Lotus Emeya",
        price: "$105,000",
        desc: "An electric hyper-GT sedan sharing its platform and powertrain with the Eletre SUV. The range-topping dual-motor trim pushes this to 905 hp/727 lb-ft.",
        features: [
            "603 Horsepower / 523 lb-ft of Torque Profile",
            "2-Speed Front / 1-Speed Rear Transmission",
            "Electric All-Wheel Drive Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Dual-Motor Electric Powertrain with 800V Charging"
        ],
        colors: [
            { name: "Nyx Grey", hex: "#3D3D3D", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lotus_Emeya_003.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the Exige was discontinued in December 2021 alongside the Elise and Evora, replaced by the Emira. Treat this listing as last-known, not currently orderable.
    "lotus-exige": {
        class: "lotus",
        name: "Lotus Exige",
        price: "$95,000",
        desc: "A track-focused, minimalist sports car built around Lotus's lightweight-first philosophy.",
        features: [
            "410 Horsepower / 310 lb-ft of Torque Profile",
            "6-Speed Manual Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Motorsport-Tuned Suspension Suspension System",
            "Supercharged V6 with Extreme Lightweight Construction"
        ],
        colors: [
            { name: "Racing Green", hex: "#0B3D2E", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lotus_Exige.jpg" }
        ]
    },

    // ================================================================
    // MASERATI — VERIFIED July 2026 against Edmunds, U.S. News, Maserati US,
    // Fox News, KBB. The Levante is confirmed discontinued after 2024.
    // ================================================================
    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify before publishing.
    "maserati-mc20": {
        class: "maserati",
        name: "Maserati MC20",
        price: "$228,700",
        desc: "Maserati's return to true supercar territory, built around an in-house twin-turbo V6.",
        features: [
            "621 Horsepower / 538 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Twin-Turbo V6 with Butterfly Doors"
        ],
        colors: [
            { name: "Bianco Audace", hex: "#F2F2ED", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Maserati_MC20_in_Digital_Mint,_rear_right.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — the Levante was discontinued after the 2024 model year, confirmed via Edmunds; the Grecale is now Maserati's only SUV. Treat this listing as last-known, not currently orderable.
    "maserati-levante-trofeo": {
        class: "maserati",
        name: "Maserati Levante Trofeo",
        price: "$171,000",
        desc: "The performance flagship of Maserati's SUV lineup, powered by a Ferrari-built V8.",
        features: [
            "580 Horsepower / 538 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Adaptive Air Suspension Suspension System",
            "Ferrari-Built Naturally Aspirated V8"
        ],
        colors: [
            { name: "Nero Enigma", hex: "#0A0A0A", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2021_Maserati_Levante_Trofeo.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified (523 hp / 457 lb-ft confirmed via Edmunds and U.S. News). Price corrected upward — as-tested pricing runs to about $122,530 per U.S. News.
    "maserati-grecale-trofeo": {
        class: "maserati",
        name: "Maserati Grecale Trofeo",
        price: "$117,500",
        desc: "A compact performance SUV built to compete directly with the German sport-SUV establishment.",
        features: [
            "523 Horsepower / 457 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Twin-Turbo V6 with Compact SUV Platform"
        ],
        colors: [
            { name: "Blu Intenso", hex: "#1B3A6B", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Maserati_Grecale_Trofeo_1X7A6383.jpg" }
        ]
    },

    // VERIFY-NOTE: correction — hp corrected from 542 to 582 per Maserati's own US model page; price corrected to the confirmed $224,365 MSRP per KBB.
    "maserati-granturismo-trofeo": {
        class: "maserati",
        name: "Maserati GranTurismo Trofeo",
        price: "$224,365",
        desc: "A grand touring coupe reborn on a new platform, retaining Maserati's signature exhaust note.",
        features: [
            "582 Horsepower / 479 lb-ft of Torque Profile",
            "8-Speed Automatic Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Twin-Turbo V6 with Grand Touring Cabin"
        ],
        colors: [
            { name: "Giallo Corse", hex: "#F2C200", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Maserati_GranTurismo_Trofeo_IMG_7283.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — not independently reverified this pass; figures carried over from the original draft. Verify before publishing.
    "maserati-mc20-cielo": {
        class: "maserati",
        name: "Maserati MC20 Cielo",
        price: "$252,700",
        desc: "The open-top variant of the MC20, featuring an electrochromic glass roof.",
        features: [
            "621 Horsepower / 538 lb-ft of Torque Profile",
            "8-Speed Dual-Clutch Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Sport Suspension Suspension System",
            "Retractable Glass Roof with Twin-Turbo V6"
        ],
        colors: [
            { name: "Blu Infinito", hex: "#0B2A5C", img: "https://commons.wikimedia.org/wiki/Special:FilePath/2022_Maserati_MC20_Cielo.jpg" }
        ]
    },

    // ================================================================
    // BUGATTI — VERIFIED July 2026 against duPont Registry, CarBuzz, Yahoo
    // Autos, Bugatti.com. Both Chiron variants are confirmed discontinued,
    // replaced by the Tourbillon.
    // ================================================================
    // VERIFY-NOTE: FLAGGED — Chiron production has ended entirely, confirmed via duPont Registry and CarBuzz; the Tourbillon is its direct successor. Treat this listing as last-known, not currently orderable.
    "bugatti-chiron-super-sport": {
        class: "bugatti",
        name: "Bugatti Chiron Super Sport",
        price: "$3,800,000",
        desc: "A top-speed-focused evolution of the Chiron, elongated for high-speed aerodynamic stability.",
        features: [
            "1578 Horsepower / 1180 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Adaptive Magnetic Ride Suspension Suspension System",
            "Quad-Turbo W16 with Extended Tail for High-Speed Stability"
        ],
        colors: [
            { name: "Bugatti Silver", hex: "#C7C9CB", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Bugatti_Chiron_Super_Sport.jpg" }
        ]
    },

    // VERIFY-NOTE: FLAGGED — discontinued alongside the rest of the Chiron range. Treat this listing as last-known, not currently orderable.
    "bugatti-chiron-pur-sport": {
        class: "bugatti",
        name: "Bugatti Chiron Pur Sport",
        price: "$3,600,000",
        desc: "A corner-focused Chiron variant, re-geared and stiffened for back-road agility over raw top speed.",
        features: [
            "1479 Horsepower / 1180 lb-ft of Torque Profile",
            "7-Speed Dual-Clutch Transmission",
            "All-Wheel Drive (AWD) Drivetrain System",
            "Motorsport-Tuned Suspension Suspension System",
            "Quad-Turbo W16 with Shorter Gearing for Cornering Agility"
        ],
        colors: [
            { name: "French Racing Blue", hex: "#1B3A8B", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Bugatti_Chiron_Pur_Sport.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified — price confirmed exactly at $4.6M via duPont Registry. Note: hp is reported inconsistently across sources (1,800 hp per duPont Registry vs. 1,775 hp combined per a Yahoo Autos report citing Bugatti); both figures are in circulation.
    "bugatti-tourbillon": {
        class: "bugatti",
        name: "Bugatti Tourbillon",
        price: "$4,600,000",
        desc: "Bugatti's next-generation hypercar, replacing the W16 with a naturally aspirated hybrid V16 — the direct successor to the now-discontinued Chiron.",
        features: [
            "1800 Horsepower / 922 lb-ft of Torque Profile",
            "Automated Manual with Dedicated Reverse Transmission",
            "All-Wheel Drive (Hybrid) Drivetrain System",
            "Rocker-Actuated Inboard Suspension Suspension System",
            "Hybrid Naturally Aspirated V16 with Three Electric Motors"
        ],
        colors: [
            { name: "Tourbillon Blue", hex: "#0B2A5C", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Bugatti_Tourbillon.jpg" }
        ]
    },

    // ================================================================
    // KOENIGSEGG — VERIFIED July 2026 against Car and Driver, Wikipedia,
    // supercars.net, carvibz.com. The Gemera's torque figure needed correction.
    // ================================================================
    // VERIFY-NOTE: Verified (1,600 hp E85 figure confirmed via multiple sources including supercars.net).
    "koenigsegg-jesko": {
        class: "koenigsegg",
        name: "Koenigsegg Jesko",
        price: "$3,000,000",
        desc: "A hypercar built around Koenigsegg's unique multi-clutch transmission and outrageous power output.",
        features: [
            "1600 Horsepower / 1106 lb-ft of Torque Profile",
            "9-Speed Multi-Clutch (Light Speed Transmission) Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Triplex Adaptive Suspension Suspension System",
            "Twin-Turbo V8 with Active Rear Wing"
        ],
        colors: [
            { name: "Koenigsegg Naraka Green", hex: "#1E5631", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Koenigsegg_Jesko_(52558091721).jpg" }
        ]
    },

    // VERIFY-NOTE: correction — torque corrected from 3,345 to 2,581 lb-ft for the base 3-cylinder hybrid configuration, confirmed via Car and Driver. Note: an optional V8 hybrid powertrain is now available, boosting output to 2,300 hp / 2,028 lb-ft.
    "koenigsegg-gemera": {
        class: "koenigsegg",
        name: "Koenigsegg Gemera",
        price: "$1,700,000",
        desc: "A four-seat hybrid hypercar, proving Koenigsegg engineering can extend beyond two-seat layouts — now also available with an optional 2,300-hp V8 hybrid powertrain.",
        features: [
            "1700 Horsepower / 2581 lb-ft of Torque Profile",
            "Direct Drive with Electric Torque Fill Transmission",
            "Electric All-Wheel Drive (Hybrid) Drivetrain System",
            "Triplex Adaptive Suspension Suspension System",
            "Hybrid Twin-Turbo 3-Cylinder with Four Seats"
        ],
        colors: [
            { name: "Gemera Copper", hex: "#B87333", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Koenigsegg_Gemera.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified ("over 1,500 hp" figure confirmed via Auto User Manual's 2026 model year coverage).
    "koenigsegg-regera": {
        class: "koenigsegg",
        name: "Koenigsegg Regera",
        price: "$2,000,000",
        desc: "A hypercar built without a traditional gearbox, relying on electric torque fill instead.",
        features: [
            "1500 Horsepower / 1475 lb-ft of Torque Profile",
            "Direct Drive (No Traditional Gearbox) Transmission",
            "Electric-Assisted Rear-Wheel Drive Drivetrain System",
            "Triplex Adaptive Suspension Suspension System",
            "Hybrid Powertrain with Koenigsegg Direct Drive System"
        ],
        colors: [
            { name: "Regera Ghost Grey", hex: "#8A8D8F", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Koenigsegg_Regera_(31491).jpg" }
        ]
    },

    // ================================================================
    // PAGANI — VERIFIED July 2026 against duPont Registry, Classic.com,
    // Wikipedia, Car and Driver, Autocram.
    // ================================================================
    // VERIFY-NOTE: correction — hp corrected from 764 to 720 (torque of 738 lb-ft confirmed accurate), per Classic.com and duPont Registry. FLAGGED: the standard Huayra appears to have been superseded by the Utopia (2022-present) as Pagani's current model; only limited variants (Huayra R, Huayra Imola) have continued. Verify current orderability before publishing.
    "pagani-huayra": {
        class: "pagani",
        name: "Pagani Huayra",
        price: "$2,600,000",
        desc: "A hand-built hypercar treated as much as rolling sculpture as it is a performance machine.",
        features: [
            "720 Horsepower / 738 lb-ft of Torque Profile",
            "7-Speed Automated Manual Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Active Aerodynamic Suspension Suspension System",
            "Twin-Turbo V12 with Active Aero Flaps"
        ],
        colors: [
            { name: "Pagani Grigio Silverstone", hex: "#B8B8B8", img: "https://commons.wikimedia.org/wiki/Special:FilePath/PaganiHuayra.jpg" }
        ]
    },

    // VERIFY-NOTE: Verified — 852 hp / 811 lb-ft and general pricing confirmed exactly via Wikipedia and Car and Driver's original reveal coverage. This is Pagani's current model, having replaced the Huayra.
    "pagani-utopia": {
        class: "pagani",
        name: "Pagani Utopia",
        price: "$2,500,000",
        desc: "Pagani's successor to the Huayra, deliberately built around analog driver engagement over screens.",
        features: [
            "852 Horsepower / 811 lb-ft of Torque Profile",
            "7-Speed Manual / Automated Manual Transmission",
            "Rear-Wheel Drive (RWD) Drivetrain System",
            "Adaptive Active Suspension Suspension System",
            "Twin-Turbo V12 with Analog-Focused Cabin Design"
        ],
        colors: [
            { name: "Utopia Blu Francia", hex: "#1B3A8B", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Pagani_Utopia.jpg" }
        ]
    }
};