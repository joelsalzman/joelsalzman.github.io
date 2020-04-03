<!DOCTYPE html>
<html lang="en">

  <head>

    <title>Joel Salzman</title>

    <!-- Import theme and scripts -->
    <link rel="stylesheet" type="text/css" href="theme.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

  </head>

  <!---------------------------------------------------------------------------------->

  <body style="background-color: #e1f1c4;">

    <!-- Initial view -->
    <div class="main-image" id="homepage-image">
      <div class="gradient" id="main-gradient"></div>
      <div class="main-text">
        <h1 class="home" id="joel">Joel Salzman</h1>
        <h2 class="home">Geospatial Developer & Analyst</h2>
      </div>
    </div>

    <!-- Sticky header -->
    <header id="sticky-header">

      <!-- Links -->
      <div class="header-container" id="main-right">
        <a class="button button-bordered" id="button-hire" onclick="popup('contact')">CONTACT</a>
        <a class="button-social" id="button-LinkedIn"  href="https://www.linkedin.com/in/joel-salzman-322891156"></a>
        <a class="button-social" id="button-GitHub"    href="http://github.com/joelsalzman"></a>
        <a class="button-social" id="button-Instagram" href="https://www.instagram.com/salzman.joel"></a>
      </div>

      <!-- Homepage tabs -->
      <div class="header-container"   id="main-left">
        <a class="button button-main" id="button-top" href="#"></a>
        <a class="button button-main" id="button-education" href="#Education">Education</a>
        <a class="button button-main" id="button-experience" href="#Experience">Experience</a>
        <a class="button button-main" id="button-skills" href="#Skills">Skills</a>
        <a class="button button-main" id="button-portfolio" href="#Portfolio">Portfolio</a>
      </div>
      
    </header>

    <!-- The important stuff -->
    <div class="content">

      <!-- Fun with SVG 
      <img id="trail" src="./pics/trail.svg">-->

      <!-- Transition -->
      <div class="content-container">
        <div class="gradient" id="wg-gradient"></div>
      </div>

      <!-- Informational sections -->
      <div class="content-container">
          
        <div class="info" id="Education">
          <span><br><br></span>
          <h2>University of California,</br>Santa Barbara</h2>
            <span>
              I will graduate Magna Cum Laude in June 2020 with two Bachelors of Arts. 
              During my third year, I was inducted into <a href="https://www.pbk.org/">Phi Beta Kappa</a>.
            </br></br>
              I competed as part of the UCSB Climbing Team throughout college.
              While a staff member of <a href="http://recreation.sa.ucsb.edu/adventure-programs">UCSB Adventure Programs</a>,
                I led and assisted outdoor excursions, 
                facilitated activities at the UCSB Ropes Course, 
                and managed shifts at Campus Point Rentals.
            </span>
          
          <h3>Geography (Geographic Information Science)</h3>
            <span>
              My degree in "Where?"
              </br></br>
              My coursework included advanced transportation modeling, suitability mapping, and remote sensing of the environment. 
              In addition, I helped redesign the labs for the main undergraduate GIS class and tutored classmates in ArcPy.
            </span>
            <div style="margin-left: 2vh";>
              <h3>Research Topics</h3>
              <span>

              <div class="research">Indoor cartography</div>:
              I under the direction of Professor <a href="http://www.geog.ucsb.edu/~kclarke/">Keith Clarke</a>.
              We built 3D models of indoor spaces and segmented point meshes to validate deep learning classifications of LIDAR scans. 
              Our goal was to develop a programatic method of generating millimeter-accurate models using LIDAR.
              </br></br>

              <div class="research">Voting</div>:
              I led a team of undergraduates in researching where votes have mattered most across the United States in
                federal elections in the past twenty years. 
              I later performed a similar analysis independently using more complex tools.
              Using Leaflet, I turned the results of the most recent analysis into an <a href="./gdvp.html">interactive map</a>.
              </br></br>
              I'm also developing an algorithm to identify precincts with inordinately diluted voting power
                for use as potential evidence of gerrymandering. 
              The algorithm utilizes iterative swapping techniques to model potential fluctuations on the vote-seats curve.
            </span></div>
          
          <h3>Philosophy (Ethics and Public Policy)</h3>
            <span> 
              My degree in "Why?"
              </br></br>
              My interests primarily concern political ethics and metaphysics.
              The coursework most relevant to GIS were my studies of spatial ontology, predicate calculus, and data ethics.
            </span>

          <h2>Foreign Study and Travel</h2>
            <span>
              I took a gap year during which I worked and then backpacked independently around South America for
                about nine months. In that time my Spanish improved to the point of fluency, I volunteered with
                <a href="https://wwoof.net/">WWOOF</a>, and I took classes on local cuisine.
              </br></br>
              During the Fall of 2019, I studied at <a href="https://kcl.ac.uk/">King's College London</a>. 
              While there, I took advanced modules in computer science and philosophy.
            </span>
        </div>
      </div>

      <div class="content-container">
        <div class="info" id="Experience">
          <span><br><br></span>
          <h2>SeaSketch</h2>
          <div class="date">(March 2020 - Present)</br></br></div>
            <span>
              <a href="https://www.seasketch.org/">SeaSketch</a> is a GIS application developed by
                <a href="https://www.nceas.ucsb.edu/">NCEAS</a> for conservation-focused marine spatial planning.
                My job consists of wrangling data with our partners across the world, 
                  writing analysis tools for individual projects,
                  and assisting with the development of SeaSketch 2.0.
            </span>
          
          <h2>Apex Clean Energy</h2>
          <div class="date">(Summer 2020)</br></br></div>
            <span>
              <a href="https://www.apexcleanenergy.com/">Apex Clean Energy</a> is a wind and solar developer based 
                out of Charlottesville, Virginia. My role at Apex was to determine where to site new utility-scale 
                facilities.
              </br></br>
              As an intern in the New Markets division, I dove deep into potential markets, found relevant data, 
                and presented my findings to members of the New Markets, GIS, and Business Development teams.
                The types of research that I conducted included opposition analysis,
                estimating the siting criteria of downstream industries, 
                and strategies for optimizing energy storage.
                I ultimately presented the results of one research project directly to the CEO. 
              </br></br>
              Since I was the GIS intern for New Markets, my research often relied on geospatial data. 
                I created numerous Python tools to assist both the New Markets and dedicated GIS teams, 
                  including geocoders, web scrapers, and geometric manipulation scripts. 
                Many of my deliverables were service layers that were published to the company web map.
                I also started a collaborative Python package, <i>Apyx</i>, to increase efficiency across teams by
                  generalizing common geoprocessing workflows.
            </span>
          
          <h2>Primary Ocean Producers</h2>
          <div class="date">(Summer 2019)</br></br></div>
            <span>
              <a href="http://www.primaryocean.com/">Primary Ocean Producers</a> is an aquaculture startup. 
              They partnered with <a href="https://catalinasearanch.com/">Catalina Sea Ranch</a> to fulfill an
                <a href="https://arpa-e.energy.gov/?q=programs/mariner">ARPA-E MARINER</a> contract to determine 
                the most suitable regions in federal and state waters to grow giant kelp (<i>Macrocystis pyrifera</i>). 
              </br></br>
              My role as the GIS Specialist was to handle all of the non-binary siting factors and generate
                presentable seasonal and annual suitability maps for the Southern California region. 
                One of these maps can be found <a href="#Portfolio">below</a>.
              I also coordinated with NOAA and ARPA-E to acquire data and document our progress as required.
            </span>
        </div>
      </div>
      
      <div class="content-container">
        <div class="info" id="Skills">
          <span><br><br></span>
          <table>
            <tr><td colspan=3><h2>Human Languages</h2></td></tr>
            <tr>
              <td class="skillName">English</td>
              <td class="skillName">Spanish</td>
            </tr>
            <tr>
              <td class="skillImg skill_1"><img src="./pics/amazing.svg" alt="Native" title="Native"></td>
              <td class="skillImg skill_1"><img src="./pics/amazing.svg" alt="Fluent" title="Fluent"></td>
            </tr>

            <tr><td colspan=3><h2>Robot Languages</h2></td></tr>
            <tr>
              <td class="skillName">Python</td>
              <td class="skillName">R</td>
              <td class="skillName">SQL (Post, MS)</td>
            </tr>
            <tr>
              <td class="skillImg skill_1"><img src="./pics/amazing.svg" alt="Superb" title="Superb"></td>
              <td class="skillImg skill_2"><img src="./pics/great.svg" alt="Adept" title="Adept"></td>
              <td class="skillImg skill_2"><img src="./pics/great.svg" alt="Adept" title="Adept"></td>
            </tr>
            <tr>
              <td class="skillName">HTML</td>
              <td class="skillName">CSS</td>
              <td class="skillName">JavaScript</td>
            </tr>
            <tr>
              <td class="skillImg skill_1"><img src="./pics/amazing.svg" alt="Superb" title="Superb"></td>
              <td class="skillImg skill_1"><img src="./pics/amazing.svg" alt="Superb" title="Superb"></td>
              <td class="skillImg skill_2"><img src="./pics/great.svg" alt="Adept" title="Adept"></td>
            </tr>
            <tr>
              <td class="skillName">C++ </td>
              <td class="skillName">Java</td>
              <td class="skillName">Scala</td>
            </tr>
            <tr>
              <td class="skillImg skill_2"><img src="./pics/great.svg" alt="Adept" title="Adept"></td>
              <td class="skillImg skill_3"><img src="./pics/good.svg" alt="Intermediate" title="Intermediate"></td>
              <td class="skillImg skill_3"><img src="./pics/good.svg" alt="Intermediate" title="Intermediate"></td>
            </tr>

            <tr><td colspan=3><h2>Applications</h2></td></tr>
            <tr>
              <td class="skillName">ESRI Stack</td>
              <td class="skillName">QGIS</td>
              <td class="skillName">ENVI</td>
            </tr>
            <tr>
              <td class="skillImg skill_1"><img src="./pics/amazing.svg" alt="Superb" title="Superb"></td>
              <td class="skillImg skill_2"><img src="./pics/great.svg" alt="Adept" title="Adept"></td>
              <td class="skillImg skill_2"><img src="./pics/great.svg" alt="Adept" title="Adept"></td>
            </tr>
            <tr>
              <td class="skillName"></td>
            </tr>
            <tr>
              <td class="skillImg"></td>
            </tr>
          </table>

        </div>
      </div>

      <!-- Another transition -->
      <div class="content-container">
        <div class="gradient" id="ga-gradient"></div>
      </div>

      <!-- Cards for portfolio items -->
      <div class="flex-container" id="Portfolio">

        <a href="./gdvp.html">
          <div class="card">
            <img src="pics/gdvp_snapshot.png" alt="GDVP" class="card-img">
          </div> 
        </a>

        <div class="card" id="site-card">
          <div id="card-text-container">
            <h2 class="card-text" id="card-text-header">This website</h2>
            <p class="card-text">I wrote this interactive resume from scratch.</p>
            <p class="card-text">My skill with front-end web development enables me to produce custom web mapping applications.</p>
          </div>
        </div> 

        <div class="card" id="aquaculture" onclick="popup('aq')">
          <img src="pics/kelp.jpg" alt="M. Pyrifera (pic from NOAA Photo Library)" class="card-img">
        </div>

      </div>
    </div>

    <!-- Imagebox for aquaculture maps -->
    <div class="popup-container" id="aq-container">
      <div class="barrier" id="aq-barrier" onclick="popup('aq')"></div>
      <div class="popup-main" id="aq-popup">
        <img src="./pics/Regional_Federal.png" alt="Image failed to load" class="map-img" id="suitability">
      </div>
    </div>

    <!-- Contact popup -->
    <div class="popup-container" id="contact-container">
      <div class="barrier" id="contact-barrier" onclick="popup('contact')"></div>
      <div class="popup-main contact-div" id="contact-popup">
          <h2 class="contact-div" id="email">joelkevlessalzman@gmail.com</h2>
      </div>
    </div>

  </body>

  <!-- Load the JavaScript -->
  <script src="./index.js"></script>
  <script src="./popups.js"></script>

</html>