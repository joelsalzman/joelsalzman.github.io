<!DOCTYPE html>
<html lang="en">

    <head>

        <title>Geographic Distribution of Voting Power</title>

        <link rel="stylesheet" href="./theme.css" type="text/css">

        <!-- Leaflet -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
            crossorigin=""></script>

        <!-- JQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    </head>

    <body>

         <!-- Header -->
         <header class="header">

            <!-- Info -->
            <div id="gdvp-info"><h3>Individual Voting Power</h3></div>

            <div class="header-container">

                <!-- Buttons -->
                <a class="button button-main gdvp-header" id="button-back" href="./index">Home</a>
                <a class="button button-main gdvp-header" id="gdvp-explanation" 
                    href="http://github.com/joelsalzman/Voting-Power">Explanation</a>

                <!-- Tooltip Open/Close -->
                <a class="button button-main gdvp-header" id="button-tooltip">Toggle Tooltip</a>
                
            </div>

        </header>

        <!-- Body -->
        <div class="body-container">

            <!-- Map -->
            <div id="gdvp-map"></div>

            <!-- Tooltip -->
            <div id="tooltip">

                <div class="option gdvp-tooltip" id="display-state">
                    <button class="button button-gdvp" onclick="toggleCheckContainer()">Display Individual State(s)</button>

                    <div class="check-container" id="state-checks">
                        <button class="button" id="button-state" onclick="toggleAllStates()">
                            <span id="toggleAll-text">Hide All</span>
                        </button><br>

                        <input type="checkbox" id="check-Alabama" value="1" checked onclick="toggleState('Alabama')">
                            <span>Alabama</span><br>
                        <input type="checkbox" id="check-Alaska" value="1" checked onclick="toggleState('Alaska')">
                            <span>Alaska</span><br>
                        <input type="checkbox" id="check-Arizona" value="1" checked onclick="toggleState('Arizona')">
                            <span>Arizona</span><br>
                        <input type="checkbox" id="check-Arkansas" value="1" checked onclick="toggleState('Arkansas')">
                            <span>Arkansas</span><br>
                        <input type="checkbox" id="check-California" value="1" checked onclick="toggleState('California')">
                            <span>California</span><br>
                        <input type="checkbox" id="check-Colorado" value="1" checked onclick="toggleState('Colorado')">
                            <span>Colorado</span><br>
                        <input type="checkbox" id="check-Connecticut" value="1" checked onclick="toggleState('Connecticut')">
                            <span>Connecticut</span><br>
                        <input type="checkbox" id="check-Delaware" value="1" checked onclick="toggleState('Delaware')">
                            <span>Delaware</span><br>
                        <input type="checkbox" id="check-DC" value="1" checked onclick="toggleState('District of Columbia')">
                            <span>District of Columbia</span><br>
                        <input type="checkbox" id="check-Florida" value="1" checked onclick="toggleState('Florida')">
                            <span>Florida</span><br>
                        <input type="checkbox" id="check-Georgia" value="1" checked onclick="toggleState('Georgia')">
                            <span>Georgia</span><br>
                        <input type="checkbox" id="check-Hawaii" value="1" checked onclick="toggleState('Hawaii')">
                            <span>Hawaii</span><br>
                        <input type="checkbox" id="check-Idaho" value="1" checked onclick="toggleState('Idaho')">
                            <span>Idaho</span><br>
                        <input type="checkbox" id="check-Illinois" value="1" checked onclick="toggleState('Illinois')">
                            <span>Illinois</span><br>
                        <input type="checkbox" id="check-Indiana" value="1" checked onclick="toggleState('Indiana')">
                            <span>Indiana</span><br>
                        <input type="checkbox" id="check-Iowa" value="1" checked onclick="toggleState('Iowa')">
                            <span>Iowa</span><br>
                        <input type="checkbox" id="check-Kansas" value="1" checked onclick="toggleState('Kansas')">
                            <span>Kansas</span><br>
                        <input type="checkbox" id="check-Kentucky" value="1" checked onclick="toggleState('Kentucky')">
                            <span>Kentucky</span><br>
                        <input type="checkbox" id="check-Louisiana" value="1" checked onclick="toggleState('Louisiana')">
                            <span>Louisiana</span><br>
                        <input type="checkbox" id="check-Maine" value="1" checked onclick="toggleState('Maine')">
                            <span>Maine</span><br>
                        <input type="checkbox" id="check-Maryland" value="1" checked onclick="toggleState('Maryland')">
                            <span>Maryland</span><br>
                        <input type="checkbox" id="check-Massachusetts" value="1" checked onclick="toggleState('Massachusetts')">
                            <span>Massachusetts</span><br>
                        <input type="checkbox" id="check-Michigan" value="1" checked onclick="toggleState('Michigan')">
                            <span>Michigan</span><br>
                        <input type="checkbox" id="check-Minnesota" value="1" checked onclick="toggleState('Minnesota')">
                            <span>Minnesota</span><br>
                        <input type="checkbox" id="check-Mississippi" value="1" checked onclick="toggleState('Mississippi')">
                            <span>Mississippi</span><br>
                        <input type="checkbox" id="check-Missouri" value="1" checked onclick="toggleState('Missouri')">
                            <span>Missouri</span><br>
                        <input type="checkbox" id="check-Montana" value="1" checked onclick="toggleState('Montana')">
                            <span>Montana</span><br>
                        <input type="checkbox" id="check-Nebraska" value="1" checked onclick="toggleState('Nebraska')">
                            <span>Nebraska</span><br>
                        <input type="checkbox" id="check-Nevada" value="1" checked onclick="toggleState('Nevada')">
                            <span>Nevada</span><br>
                        <input type="checkbox" id="check-New Hampshire" value="1" checked onclick="toggleState('New Hampshire')">
                            <span>New Hampshire</span><br>
                        <input type="checkbox" id="check-New Jersey" value="1" checked onclick="toggleState('New Jersey')">
                            <span>New Jersey</span><br>
                        <input type="checkbox" id="check-New Mexico" value="1" checked onclick="toggleState('New Mexico')">
                            <span>New Mexico</span><br>
                        <input type="checkbox" id="check-New York" value="1" checked onclick="toggleState('New York')">
                            <span>New York</span><br>
                        <input type="checkbox" id="check-North Carolina" value="1" checked onclick="toggleState('North Carolina')">
                            <span>North Carolina</span><br>
                        <input type="checkbox" id="check-North Dakota" value="1" checked onclick="toggleState('North Dakota')">
                            <span>North Dakota</span><br>
                        <input type="checkbox" id="check-Ohio" value="1" checked onclick="toggleState('Ohio')">
                            <span>Ohio</span><br>
                        <input type="checkbox" id="check-Oklahoma" value="1" checked onclick="toggleState('Oklahoma')">
                            <span>Oklahoma</span><br>
                        <input type="checkbox" id="check-Oregon" value="1" checked onclick="toggleState('Oregon')">
                            <span>Oregon</span><br>
                        <input type="checkbox" id="check-Pennsylvania" value="1" checked onclick="toggleState('Pennsylvania')">
                            <span>Pennsylvania</span><br>
                        <input type="checkbox" id="check-Rhode Island" value="1" checked onclick="toggleState('Rhode Island')">
                            <span>Rhode Island</span><br>
                        <input type="checkbox" id="check-South Carolina" value="1" checked onclick="toggleState('South Carolina')">
                            <span>South Carolina</span><br>
                        <input type="checkbox" id="check-South Dakota" value="1" checked onclick="toggleState('South Dakota')">
                            <span>South Dakota</span><br>
                        <input type="checkbox" id="check-Tennessee" value="1" checked onclick="toggleState('Tennessee')">
                            <span>Tennessee</span><br>
                        <input type="checkbox" id="check-Texas" value="1" checked onclick="toggleState('Texas')">
                            <span>Texas</span><br>
                        <input type="checkbox" id="check-Utah" value="1" checked onclick="toggleState('Utah')">
                            <span>Utah</span><br>
                        <input type="checkbox" id="check-Vermont" value="1" checked onclick="toggleState('Vermont')">
                            <span>Vermont</span><br>
                        <input type="checkbox" id="check-Virginia" value="1" checked onclick="toggleState('Virginia')">
                            <span>Virginia</span><br>
                        <input type="checkbox" id="check-Washington" value="1" checked onclick="toggleState('Washington')">
                            <span>Washington</span><br>
                        <input type="checkbox" id="check-West Virginia" value="1" checked onclick="toggleState('West Virginia')">
                            <span>West Virginia</span><br>
                        <input type="checkbox" id="check-Wisconsin" value="1" checked onclick="toggleState('Wisconsin')">
                            <span>Wisconsin</span><br>
                        <input type="checkbox" id="check-Wyoming" value="1" checked onclick="toggleState('Wyoming')">
                            <span>Wyoming</span>
                    </div>
                </div>

                <!--
                <div class="option gdvp-tooltip" id="display-field">
                    <button class="button button-gdvp" onclick="">Change Display Field</button>
                </div>

                <div class="option gdvp-tooltip" id="display-election">
                    <button class="button button-gdvp" onclick="">Show Single Election</button>
                </div>-->

            </div>

        </div>

        <!-- Load the JavaScript -->
        <script src="./gdvp.js"></script>

    </body>

</html>